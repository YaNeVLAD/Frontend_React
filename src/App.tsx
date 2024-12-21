import { BrowserRouter, Route, Routes } from 'react-router'
import EditorPage from './pages/EditorPage/EditorPage'
import ViewerPage from './pages/ViewerPage/ViewerPage'
import { CommandHistory } from './storage/history'

type AppProps = {
    history: CommandHistory
}

function App({ history }: AppProps) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<EditorPage history={history} />} />
                <Route path='/viewer' element={<ViewerPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App