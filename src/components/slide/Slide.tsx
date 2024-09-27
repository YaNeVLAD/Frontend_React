import { GradientColor, ImageSrc, ImageType, SolidColor, TextAreaType } from "../../Model/types"
import { SlideObject } from "../slideObject/SlideObject"
import style from './Slide.module.css'

type SlideProps = {
    id: string,
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
                slideStyle.backgroundImage = 'linear-gradient(to left, ' + slideProps.background.values[0] + ', ' + slideProps.background.values[1] + ')'
                break
            }
    }

    return (
        <div style={slideStyle} className={style.slide}>
            {
                slideProps.objects.map(
                    object => <SlideObject object={object} />
                )
            }
        </div>
    )
}

export { Slide }