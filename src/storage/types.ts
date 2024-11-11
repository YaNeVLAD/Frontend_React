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
    preset: SlidePreset,
    objects: Array<SlideObjectType>,
    background: BackgroundType
}

type SlidePreset = 'title' | 'image' | 'title&image' | 'none'

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

type PositionType = {
    x: number
    y: number
}

type SizeType = {
    width: number,
    height: number
}

type BaseSlideObjectType = {
    id: string,
    type: 'imageObj' | 'textObj'
    pos: PositionType,
    size: SizeType,
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

type DropListOptionType = {
    id: number,
    value: string,
    onClick: () => void,
}

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
    SizeType,
    PositionType,
    SlideObjectType,
    DropListOptionType,
    SlidePreset,
}