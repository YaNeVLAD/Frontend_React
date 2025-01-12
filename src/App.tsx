import { EditorRoute, PDFViewerRoute, SlideShowRoute, SpeakerNotesRoute, SpeakerViewerRoute } from './storage/utils/createPath'
import SpeakerNotesWindow from './views/Viewers/SpeakerViewer/SpeakerNotesWindow/SpeakerNotesWindow'
import PresentationViewer from './views/Viewers/PresentationViewer/PresentationViewer'
import SpeakerViewer from './views/Viewers/SpeakerViewer/SpeakerViewer'
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
                <Route path={SpeakerViewerRoute.url} element={<SpeakerViewer />} />
                <Route path={SpeakerNotesRoute.url} element={<SpeakerNotesWindow />} />
                <Route path={SlideShowRoute.url} element={<PresentationViewer />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App