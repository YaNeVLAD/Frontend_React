import { EditorType } from './storage/types'
import { SlideCollection } from './views/slideCollection/SlideCollection'
import { ToolsArea } from './views/toolsArea/ToolsArea'
import { Slide } from './views/slide/Slide'
import style from './App.module.css'

const COLLECTION_SLIDE_SCALE = 0.2
const SELECTED_SLIDE_SCALE = 1

type AppProps = {
  editor: EditorType
}

function App({ editor }: AppProps) {
  return (
    <>
      <ToolsArea 
        title={editor.presentation.title}
        background={editor.selection.selectedSlide.background} />
      <div className={style.container}>
        <SlideCollection
          slides={editor.presentation.slides}
          selectedSlideId={editor.selection.selectedSlide.id}
          scale={COLLECTION_SLIDE_SCALE} />
        <Slide
          id={editor.selection.selectedSlide.id}
          selectedObjectId={editor.selection.selectedObject?.id}
          objects={editor.selection.selectedSlide.objects}
          background={editor.selection.selectedSlide.background}
          isSelected={false}
          className={style.selectedSlide}
          scale={SELECTED_SLIDE_SCALE} />
        <div>
        </div>
      </div>
    </>
  )
}

export default App