import PDFViewerPage from './pages/PDFViewerPage/PDFViewerPage'
import { BrowserRouter, Route, Routes } from 'react-router'
import ViewerPage from './pages/SpeakerViewerPage/SpeakerViewerPage'
import EditorPage from './pages/EditorPage/EditorPage'
import { CommandHistory } from './storage/history'

type AppProps = {
    history: CommandHistory
}

function App({ history }: AppProps) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<EditorPage history={history} />} />
                <Route path='/viewer/pdf/:id' element={<PDFViewerPage />} />
                <Route path='/viewer/speaker/:id' element={<ViewerPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App