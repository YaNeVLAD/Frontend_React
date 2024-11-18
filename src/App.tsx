import { ZoomProvider } from './views/workspaceArea/scrollAreaWrapper/ZoomContext'
import { SlideCollection } from './views/slideCollection/SlideCollection'
import WorkspaceArea from './views/workspaceArea/WorkspaceArea'
import { COLLECTION_SLIDE_SCALE } from './storage/constants'
import { ToolsArea } from './views/toolsArea/ToolsArea'
import style from './App.module.css'

function App() {
    return (
        <ZoomProvider>
            <ToolsArea />
            <div
                className={style.container}>
                <SlideCollection
                    scale={COLLECTION_SLIDE_SCALE} />
                <WorkspaceArea />
            </div>
        </ZoomProvider>
    )
}

export default App