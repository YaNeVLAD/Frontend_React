import './App.css'
import { uuid } from './Model/functions'
import { GlobalSelectionType, ImageType, PresentationType, SlideType, TextAreaType } from './Model/types'
import { Presentation } from './Modules/Presentation/Presentation'

const TextArea: TextAreaType = {
  id: uuid(),
  type: 'textObj',
  pos: { x: 100, y: 150 },
  size: { width: 300, height: 100 },
  turnAngle: 15,
  value: 'Hello World!',
  font: 'Arial',
  color: '#808080',
  textSize: 27,
}

const Image: ImageType = {
  id: uuid(),
  type: 'imageObj',
  pos: { x: 500, y: 200 },
  size: { width: 200, height: 200 },
  turnAngle: 188,
  src: { value: '/aboba.png', type: 'image' },
}

const Slide1: SlideType = {
  id: uuid(),
  objects: [TextArea, Image],
  background: {
    value: "#FFFAAA",
    type: 'solid'
  }
}

const Slide2: SlideType = {
  id: uuid(),
  objects: [],
  background: {
    value: "/brawl-stars.gif",
    type: 'image'
  }
}

const Slide3: SlideType = {
  id: uuid(),
  objects: [],
  background: {
    value:
    {
      firstColor: '#00FFAA',
      secondColor: '#AAFF00'
    },
    type: 'gradient'
  }
}

const Slide4: SlideType = {
  id: uuid(),
  objects: [],
  background: {
    value: "#AAAEEE",
    type: 'solid'
  }
}

const Slide5: SlideType = {
  id: uuid(),
  objects: [],
  background: {
    value: "#555555",
    type: 'solid'
  }
}

const slides: Array<SlideType> = [Slide1, Slide2, Slide3, Slide4, Slide5]

const selection: GlobalSelectionType = {
  SelectedSlide: slides[2],
  SelectedObject: undefined
}

const TestPresentation: PresentationType = {
  title: 'My Presentation',
  slides: slides,
  selection: selection
}

function App() {
  return (
    <Presentation
      title={TestPresentation.title}
      slides={TestPresentation.slides}
      selection={selection} />
  )
}

export default App