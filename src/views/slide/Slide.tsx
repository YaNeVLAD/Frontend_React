import { GradientColor, ImageSrc, ImageType, SolidColor, TextAreaType } from "../../storage/types"
import { SlideObject } from "../../components/slideObject/SlideObject"
import style from './Slide.module.css'

type SlideProps = {
    id: string,
    selectedObjectId: string | undefined,
    objects: Array<TextAreaType | ImageType>
    background: SolidColor | GradientColor | ImageSrc,
}

//Порешать превью. Сделать её слайдом. В каждый слайд и объект прокидывать scale
function Slide(slideProps: SlideProps) {

    const slideStyle = {
        backgroundColor: '',
        backgroundImage: '',
    }

    switch (slideProps.background.type) {
        case 'solid':
            {
                slideStyle.backgroundColor = slideProps.background.value
                break
            }
        case 'image':
            {
                slideStyle.backgroundImage = 'url(\'' + slideProps.background.value + '\')'
                break
            }
        case 'gradient':
            {
                slideStyle.backgroundImage = 'linear-gradient(to left, ' + slideProps.background.value[0] + ', ' + slideProps.background.value[1] + ')'
                break
            }
    }

    return (
        <div style={slideStyle} className={style.slide}>
            {
                slideProps.objects.map(
                    object => <SlideObject
                        key={object.id}
                        object={object}
                        selectedObjectId={slideProps.selectedObjectId} />
                )
            }
        </div>
    )
}

export { Slide }