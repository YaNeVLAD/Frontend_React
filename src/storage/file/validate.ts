/* eslint-disable @typescript-eslint/no-explicit-any */
import { PositionType, PresentationType, SlideObjectType } from "../types"

const validateDocument = (data: any): data is PresentationType => {
    if (typeof data !== 'object') return false

    if (
        typeof data.title !== 'string' ||
        !Array.isArray(data.slides)
    ) return false

    return data.slides.every((slide: any) =>
        typeof slide.id === 'string' &&
        ['title', 'image', 'title&image', 'none'].includes(slide.startContentType) &&
        Array.isArray(slide.objects) &&
        slide.objects.every(validateSlideObject)
    )
}

const validateSlideObject = (obj: any): obj is SlideObjectType => {
    if (obj.type === 'imageObj') {
        return (
            typeof obj.src.value === 'string' &&
            obj.src.type === 'image' &&
            validatePosition(obj.pos) &&
            validateSize(obj.size)
        )
    } else if (obj.type === 'textObj') {
        return (
            typeof obj.value === 'string' &&
            typeof obj.font === 'string' &&
            typeof obj.color === 'string' &&
            typeof obj.textSize === 'number' &&
            validatePosition(obj.pos) &&
            validateSize(obj.size)
        )
    }
    return false
}

const validatePosition = (pos: any): pos is PositionType => {
    return typeof pos.x === 'number' && typeof pos.y === 'number'
}

const validateSize = (size: any): size is { width: number, height: number } => {
    return typeof size.width === 'number' && typeof size.height === 'number'
}

export { validateDocument }