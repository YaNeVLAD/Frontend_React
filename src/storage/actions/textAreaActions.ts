import { deepCopy } from "../utils/deepCopy"
import { Alignment, FontFamily, FontStyle, FontWeight, SlideType, TextDecoration } from "../types"

function changeTextValue(
    slide: SlideType,
    { selectedObjectId, value }: { selectedObjectId?: string, value: string }
): SlideType {
    const slideCopy = deepCopy(slide)

    const selectedObject = slideCopy.objects.find(
        obj => obj.id == selectedObjectId
    )
    if (selectedObject == undefined || selectedObject.type != 'textObj') return slide

    selectedObject.text.value = value

    return slideCopy
}

function changeFontFamily(
    state: SlideType,
    payload: {
        selectedSlideId: string,
        selectedObjectId: string,
        newFamily: FontFamily,
    }
): SlideType {
    const slideCopy = deepCopy(state)
    const object = slideCopy.objects.find(obj => obj.id == payload.selectedObjectId)
    if (!object || object.type != 'textObj') return state
    object.text.font.family = payload.newFamily
    return slideCopy
}

function changeTextColor(
    state: SlideType,
    payload: {
        selectedSlideId: string,
        selectedObjectId: string,
        newColor: string,
    }
): SlideType {
    const slideCopy = deepCopy(state)
    const object = slideCopy.objects.find(obj => obj.id == payload.selectedObjectId)
    if (!object || object.type != 'textObj') return state
    object.text.font.color = payload.newColor
    return slideCopy
}

function changeFontSize(
    state: SlideType,
    payload: {
        selectedSlideId: string,
        selectedObjectId: string,
        newSize: number
    }
): SlideType {
    const slideCopy = deepCopy(state)
    const object = slideCopy.objects.find(obj => obj.id == payload.selectedObjectId)
    if (!object || object.type != 'textObj') return state
    object.text.font.size = payload.newSize
    return slideCopy
}

function changeTextAlignment(
    state: SlideType,
    payload: {
        selectedSlideId: string;
        selectedObjectId: string;
        vertical?: Alignment;
        horizontal?: Alignment
    }): SlideType {
    const slideCopy = deepCopy(state)
    const object = slideCopy.objects.find(obj => obj.id == payload.selectedObjectId)
    if (!object || object.type != 'textObj') return state
    object.text.alignment = {
        horizontal: payload.horizontal || object.text.alignment.horizontal,
        vertical: payload.vertical || object.text.alignment.vertical,
    }
    return slideCopy
}

function changeTextStyles(
    state: SlideType,
    payload: {
        selectedSlideId: string;
        selectedObjectId: string;
        weight?: FontWeight;
        style?: FontStyle;
        decoration?: TextDecoration
    }
): SlideType {
    const slideCopy = deepCopy(state)
    const object = slideCopy.objects.find(obj => obj.id == payload.selectedObjectId)
    if (!object || object.type != 'textObj') return state
    object.text = {
        ...object.text,
        font: {
            family: object.text.font.family,
            size: object.text.font.size,
            weight: payload.weight || object.text.font.weight,
            style: payload.style || object.text.font.style,
            color: object.text.font.color
        },
        decoration: payload.decoration || object.text.decoration
    }
    return slideCopy
}

export {
    changeFontSize,
    changeTextValue,
    changeTextColor,
    changeTextStyles,
    changeFontFamily,
    changeTextAlignment,
}