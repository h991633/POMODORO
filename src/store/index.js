import { createStore } from 'redux'
import reducer from './reducer'



var store = createStore(reducer)
// store.subscribe(function () {
//     console.log('Store', store.getState())
// })

export default store
