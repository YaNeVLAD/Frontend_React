import { ZoomProvider } from './views/WorkspaceArea/ScrollAreaWrapper/ZoomContext'
import { SlideCollection } from './views/SlideCollection/SlideCollection'
import WorkspaceArea from './views/WorkspaceArea/WorkspaceArea'
import { COLLECTION_SLIDE_SCALE } from './storage/constants'
import { ToolsArea } from './views/ToolsArea/ToolsArea'
import style from './App.module.css'

function App() {
    return (
        <ZoomProvider>
            <ToolsArea />
            <div className={style.container}>
                <SlideCollection scale={COLLECTION_SLIDE_SCALE} />
                <WorkspaceArea />
            </div>
        </ZoomProvider>
    )
}

export default App