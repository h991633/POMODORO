import * as React from 'react'
import { useState } from 'react'
import {  useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import Popper from '@mui/material/Popper'
import Button from '@mui/material/Button'
export default function AddTask(props) {
    const [newTaskName, setNewTaskName] = useState('')
    const [newTaskTime, setNewTaskTime] = useState('')
    const [isClickAddTask, setIsClickAddTask] = useState(false)
  
    const dispatch = useDispatch()

    
    function clickAddTask() {
        setIsClickAddTask(!isClickAddTask)
    }
    /* mui example start*/
    const [anchorEl, setAnchorEl] = React.useState(null)
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget)
    }
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popper' : undefined
    /* mui example end*/
    function addTask() {
        if (newTaskName === '') {
            alert('請輸入任務名')
        } else {
            if (typeof (newTaskTime * 1) !== 'number'||newTaskTime=="") {
                alert('請輸入數字')
            } else {
                if (newTaskTime > 16) {
                    alert('番茄鐘個數不可超過16')
                } else {
                    props.setIsNoTask(false)
                    dispatch({
                        type: 'addTask',
                        name: newTaskName,
                        tomatoTimes: newTaskTime * 1,
                    })
                    setNewTaskName('')
                    setNewTaskTime('')
                    setIsClickAddTask(false)
                }
            }
        }
    }
    return (
        <div>
            <input
                className="addTask"
                type="text"
                maxlength="28"
                placeholder="add a new mission…"
                value={newTaskName}
                onChange={(e) => {
                    setNewTaskName(e.target.value)
                }}
            ></input>
            <button className="addTaskButton" onClick={clickAddTask}>
                +
            </button>
            <div className="setTomatoNumberOutside" style={{ '--setNumber': `${isClickAddTask ? '56px' : '0px'}` }}>
                <input
                    className="addTask setTomatoNumber"
                    type="number"
                    min="1"
                    max="16"
                    placeholder="how many 30 minutes?(number)"
                    value={newTaskTime}
                    onChange={(e) => {
                        setNewTaskTime(e.target.value)
                    }}
                ></input>
                <button className="tomatoHint" aria-describedby={id} type="button" onClick={handleClick}>
                    ?
                </button>
                <Popper id={id} open={open} anchorEl={anchorEl}>
                    <Box className="tomatoHintExplain" sx={{ p: 1, bgcolor: 'background.paper' }}>
                        請輸入此任務需要幾個番茄鐘。每一個元整的番茄鐘是30分鐘，分割出一個25分鐘的工作時間，和5分鐘的休息時間。
                    </Box>
                </Popper>
                <Button className="addTaskSend" variant="outlined" onClick={addTask}>
                    send
                </Button>
            </div>
        </div>
    )
}
