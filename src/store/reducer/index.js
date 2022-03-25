import { combineReducers } from 'redux'

// function user(state = '新使用者', action) {
//     switch (action.type) {
//         case 'set':
//             return action.name

//         default:
//             return state
//     }
// }

// function counter(state = 0, action) {
//     switch (action.type) {
//         case 'add':
//             return state + 1

//         default:
//             return state
//     }
// }

const defaultTask = [
    {
        name: 'the First thing to do today',
        originalTomatoTimes: 5,
        remainingTomatoTimes: 5,
        remainingTime: 5,
        isRest: true,
    },
    {
        name: 'the second  thing to do today',
        originalTomatoTimes: 3,
        remainingTomatoTimes: 3,
        remainingTime: 5,
        isRest: false,
    },
    {
        name: 'the third  thing to do today',
        originalTomatoTimes: 16,
        remainingTomatoTimes: 16,
        remainingTime: 1500,
        isRest: false,
    },
    {
        name: 'the forth  thing to do today',
        originalTomatoTimes: 4,
        remainingTomatoTimes: 1,
        remainingTime: 3,
        isRest: true,
    },
]
let newTaskList, newFirstTask
function task(state = defaultTask, action) {
    switch (action.type) {
        case 'addTask':
            return [
                ...state,
                {
                    name: action.name,
                    originalTomatoTimes: action.tomatoTimes,
                    remainingTomatoTimes: action.tomatoTimes,
                    remainingTime: 1500,
                    isRest: false,
                },
            ]
        case 'changeFirstTask':
            newTaskList = [...state]
            newFirstTask = newTaskList.splice(action.queue, 1)
            newTaskList.unshift(...newFirstTask)

            return newTaskList
        case 'deleteTask':
            newTaskList = [...state]
            newTaskList.splice(action.queue, 1)
            return newTaskList
        case 'updateFirstTaskRemainingTomatoTimes':
            newFirstTask = {
                name: state[0].name,
                originalTomatoTimes: state[0].originalTomatoTimes,
                remainingTomatoTimes: action.remainingTomatoTimes,
                remainingTime: state[0].remainingTime,
                isRest: state[0].isRest,
            }
            newTaskList = [...state]
            newTaskList.splice(0, 1)
            newTaskList.unshift(newFirstTask)
            return newTaskList
        case 'updateFirstTaskRemainingTime':
            newFirstTask = {
                name: state[0].name,
                originalTomatoTimes: state[0].originalTomatoTimes,
                remainingTomatoTimes: state[0].remainingTomatoTimes,
                remainingTime: action.remainingTime,
                isRest: state[0].isRest,
            }
            newTaskList = [...state]
            newTaskList.splice(0, 1)
            newTaskList.unshift(newFirstTask)
            return newTaskList
        case 'updateFirstTaskIsRest':
            newFirstTask = {
                name: state[0].name,
                originalTomatoTimes: state[0].originalTomatoTimes,
                remainingTomatoTimes: state[0].remainingTomatoTimes,
                remainingTime: state[0].remainingTime,
                isRest: action.isRest,
            }
            newTaskList = [...state]
            newTaskList.splice(0, 1)
            newTaskList.unshift(newFirstTask)
            return newTaskList
        default:
            return state
    }
}

var day1 = new Date()
var day2 = new Date()
var day3 = new Date()
var day4 = new Date()
var day5 = new Date()
var day6 = new Date()
var day7 = new Date()
day1.setDate(day1.getDate() - 1)
day2.setDate(day2.getDate() - 2)
day3.setDate(day3.getDate() - 3)
day4.setDate(day4.getDate() - 4)
day5.setDate(day5.getDate() - 5)
day6.setDate(day6.getDate() - 6)
const defaultCompleteTask = [
    {
        name: 'complete Task 1',
        originalTomatoTimes: 16,
        completeTime: day1,
    },
    {
        name: 'complete Task 2',
        originalTomatoTimes: 12,
        completeTime: day2,
    },
    {
        name: 'complete Task 3',
        originalTomatoTimes: 16,
        completeTime: day3,
    },
    {
        name: 'complete Task 4',
        originalTomatoTimes: 8,
        completeTime: day4,
    },
    {
        name: 'complete Task 5',
        originalTomatoTimes: 12,
        completeTime: day5,
    },
    {
        name: 'complete Task 6',
        originalTomatoTimes: 4,
        completeTime: day6,
    },
    {
        name: 'complete Task 7',
        originalTomatoTimes: 16,
        completeTime: day7,
    },
    {
        name: 'complete Task 8',
        originalTomatoTimes: 4,
        completeTime: day7,
    },
]

function completeTask(state = defaultCompleteTask, action) {
    switch (action.type) {
        case 'addCompleteTask':
            return [
                ...state,
                {
                    name: action.name,
                    originalTomatoTimes: action.originalTomatoTimes,
                    completeTime: action.completeTime,
                },
            ]
        default:
            return state
    }
}
const musicUrlList = {
    NONE: '',
    DEFAULT: 'https://freesound.org/data/previews/152/152515_2337088-lq.mp3',
    ALARM: '',
    ALERT: '',
    BEEP: '',
    BELL: '',
    BIRD: '',
    BUGLE: '',
    DIGITAL: '',
    DROP: '',
    HORN: '',
    MUSIC: '',
    RING: '',
    WARNING: '',
    WHISTLE: '',
}
const defaultMusic = {
    workMusicName: 'DEFAULT',
    workMusicUrl: 'https://freesound.org/data/previews/152/152515_2337088-lq.mp3',
    breakMusicName: 'DEFAULT',
    breakMusicUrl: 'https://freesound.org/data/previews/152/152515_2337088-lq.mp3',
}

function music(state = defaultMusic, action) {
    switch (action.type) {
        case 'changeWorkMusic':
            let M=new Audio( musicUrlList[action.payload])
            M.play()
            setTimeout(()=>{M.pause()},2000)
            return { ...state, workMusicName: action.payload, workMusicUrl: musicUrlList[action.payload] }
        case 'changeBreakMusic':
            let Mu=new Audio( musicUrlList[action.payload])
            Mu.play()
            setTimeout(()=>{Mu.pause()},2000)
            return { ...state, breakMusicName: action.payload, breakMusicUrl: musicUrlList[action.payload] }
        default:
            return state
    }
}
export default combineReducers({ task: task, completeTask: completeTask, music: music })
