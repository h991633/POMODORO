import Option from './Option'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AddTask from './AddTask'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
export default function List() {
    const appState = useSelector((state) => {
        return { task: state.task, completeTask: state.completeTask }
    })
    const dispatch = useDispatch()
    const [isClickDoneTask, setIsClickDoneTask] = useState(true)
    const [isClickUndoneTask, setIsClickUndoneTask] = useState(true)
    const [isNoTask, setIsNoTask] = useState(appState.task[0] ? false : true)
    function changeFirstTask(prevQueue) {
        dispatch({
            type: 'changeFirstTask',
            queue: prevQueue,
        })
    }
    function clickTaskList(isDone) {
        if (isDone) {
            setIsClickDoneTask(!isClickDoneTask)
        } else {
            setIsClickUndoneTask(!isClickUndoneTask)
        }
    }
    return (
        <div>
            <Option />
            <div
                className="musicWrap"
                style={{
                    '--primaryColor': '#FF4384',
                    
                    '--undoneListH': `${isClickUndoneTask ? '302px' : '0px'}`,
                    '--undoneListOverflow': `${isClickUndoneTask ? 'auto' : 'hidden'}`,
                    '--doneListH': `${isClickDoneTask ? '233px' : '0px'}`,
                    '--doneListOverflow': `${isClickDoneTask ? 'auto' : 'hidden'}`,
                }}
            >
                <AddTask setIsNoTask={setIsNoTask} />
                <div className="undoneList">
                    <span>to-do</span>
                    <div
                        onClick={() => {
                            clickTaskList(false)
                        }}
                    >
                        <ArrowDropUpIcon sx={{ fontSize: '24px', color: 'white', transform: 'translate(0px, 6px)' }} />
                    </div>
                </div>
                <div className="undoneListTaskOutside">
                    {isNoTask ? (
                        <li className="undoneListTask">no tasks</li>
                    ) : (
                        appState.task.map((task, index) => {
                            return (
                                <li className="undoneListTask">
                                    {task.name}
                                    <div onClick={() => changeFirstTask(index)}>
                                        <PlayCircleOutlineIcon
                                            sx={{ fontSize: '24px', color: 'white', cursor: 'pointer' }}
                                        />
                                    </div>
                                </li>
                            )
                        })
                    )}
                </div>
                <div className='absoluteDoneList'>
                <div className="doneList">
                    <span>done</span>
                    <div
                        onClick={() => {
                            clickTaskList(true)
                        }}
                    >
                        <ArrowDropUpIcon sx={{ fontSize: '24px', color: 'white', transform: 'translate(0px, 6px)' }} />
                    </div>
                </div>

                <div className="doneListTaskOutside">
                    {appState.completeTask[0] ? (
                        appState.completeTask.map((task, index) => {
                            return (
                                <li className="doneListTask">
                                    <span className="doneListTaskName">{task.name}</span>
                                    {task.originalTomatoTimes > 8 ? (
                                        <div className="doneListTaskTimes">
                                            <div className="doneListTaskTomato"></div>
                                            <span>&nbsp; X {task.originalTomatoTimes}</span>
                                        </div>
                                    ) : (
                                        <div className="doneListTaskTimes">
                                            {Array.from({ length: task.originalTomatoTimes }, (_, index) => (
                                                <div className="doneListTaskTomato"></div>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            )
                        })
                    ) : (
                        <li className="doneListTask">Didn't complete any task</li>
                    )}
                </div>
                </div>
            </div>
        </div>
    )
}
