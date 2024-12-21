import SpeakerNotesWindow from './views/Viewers/SpeakerViewer/SpeakerNotesWindow/SpeakerNotesWindow'
import SpeakerViewerPage from './pages/SpeakerViewerPage/SpeakerViewerPage'
import PDFViewerPage from './pages/PDFViewerPage/PDFViewerPage'
import { BrowserRouter, Route, Routes } from 'react-router'
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
                <Route path='/view/pdf/:id' element={<PDFViewerPage />} />
                <Route path='/view/s/:id' element={<SpeakerViewerPage />} />
                <Route path='/view/s/:id/n' element={<SpeakerNotesWindow />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App