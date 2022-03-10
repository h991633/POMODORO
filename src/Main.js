import { useState, useRef, useEffect } from 'react'
import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import AddTask from './AddTask'
function Main() {
    const appState = useSelector((state) => {
        return { task: state.task, completeTask: state.completeTask, music: state.music }
    })
    const dispatch = useDispatch()
    const { name, remainingTime, isRest, remainingTomatoTimes, originalTomatoTimes } = appState.task[0]
        ? appState.task[0]
        : { name: '', remainingTime: 0, isRest: false, remainingTomatoTimes: 0, originalTomatoTimes: 0 }
    const [isNoTask, setIsNoTask] = useState(appState.task[0] ? false : true)
    const [timeDeg, setTimeDeg] = useState(
        isRest ? 360 - 360 * (remainingTime / 300) : 360 - 360 * (remainingTime / 1500)
    )
    const [isCounting, setIsCounting] = useState(false)
    const StopCountdown = useRef()
    const [schedule, setSchedule] = useState([])

    const startTime = useRef()
    function countdown() {
        let timeDistance = Date.now() - startTime.current
        //從按下開始按鈕後經過多久毫秒 1
        let endOfTheClock = remainingTime * 1000
        //從按下開始按鈕後離時鐘的12點鐘有多久毫秒 同一批setInterval的外部變數(remainingTime)都一樣 5
        let newRemainingTime = Math.ceil((endOfTheClock - timeDistance) / 1000)
        // console.log('timeDistance', timeDistance, 'endOfTheClock', endOfTheClock, 'newRemainingTime', newRemainingTime)
        if (timeDistance < endOfTheClock) {
            dispatch({
                type: 'updateFirstTaskRemainingTime',
                remainingTime: newRemainingTime,
            })
        } else {
            //倒數到12點鐘了
            let overtime = Math.ceil((timeDistance - endOfTheClock) / 1000)
            clearInterval(StopCountdown.current)
            console.log('時間到')
            if (!isRest) {
                //25分跑完 轉到5分休息
                dispatch({
                    type: 'updateFirstTaskRemainingTime',
                    remainingTime: 300 - overtime,
                })
                dispatch({
                    type: 'updateFirstTaskIsRest',
                    isRest: true,
                })
                changeStage()
                playAudio(false)
            } else {
                //休息5分跑完
                if (remainingTomatoTimes - 1 === 0) {
                    //當前task已完成，將當前task移到done
                    dispatch({
                        type: 'deleteTask',
                        queue: 0,
                    })
                    dispatch({
                        type: 'addCompleteTask',
                        name: name,
                        originalTomatoTimes: originalTomatoTimes,
                        completeTime: new Date(),
                    })
                    setIsCounting(false)
                    clearInterval(StopCountdown.current)
                    playAudio(false)
                } else {
                    //轉到下一個25分
                    dispatch({
                        type: 'updateFirstTaskRemainingTomatoTimes',
                        remainingTomatoTimes: remainingTomatoTimes - 1,
                    })
                    dispatch({
                        type: 'updateFirstTaskRemainingTime',
                        remainingTime: 1500 - overtime,
                    })
                    dispatch({
                        type: 'updateFirstTaskIsRest',
                        isRest: false,
                    })
                    changeStage()
                    playAudio(true)
                }
            }
        }
    }
    function changeStage() {
        document.getElementsByClassName('tomatoSeed')[0].click()
        document.getElementsByClassName('tomatoSeed')[0].click()
       
    }
    const workAudio = new Audio(appState.music['workMusicUrl'])
    const breakAudio = new Audio(appState.music['breakMusicUrl'])
    function playAudio(isWork) {
        if(isWork){
            workAudio.play()
        }else{
            breakAudio.play()
        }
    }
    function startOrStopHandler() {
        workAudio.pause()
        breakAudio.pause()
        if (isNoTask) {
            alert('沒有進行中的任務')
        } else {
            if (isCounting) {
                //stop
                clearInterval(StopCountdown.current)
                setIsCounting(false)
            } else {
                //start countdown
                startTime.current = Date.now()
                setIsCounting(true)

                StopCountdown.current = setInterval(() => {
                    countdown()
                }, 1000)
            }
        }
    }
    function stopHandler() {
        workAudio.pause()
        breakAudio.pause()
        if (isNoTask) {
            alert('沒有進行中的任務')
        } else {
            if (isCounting) {
                //stop
                clearInterval(StopCountdown.current)
                setIsCounting(false)
            }
        }
    }
    function changeFirstTask(prevQueue) {
        stopHandler()
        dispatch({
            type: 'changeFirstTask',
            queue: prevQueue,
        })
    }
    useEffect(() => {
        if (isCounting) {
            document.title = `${Math.floor(remainingTime / 60)}:
        ${remainingTime % 60 < 10 ? '0' + (remainingTime % 60) : remainingTime % 60} ${isRest ? 'Resting' : 'Working'}`
            if (isRest) {
                document.querySelector("link[rel*='icon']").href = 'https://i.imgur.com/dwvxCyh.png'
            } else {
                document.querySelector("link[rel*='icon']").href = 'https://i.imgur.com/FnFdsvX.png'
            }
        } else {
            document.title = 'Pomodoro'
            document.querySelector("link[rel*='icon']").href = 'https://i.imgur.com/FnFdsvX.png'
        }
    }, [isCounting, remainingTime, isRest])

    useEffect(() => {
        setTimeDeg(isRest ? 360 - 360 * (remainingTime / 300) : 360 - 360 * (remainingTime / 1500))
        let iconList = []
        iconList.length = remainingTomatoTimes
        iconList.fill(<div className="scheduleIcon"></div>)
        setSchedule(iconList)
    }, [remainingTime, isRest, remainingTomatoTimes])
  
    return (
        <div
            className="flex"
            style={{
                '--primaryColor': `${!isRest ? '#ff4384' : '#00A7FF'}`,
                '--secondColor': `${!isRest ? '#FFEDF7' : '#E5F3FF'}`,
                '--firstTask': `${appState.task[0] ? 'visible' : 'hidden'}`,
                '--secondTask': `${appState.task[1] ? 'visible' : 'hidden'}`,
                '--thirdTask': `${appState.task[2] ? 'visible' : 'hidden'}`,
                '--fourTask': `${appState.task[3] ? 'visible' : 'hidden'}`,
                '--time': timeDeg,
                '--timeWidth': `${timeDeg >= 180 ? 542 : 271}`,
                '--timeLeft': `${timeDeg >= 180 ? 0 : 271}`,
                '--timeRightHalfColor': `${timeDeg >= 180 ? 'var(--primaryColor)' : 'transparent'}`,
                '--intactTomatoTimes': remainingTomatoTimes - 1,
                '--tomatoBodyColor': `${isCounting ? '#ffffff' : 'var(--primaryColor)'}`,
                '--tomatoSeedBackground': `url(${
                    isCounting
                        ? !isRest
                            ? 'https://i.imgur.com/UM3lGFf.png'
                            : 'https://i.imgur.com/9hf1iUG.png'
                        : 'https://i.imgur.com/wPM1fBM.png'
                })`,
                '--tomatoStopBackground': `url(${
                    isCounting
                        ? !isRest
                            ? 'https://i.imgur.com/tNkUmsA.png'
                            : 'https://i.imgur.com/XxKnxQI.png'
                        : 'https://i.imgur.com/aZ010CO.png'
                })`,
            }}
        >
            <main className="homepageLeft">
                <AddTask setIsNoTask={setIsNoTask} />

                <div className="flex currentTask">
                    <div className="currentTaskIcon"></div>
                    <div>
                        <li className="currentTaskName">{name}</li>
                        <div className="flex">
                            <div className="schedule flex">{schedule}</div>
                            <div className="iconBorder"></div>
                        </div>
                    </div>
                </div>
                <div className="timer">
                    {Math.floor(remainingTime / 60)}:
                    {remainingTime % 60 < 10 ? '0' + (remainingTime % 60) : remainingTime % 60}
                </div>
                <ul>
                    <div className="listOverflow3">
                        {appState.task.map((task, index) => {
                            if (index === 0) {
                                return ''
                            } else {
                                return (
                                    <div>
                                        <li>
                                            {appState.task[index].name}
                                            <div
                                                className="changeFirstTask"
                                                onClick={() => {
                                                    changeFirstTask(index)
                                                }}
                                            ></div>
                                        </li>
                                    </div>
                                )
                            }
                        })}
                    </div>

                    <a href="#/list" className="more">
                        {appState.task[4] ? '...' : ''} MORE
                    </a>
                </ul>
                <div className="tomatoPeel">
                    <div className="tomatoTime"></div>
                    <div className="tomatoBody">
                        <div className="tomatoSeed" onClick={startOrStopHandler}></div>
                        <div className="tomatoStop" onClick={stopHandler}></div>
                    </div>
                </div>
            </main>
            <nav className="homepageRight">
                <div className="homepageNav">
                    <a href="#/list" onClick={stopHandler}>
                        <div className="listIcon marginTop48"></div>
                    </a>
                    <a href="#/chart" onClick={stopHandler}>
                        <div className="chartIcon marginTop48"></div>
                    </a>
                    <a href="#/music" onClick={stopHandler}>
                        <div className="musicIcon marginTop48"></div>
                    </a>
                    <div className="POMODORO marginTop335">POMODORO</div>
                </div>
            </nav>
        </div>
    )
}

export default Main
