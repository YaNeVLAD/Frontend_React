import './App.css'
import { uuid } from './Model/functions'
import { GlobalSelectionType, ImageType, PresentationType, SlideType, TextAreaType } from './Model/types'
import { Presentation } from './components/presentation/Presentation'
import { ToolsArea } from './components/toolsArea/ToolsArea'

const TextArea1: TextAreaType = {
  id: uuid(),
  type: 'textObj',
  pos: { x: 160, y: 222 },
  size: { width: 300, height: 100 },
  turnAngle: 111,
  value: 'Hello World!',
  font: 'Arial',
  color: '#808080',
  textSize: 17,
}

const TextArea2: TextAreaType = {
  id: uuid(),
  type: 'textObj',
  pos: { x: 333, y: 333 },
  size: { width: 100, height: 50 },
  turnAngle: 1,
  value: 'I love Frontend!',
  font: 'Arial',
  color: '#FAFAFA',
  textSize: 33,
}

const TextArea3: TextAreaType = {
  id: uuid(),
  type: 'textObj',
  pos: { x: 755, y: 333 },
  size: { width: 100, height: 50 },
  turnAngle: 1,
  value: '',
  font: 'Arial',
  color: '#FAFAFA',
  textSize: 33,
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
  objects: [TextArea1, TextArea2, TextArea3, Image],
  background: {
    value: "#FFFAAA",
    type: 'solid'
  }
}

const Slide2: SlideType = {
  id: uuid(),
  objects: [Image, TextArea2, TextArea3],
  background: {
    value: "/brawl-stars.gif",
    type: 'image'
  }
}

const Slide3: SlideType = {
  id: uuid(),
  objects: [TextArea2, TextArea1],
  background: {
    values: ['#00FFAA', '#AAFF00'],
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
  selectedSlide: slides[0],
  selectedObject: undefined
}

const TestPresentation: PresentationType = {
  title: 'My Presentation',
  slides: slides,
  selection: selection
}

function App() {
  return (
    <>
    <ToolsArea/>
    <Presentation
      title={TestPresentation.title}
      slides={TestPresentation.slides}
      selection={selection} />
    </>
    
  )
}

export default App