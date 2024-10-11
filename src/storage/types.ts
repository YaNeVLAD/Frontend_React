//В SelectionType хранить id
//А то реально получается, что в каждой функции есть такое типо
//find(smth => smth.id == editor.selection.selectedSlide.id)
//Чтоб справа такого не было, храним id

type EditorType = {
    presentation: PresentationType,
    selection: SelectionType
}

type PresentationType = {
    title: string,
    slides: Array<SlideType>
}

type SelectionType = {
    selectedSlide: SlideType,
    selectedObject?: SlideObjectType,
}

type SlideType = {
    id: string,
    objects: Array<SlideObjectType>,
    background: BackgroundType
}

type BackgroundType = SolidColor | ImageSrc | GradientColor

type SolidColor = {
    value: string,
    type: 'solid',
}

type GradientColor = {
    value: Array<string>,
    type: 'gradient',
}

type ImageSrc = {
    value: string,
    type: 'image',
}

type BaseSlideObjectType = {
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

type ImageType = BaseSlideObjectType & {
    type: 'imageObj',
    src: ImageSrc,
}

type TextAreaType = BaseSlideObjectType & {
    type: 'textObj',
    value: string,
    font: string,
    color: string
    textSize: number,
}

type SlideObjectType = ImageType | TextAreaType

export type {
    EditorType,
    PresentationType,
    SlideType,
    SelectionType,
    BaseSlideObjectType,
    TextAreaType,
    ImageType,
    ImageSrc,
    SolidColor,
    GradientColor,
    BackgroundType,
    SlideObjectType
}