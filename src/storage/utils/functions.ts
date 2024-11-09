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

function uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

export {
    // moveSlide,
    // moveObject,
    // changeTextFont,
    // changeTextScale,
    // changeTextColor,
    uuid
}