import Option from './Option'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
export default function Music() {
    const appState = useSelector((state) => {
        return { task: state.task, completeTask: state.completeTask, music: state.music }
    })
    const dispatch = useDispatch()
   
    function workMusicChange(e) {
        dispatch({
            type: 'changeWorkMusic',
            payload: e.target.value,
        })
    }
    function breakMusicChange(e) {
        dispatch({
            type: 'changeBreakMusic',
            payload: e.target.value,
        })
    }
    const musicList = [
        'NONE',
        'DEFAULT',
        'ALARM',
        'ALERT',
        'BEEP',
        'BELL',
        'BIRD',
        'BUGLE',
        'DIGITAL',
        'DROP',
        'HORN',
        'MUSIC',
        'RING',
        'WARNING',
        'WHISTLE',
    ]
    useEffect(() => {
        document.querySelectorAll(`input[value="${appState.music['workMusicName']}"]`)[0].checked = true
        document.querySelectorAll(`input[value="${appState.music['breakMusicName']}"]`)[1].checked = true
    }, [])
    return (
        <div>
            <Option />
            <div className="musicWrap">
                <div className="musicApply">WORK</div>
                <div className="musicTypeWrap">
                    {musicList.map((value, index) => {
                        return (
                            <label key={index} className="musicTypeName">
                                <input type="radio" value={value} name="workMusic" onChange={workMusicChange} />
                                <div className="musicTypeCheck">
                                    <span></span>
                                </div>
                                {value}
                            </label>
                        )
                    })}
                </div>
                <div className="musicApply">BREAK</div>
                <div className="musicTypeWrap">
                    {musicList.map((value, index) => {
                        return (
                            <label key={index} className="musicTypeName">
                                <input type="radio" value={value} name="breakMusic" onChange={breakMusicChange} />
                                <div className="musicTypeCheck">
                                    <span></span>
                                </div>
                                {value}
                            </label>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
