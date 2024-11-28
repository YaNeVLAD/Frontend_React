// //Разнести функции на файлы

// function changeTextFont(textArea: TextAreaType, newFont: string, selection: GlobalSelectionType): TextAreaType {
//     if (selection.selectedObject != textArea) {
//         throw new Error('Can\'t change text font of area that isn\'t selected')
//     }

//     return {
//         ...textArea,
//         font: newFont
//     }
// }

// function changeTextColor(textArea: TextAreaType, newColor: string, selection: GlobalSelectionType): TextAreaType {
//     if (selection.selectedObject != textArea) {
//         throw new Error('Can\'t change text color of area that isn\'t selected')
//     }

//     return {
//         ...textArea,
//         color: newColor
//     }
// }

// function changeTextScale(textArea: TextAreaType, newSize: number, selection: GlobalSelectionType): TextAreaType {
//     if (selection.selectedObject != textArea) {
//         throw new Error('Can\'t change text size of area that isn\'t selected')
//     }

//     return {
//         ...textArea,
//         textSize: newSize
//     }
// }

function uuid() {
    const uuid = new Array(36)
    for (let i = 0; i < 36; i++) {
      uuid[i] = Math.floor(Math.random() * 16)
    }
    uuid[14] = 4
    uuid[19] = uuid[19] &= ~(1 << 2)
    uuid[19] = uuid[19] |= (1 << 3) 
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    return uuid.map((x) => x.toString(16)).join('')
  }

export {
    // moveSlide,
    // moveObject,
    // changeTextFont,
    // changeTextScale,
    // changeTextColor,
    uuid
}