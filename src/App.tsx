import PDFViewerPage from './pages/PDFViewerPage/PDFViewerPage'
import { BrowserRouter, Route, Routes } from 'react-router'
import SpeakerViewerPage from './pages/SpeakerViewerPage/SpeakerViewerPage'
import EditorPage from './pages/EditorPage/EditorPage'
import { CommandHistory } from './storage/history'
import SpeakerNotesWindow from './views/Viewers/SpeakerViewer/SpeakerNotesWindow/SpeakerNotesWindow'

type AppProps = {
    history: CommandHistory
}

function App({ history }: AppProps) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<EditorPage history={history} />} />
                <Route path='/viewer/pdf/:id' element={<PDFViewerPage />} />
                <Route path='/viewer/speaker/:id' element={<SpeakerViewerPage />} />
                <Route path='/viewer/speaker/notes' element={<SpeakerNotesWindow />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App