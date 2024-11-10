import { SlideCollection } from './views/slideCollection/SlideCollection'
import WorkspaceArea from './views/workspaceArea/WorkspaceArea'
import { COLLECTION_SLIDE_SCALE } from './storage/constants'
import { ToolsArea } from './views/toolsArea/ToolsArea'
import { EditorType } from './storage/types'
import style from './App.module.css'

type AppProps = {
    editor: EditorType
}

function App({ editor }: AppProps) {
    return (
        <>
            <ToolsArea
                title={editor.presentation.title}
                selection={editor.selection} />
            <div className={style.container}>
                <SlideCollection
                    slides={editor.presentation.slides}
                    selectedSlideId={editor.selection.selectedSlide.id}
                    scale={COLLECTION_SLIDE_SCALE} />
                <WorkspaceArea
                    slide={editor.selection.selectedSlide}
                    selectedObject={editor.selection.selectedObject} />
            </div>
        </>
    )
}

export default App