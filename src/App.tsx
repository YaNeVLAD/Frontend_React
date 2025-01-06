import { EditorRoute, PDFViewerRoute, SpeakerNotesRoute, SpeakerViewerRoute } from './storage/utils/createPath'
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
                <Route path={EditorRoute.url} element={<EditorPage history={history} />} />
                <Route path={PDFViewerRoute.url} element={<PDFViewerPage />} />
                <Route path={SpeakerViewerRoute.url} element={<SpeakerViewerPage />} />
                <Route path={SpeakerNotesRoute.url} element={<SpeakerNotesWindow />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App