
import * as React from 'react'
import { useSelector } from 'react-redux'
import ClearIcon from '@mui/icons-material/Clear'
import ListIcon from '@mui/icons-material/List'
import InsertChartIcon from '@mui/icons-material/InsertChart'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'

export default function Option() {
    const appState = useSelector((state) => {
        return { task: state.task, completeTask: state.completeTask }
    })
    const { name, remainingTime, isRest } = appState.task[0]
        ? appState.task[0]
        : { name: '', remainingTime: 0, isRest: false, remainingTomatoTimes: 0, originalTomatoTimes: 0 }
    return (
        <div
            className="wrap"
            style={{
                '--navList': `${window.location.hash === '#/list' ? '#FF4384' : '#FFFFFF33'}`,
                '--navChart': `${window.location.hash === '#/chart' ? '#FF4384' : '#FFFFFF33'}`,
                '--navMusic': `${window.location.hash === '#/music' ? '#FF4384' : '#FFFFFF33'}`,
                '--primaryColor': `${!isRest ? '#ff4384' : '#00A7FF'}`,
                '--secondColor': `${!isRest ? '#FFEDF7' : '#E5F3FF'}`,
                '--MountainTop': !isRest ? 'https://i.imgur.com/UM3lGFf.png' : 'https://i.imgur.com/9hf1iUG.png',
            }}
        >
            <a href='/POMODORO/#'>
            <div className="clearIcon marginTop48 right85 ">
                <ClearIcon sx={{ fontSize: 48, color: 'white' }} />
            </div>
            </a>
            <div className="POMODORO right85 bottom48">POMODORO</div>
            <div className="optionNav">
                <a className="marginTop48 alignCenter width260" href="#/list">
                    <ListIcon sx={{ fontSize: 48, color: 'var(--navList)' }} />
                    <span className="optionSpan navList">to-do list</span>
                </a>
                <a className="marginTop48 alignCenter width260" href="#/chart">
                    <InsertChartIcon sx={{ fontSize: 48, color: 'var(--navChart)' }} />
                    <span className="optionSpan navChart">analytics</span>
                </a>
                <a className="marginTop48 alignCenter width260" href="#/music">
                    <LibraryMusicIcon sx={{ fontSize: 48, color: 'var(--navMusic)' }} />
                    <span className="optionSpan navMusic">ringtones</span>
                </a>
            </div>
            <div className="taskMountainOutside">
                <div className="taskMountainBottom">
                    <span className="taskMountainTime">
                        {Math.floor(remainingTime / 60)}:
                        {remainingTime % 60 < 10 ? '0' + (remainingTime % 60) : remainingTime % 60}
                    </span>
                    <span className="taskMountainName">{name}</span>
                </div>
                <div className="taskMountainBlue">
                    <a href="/POMODORO/#">
                        <div className="taskMountainTopBorder">
                            <div className="taskMountainTopBack"></div>
                            <PlayCircleFilledIcon sx={{ fontSize: 102, color: 'var(--primaryColor)', zIndex: 1 }} />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}
