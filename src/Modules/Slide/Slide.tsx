import { GradientColor, ImageSrc, ImageType, SolidColor, TextAreaType } from "../../Model/types"
import { SlideObject } from "../SlideObject/SlideObject"
import style from './Slide.module.css'

type SlideProps = {
    id: string,
    objects: Array<TextAreaType | ImageType>
    background: SolidColor | GradientColor | ImageSrc,
}

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
                slideStyle.backgroundImage = 'linear-gradient(to left, ' + slideProps.background.value.firstColor + ', ' + slideProps.background.value.secondColor + ')'
                break
            }
    }

    return (
        <div style={slideStyle} className={style.slide}>
            {
                slideProps.objects.map(
                    object => {
                        return <SlideObject object={object} />
                    }
                )
            }
        </div>
    )
}

export { Slide }