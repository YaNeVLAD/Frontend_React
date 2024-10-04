type PresentationType = {
    title: string,
    slides: Array<SlideType>
    selection: GlobalSelectionType
}

type GlobalSelectionType = {
    selectedSlide: SlideType,
    selectedObject?: SlideObjectType,
}

type SlideType = {
    id: string,
    objects: Array<ImageType | TextAreaType>,
    background: SolidColor | GradientColor | ImageSrc,
}

type SolidColor = {
    value: string,
    type: 'solid',
}

type GradientColor = {
    values: Array<string>,
    type: 'gradient',
}

type ImageSrc = {
    value: string,
    type: 'image',
}

type SlideObjectType = {
    id: string,
    type: 'imageObj' | 'textObj'

    pos: {
        x: number,
        y: number,
    },
    size: {
        width: number,
        height: number,
    },
    turnAngle: number,
}

type ImageType = SlideObjectType & {
    type: 'imageObj',
    src: ImageSrc,
}

type TextAreaType = SlideObjectType & {
    type: 'textObj',
    value: string,
    font: string,
    color: string
    textSize: number,
}

export type {
    PresentationType,
    SlideType,
    GlobalSelectionType,
    SlideObjectType,
    TextAreaType,
    ImageType,
    ImageSrc,
    SolidColor,
    GradientColor
}