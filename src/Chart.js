import Option from './Option'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
export default function Chart() {
    const appState = useSelector((state) => {
        return { task: state.task, completeTask: state.completeTask, music: state.music }
    })

    let todayStart = new Date(new Date().setHours(0, 0, 0, 0))
    let day1 = new Date(todayStart)
    let day2 = new Date(todayStart)
    let day3 = new Date(todayStart)
    let day4 = new Date(todayStart)
    let day5 = new Date(todayStart)
    let day6 = new Date(todayStart)
    day1.setDate(day1.getDate() - 1)
    day2.setDate(day2.getDate() - 2)
    day3.setDate(day3.getDate() - 3)
    day4.setDate(day4.getDate() - 4)
    day5.setDate(day5.getDate() - 5)
    day6.setDate(day6.getDate() - 6)
    const [todayTimes, setTodayTimes] = useState(0)
    const [day1Times, setDay1Times] = useState(0)
    const [day2Times, setDay2Times] = useState(0)
    const [day3Times, setDay3Times] = useState(0)
    const [day4Times, setDay4Times] = useState(0)
    const [day5Times, setDay5Times] = useState(0)
    const [day6Times, setDay6Times] = useState(0)
    const [weekTimes, setWeekTimes] = useState(0)
    let todayT = 0
    useEffect(() => {
        let day1T = 0,
            day2T = 0,
            day3T = 0,
            day4T = 0,
            day5T = 0,
            day6T = 0
        appState.completeTask
            .filter((task) => task.completeTime > todayStart)
            .forEach((task) => (todayT += task.originalTomatoTimes))
        appState.completeTask
            .filter((task) => task.completeTime > day1 && task.completeTime < todayStart)
            .forEach((task) => (day1T += task.originalTomatoTimes))
        appState.completeTask
            .filter((task) => task.completeTime > day2 && task.completeTime < day1)
            .forEach((task) => (day2T += task.originalTomatoTimes))
        appState.completeTask
            .filter((task) => task.completeTime > day3 && task.completeTime < day2)
            .forEach((task) => (day3T += task.originalTomatoTimes))
        appState.completeTask
            .filter((task) => task.completeTime > day4 && task.completeTime < day3)
            .forEach((task) => (day4T += task.originalTomatoTimes))
        appState.completeTask
            .filter((task) => task.completeTime > day5 && task.completeTime < day4)
            .forEach((task) => (day5T += task.originalTomatoTimes))
        appState.completeTask
            .filter((task) => task.completeTime > day6 && task.completeTime < day5)
            .forEach((task) => (day6T += task.originalTomatoTimes))
        setTodayTimes(todayT)
        setDay1Times(day1T)
        setDay2Times(day2T)
        setDay3Times(day3T)
        setDay4Times(day4T)
        setDay5Times(day5T)
        setDay6Times(day6T)
        setWeekTimes(todayT + day1T + day2T + day3T + day4T + day5T + day6T)
    }, [])
    useEffect(() => {
        todayT = 0
        appState.completeTask
            .filter((task) => task.completeTime > todayStart)
            .forEach((task) => (todayT += task.originalTomatoTimes))
        setTodayTimes(todayT)
        if (day1Times + day2Times + day3Times + day4Times + day5Times + day6Times !== 0) {
            setWeekTimes(todayT + day1Times + day2Times + day3Times + day4Times + day5Times + day6Times)
        }
    }, [appState.completeTask])
    return (
        <div>
            <Option />
            <div className="musicWrap">
                <div className="musicApply">FOCUS TIME</div>
                <div className="focusContainer">
                    <div>
                        <span className="subtotalTitle">TODAY</span>
                        <br />
                        <span className="subtotalNumber">{todayTimes}</span>
                        <span className="subtotalTomato">/TOMATO</span>
                    </div>
                    <div>
                        <span className="subtotalTitle">WEEK</span>
                        <br />
                        <span className="subtotalNumber">{weekTimes}</span>
                        <span className="subtotalTomato">/TOMATO</span>
                    </div>
                </div>
                <div className="musicApply space-between">
                    <span>CHART</span>
                    <span className="chartPeriod">
                        {'< '} {day6.getFullYear()}.{day6.getMonth() + 1}.{day6.getDate()} - {todayStart.getFullYear()}.
                        {todayStart.getMonth() + 1}.{todayStart.getDate()} {' >'}
                    </span>
                </div>
                <div className="chartContainer">
                    <div className="chartTimes">
                        24
                        <br />
                        <br />
                        20
                        <br />
                        <br />
                        16
                        <br />
                        <br />
                        12
                        <br />
                        <br />
                        8
                        <br />
                        <br />
                        4
                        <br />
                    </div>
                    <div>
                        <div
                            className="chartMain"
                            style={{
                                '--Box1h': `calc(9.666px*${day6Times})`,
                                '--Box2h': `calc(9.666px*${day5Times})`,
                                '--Box3h': `calc(9.666px*${day4Times})`,
                                '--Box4h': `calc(9.666px*${day3Times})`,
                                '--Box5h': `calc(9.666px*${day2Times})`,
                                '--Box6h': `calc(9.666px*${day1Times})`,
                                '--Box7h': `calc(9.666px*${todayTimes})`,
                            }}
                        >
                            <div className="chartBox1 chartBox"></div>
                            <div className="chartBox2 chartBox"></div>
                            <div className="chartBox3 chartBox"></div>
                            <div className="chartBox4 chartBox"></div>
                            <div className="chartBox5 chartBox"></div>
                            <div className="chartBox6 chartBox"></div>
                            <div className="chartBox7 chartBox"></div>
                        </div>
                        <div className="chartDate">
                            <span className="marginLeft32">7/1</span>
                            <span className="marginLeft32">7/2</span>
                            <span className="marginLeft32">7/3</span>
                            <span className="marginLeft32">7/4</span>
                            <span className="marginLeft32">7/5</span>
                            <span className="marginLeft32">7/6</span>
                            <span className="marginLeft32">7/7</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
