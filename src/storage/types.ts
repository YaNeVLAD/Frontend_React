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
    selectedSlideIds?: Array<string>,
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

type LinearGradientType = {
    type: 'linear',
    start: number
}

type RadialGradientStart = 'center' | 'top left' | 'top right' | 'bottom left' | 'bottom right'

type RadialGradientType = {
    type: 'radial',
    start: RadialGradientStart
}

type GradientType = LinearGradientType | RadialGradientType

type GradientColor = {
    type: 'gradient',
    gradient: GradientType,
    value: Array<{ color: string, position: number }>,
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

type Alignment = 'center' | 'start' | 'end'

type FontWeight = 'Normal' | 'Bold'
type FontStyle = 'Normal' | 'Italic'
type FontFamily = 'Roboto' | 'Montserrat' | 'Inter' | 'Open Sans'
type TextDecoration = 'none' | 'underline'

type Font = {
    family: FontFamily,
    weight: FontWeight,
    style: FontStyle,
    size: number,
    color: string,
}

type TextAlignment = {
    horizontal: Alignment,
    vertical: Alignment,
}

type Text = {
    font: Font,
    alignment: TextAlignment,
    decoration: TextDecoration,
    value: string,
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
    FontStyle,
    FontWeight,
    TextAlignment,
    TextDecoration,
    GradientType,
    LinearGradientType,
    RadialGradientType,
    RadialGradientStart,
}