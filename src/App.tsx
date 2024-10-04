import { PresentationType } from './storage/types'
import { SlideCollection } from './views/slideCollection/SlideCollection'
import { ToolsArea } from './views/toolsArea/ToolsArea'
import style from './App.module.css'
import { Slide } from './components/slide/Slide'

type AppProps = {
  presentation: PresentationType
}

function App(appProps: AppProps) {
  const presentation = appProps.presentation
  return (
    <>
      <ToolsArea title={presentation.title} />
      <div className={style.presentation}>
        <SlideCollection
          slides={presentation.slides}
          selectedSlideId={presentation.selection.selectedSlide.id} />
        <Slide
          id={presentation.selection.selectedSlide.id}
          selectedObjectId={presentation.selection.selectedObject?.id}
          objects={presentation.selection.selectedSlide.objects}
          background={presentation.selection.selectedSlide.background}
          scale={1} />
      </div>
    </>
  )
}

export default App