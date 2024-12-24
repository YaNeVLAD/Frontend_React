type EditorType = {
    presentation: PresentationType,
    selection: SelectionType
}

type ViewModel = {
    slideTheme: SlideTheme
}

type SlideTheme = {
    background: BackgroundType
}

type PresentationType = {
    id: string,
    author: string,
    title: string,
    slides: Array<SlideType>
}

type SelectionType = {
    selectedSlideId?: string,
    selectedObjectId?: string,
}

type SlideType = {
    id: string,
    preset: SlidePreset,
    objects: Array<SlideObjectType>,
    background: BackgroundType,
    note: string
}

type SlidePreset = 'title' | 'image' | 'none' | 'title&text'

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

type FontFamily = 'Roboto-Bold' | 'Roboto-Regular' | 'Arial'

type Alignment = 'center' | 'start' | 'end'

type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000

type Font = {
    family: FontFamily,
    size: number,
    color: string,
    weight: Weight
}

type Text = {
    font: Font,
    alignment: {
        horizontal: Alignment,
        vertical: Alignment
    },
    value: string
}

type TextAreaType = BaseSlideObjectType & {
    type: 'textObj',
    placeholder: string,
    text: Text,
}

type ViewerMode = 'speaker' | 'slide-show'

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
    SizeType,
    PositionType,
    SlideObjectType,
    SlidePreset,
    ViewModel,
    SlideTheme,
    ViewerMode,
    Text,
    Font,
    Alignment,
    FontFamily,
    Weight,
}