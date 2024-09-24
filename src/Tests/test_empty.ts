import * as functions from './../Model/functions'

import { Presentation, Slide, Image, TextArea, SolidColor } from './../Model/types'

const minimalPresentation: Presentation = {
    title: '',
    slides: [],
    selection: {
        SelectedSlidesIds: [],
        SelectedObjectsIds: [],
    },
}

const minimalImage: Image = {
    id: 'object1',
    type: 'imageObj',
    pos: { x: 0, y: 0 },
    size: { width: 100, height: 100 },
    turnAngle: 0,
    src: { value: 'default.png', type: 'image' },
}

const minimalTextArea: TextArea = {
    id: 'object2',
    type: 'textObj',
    pos: { x: 0, y: 0 },
    size: { width: 100, height: 50 },
    turnAngle: 0,
    value: '',
    font: 'Arial',
    color: 'black',
    textSize: 12,
}

const minimalSlide1: Slide = {
    id: 'slide1',
    objects: [],
    background: { color: 'white', type: 'solid' } as SolidColor,
}

const minimalSlide2: Slide = {
    id: 'slide2',
    objects: [],
    background: { color: 'white', type: 'solid' } as SolidColor,
}
/* ///////
    TESTS
*/ ///////
console.log("1. Изменение заголовка презентации")
const updatedTitleMinimalPresentation = functions.changePresentationTitle('Minimal Presentation', minimalPresentation)
console.log(updatedTitleMinimalPresentation.title)

console.log("2. Добавление нового слайда")
const presentationWithMinimalSlide = functions.addSlide(minimalSlide1, minimalPresentation)
console.log(presentationWithMinimalSlide.slides)

console.log("3. Выделение слайда")
minimalPresentation.selection = functions.selectSlide(minimalPresentation.selection, 'slide1')
console.log(minimalPresentation.selection)

console.log("4. Выделение объекта")
minimalPresentation.selection = functions.selectObject(minimalPresentation.selection, 'slide1', 'object1')
console.log(minimalPresentation.selection)

console.log("5. Добавление объекта на слайд")
const presentationWithMinimalObject = functions.addObject(minimalSlide1, minimalImage, minimalPresentation.selection)
console.log(presentationWithMinimalObject.objects)

console.log("6. Перемещение объекта")
const minimalMovedObject = functions.moveObject(minimalSlide1, minimalImage, 50, 50, minimalPresentation.selection)
console.log(minimalMovedObject)

console.log("7. Изменение фона")
const minimalUpdatedSlideBackground = functions.changeSlideBackground(minimalSlide1, { color: 'gray', type: 'solid' }, minimalPresentation.selection)
console.log(minimalUpdatedSlideBackground)

console.log("8. Изменение текста")
minimalPresentation.selection = functions.selectObject(minimalPresentation.selection, 'slide1', minimalTextArea.id) // Выбираем объект
const updatedMinimalText = functions.changeTextValue(minimalTextArea, 'New Text', minimalPresentation.selection)
console.log(updatedMinimalText)

console.log("9. Изменение шрифта текста")
const updatedMinimalFont = functions.changeTextFont(minimalTextArea, 'Verdana', minimalPresentation.selection)
console.log(updatedMinimalFont)

console.log("10. Изменение цвета текста")
const updatedMinimalColor = functions.changeTextColor(minimalTextArea, 'red', minimalPresentation.selection)
console.log(updatedMinimalColor)

console.log("11. Изменение размера теста")
const updatedMinimalTextSize = functions.changeTextScale(minimalTextArea, 18, minimalPresentation.selection)
console.log(updatedMinimalTextSize)

console.log("12. Удаление объекта")
minimalPresentation.selection = functions.selectObject(minimalPresentation.selection, 'slide1', minimalImage.id)
const minimalSlideAfterObjectDeletion = functions.deleteObject(minimalSlide1, minimalImage, minimalPresentation.selection)
console.log(minimalSlideAfterObjectDeletion)

console.log("13. Удаление слайда")
let newSlidePresentation2 = functions.addSlide(minimalSlide1, minimalPresentation)
console.log(newSlidePresentation2.slides)
newSlidePresentation2 = functions.deleteSlide(minimalSlide1, minimalPresentation)
console.log(newSlidePresentation2.slides)

console.log("14. Перемещение слайда")
minimalPresentation.selection = functions.selectSlide(minimalPresentation.selection, minimalPresentation.slides[0].id)
const minimalMovedSlide = functions.moveSlide(minimalSlide1, minimalSlide2, minimalPresentation)
console.log(minimalMovedSlide)