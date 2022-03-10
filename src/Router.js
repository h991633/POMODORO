import { Routes, Route, HashRouter } from 'react-router-dom'

import Main from './Main'
import List from './List'
import Music from './Music'
import Chart from './Chart'
export default function Router() {
    
    return (
        <HashRouter>
            <Routes>
                <Route path="/list" element={<List />} />
                <Route path="/music" element={<Music />} />
                <Route path="/chart" element={<Chart />} />
                <Route path="/" element={<Main />} />
            </Routes>
        </HashRouter>
    )
}
