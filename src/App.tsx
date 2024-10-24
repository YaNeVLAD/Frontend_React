import { COLLECTION_SLIDE_SCALE, SELECTED_SLIDE_SCALE } from './storage/constants'
import { SlideCollection } from './views/slideCollection/SlideCollection'
import { ToolsArea } from './views/toolsArea/ToolsArea'
import { Slide } from './components/slide/Slide'
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
        <div className={style.workspaceArea}>
          <Slide
            id={editor.selection.selectedSlide.id}
            selectedObjectId={editor.selection.selectedObject?.id}
            objects={editor.selection.selectedSlide.objects}
            background={editor.selection.selectedSlide.background}
            isSelected={false}
            className={style.workspaceSlide}
            scale={SELECTED_SLIDE_SCALE} />
        </div>
      </div>
    </>
  )
}

export default App