import * as functions from './../Model/functions'

import { Presentation, Slide, Image, TextArea, SolidColor } from './../Model/types'

const fullImage: Image = {
    id: 'object1',
    type: 'imageObj',
    pos: { x: 50, y: 50 },
    size: { width: 200, height: 200 },
    turnAngle: 45,
    src: { value: 'image1.png', type: 'image' },
}

const fullTextArea: TextArea = {
    id: 'object2',
    type: 'textObj',
    pos: { x: 100, y: 150 },
    size: { width: 300, height: 100 },
    turnAngle: 0,
    value: 'Hello World',
    font: 'Arial',
    color: 'black',
    textSize: 16,
}

const fullSlide1: Slide = {
    id: 'slide1',
    objects: [fullTextArea, fullImage],
    background: {
        color: 'red',
        type: 'solid'
    }
}

const fullSlide2: Slide = {
    id: 'slide2',
    objects: [fullTextArea, fullTextArea],
    background: {
        value: 'image.png',
        type: 'image'
    }
}

const fullSlide3: Slide = {
    id: 'slide3',
    objects: [fullImage, fullImage],
    background: {
        value: 'blue',
        type: 'gradient'
    }
}

const fullPresentation: Presentation = {
    title: 'Project Presentation',
    slides: [fullSlide1, fullSlide2, fullSlide3],
    selection: {
        SelectedSlidesIds: ['slide1'],
        SelectedObjectsIds: [],
    },
}
/* ///////
    TESTS
*/ ///////
console.log("1. Изменение заголовка презентации")
const updatedTitlePresentation = functions.changePresentationTitle('Updated Project Presentation', fullPresentation)
console.log(updatedTitlePresentation.title)

console.log("2. Добавление нового слайда")
const newSlide: Slide = {
    id: 'slide4',
    objects: [],
    background: { color: 'yellow', type: 'solid' } as SolidColor,
}

const presentationWithNewSlide = functions.addSlide(newSlide, fullPresentation)
console.log(presentationWithNewSlide.slides)

console.log("3. Выделение слайда")
fullPresentation.selection = functions.selectSlide(fullPresentation.selection, fullSlide1.id)
console.log(fullPresentation.selection.SelectedSlidesIds)

console.log("4. Выделение объекта")
fullPresentation.selection = functions.selectObject(fullPresentation.selection, fullSlide1.id, fullImage.id)
console.log(fullPresentation.selection)

console.log("5. Добавление объекта на слайд")
const newImage: Image = {
    id: 'object3',
    type: 'imageObj',
    pos: { x: 50, y: 50 },
    size: { width: 250, height: 250 },
    turnAngle: 90,
    src: { value: 'image2.png', type: 'image' },
}

const presentationWithNewObject = functions.addObject(fullPresentation.slides[0], newImage, fullPresentation.selection)
console.log(presentationWithNewObject.objects)

console.log("6. Перемещение объекта")
fullPresentation.selection = functions.selectObject(fullPresentation.selection, fullSlide1.id, fullImage.id)
const fullMovedObject = functions.moveObject(fullPresentation.slides[0], fullImage, 300, 400, fullPresentation.selection)
console.log(fullMovedObject)

console.log("7. Изменение фона")
const newBackground: SolidColor = {
    color: 'green',
    type: 'solid',
}

const fullUpdatedSlideBackground = functions.changeSlideBackground(fullSlide1, newBackground, fullPresentation.selection)
console.log(fullUpdatedSlideBackground)

console.log("8. Изменение текста")
fullPresentation.selection = functions.selectObject(fullPresentation.selection, fullSlide1.id, fullTextArea.id)
const updatedFullText = functions.changeTextValue(fullTextArea, 'Updated Text', fullPresentation.selection)
console.log(updatedFullText)

console.log("9. Изменение шрифта текста")
const updatedFullFont = functions.changeTextFont(fullTextArea, 'Times New Roman', fullPresentation.selection)
console.log(updatedFullFont)

console.log("10. Изменение цвета текста")
const updatedFullColor = functions.changeTextColor(fullTextArea, 'blue', fullPresentation.selection)
console.log(updatedFullColor)

console.log("11. Изменение размера теста")
const updatedFullTextSize = functions.changeTextScale(fullTextArea, 32, fullPresentation.selection)
console.log(updatedFullTextSize)

console.log("12. Удаление объекта")
fullPresentation.selection = functions.selectObject(fullPresentation.selection, fullSlide1.id, fullImage.id)
const fullSlideAfterObjectDeletion = functions.deleteObject(fullSlide1, fullImage, fullPresentation.selection)
console.log(fullSlideAfterObjectDeletion)

console.log("13. Удаление слайда")
const fullPresentationAfterSlideDeletion = functions.deleteSlide(fullSlide1, fullPresentation)
console.log(fullPresentationAfterSlideDeletion)

console.log("14. Перемещение слайда")

fullPresentation.selection = functions.selectSlide(fullPresentationAfterSlideDeletion.selection, fullSlide2.id)
const fullMovedSlide = functions.moveSlide(fullSlide2, fullSlide3, fullPresentation)
console.log(fullMovedSlide)