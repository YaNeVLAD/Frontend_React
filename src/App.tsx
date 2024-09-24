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
  turnAngle: 45,
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
    value: "#FF00FF",
    type: 'solid'
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

const TestPresentation: PresentationType = {
  title: 'My Presentation',
  slidesIds: [Slide1.id, Slide2.id, Slide3.id, Slide4.id, Slide5.id],
}

const selection: GlobalSelectionType = {
  SelectedSlide: Slide1,
  SelectedObject: Slide1.objects[0]
}

function App() {
  return (
    <Presentation title={TestPresentation.title} slidesIds={TestPresentation.slidesIds} selection={selection} />
  )
}

export default App