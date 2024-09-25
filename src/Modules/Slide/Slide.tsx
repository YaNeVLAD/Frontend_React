import { GradientColor, ImageSrc, ImageType, SolidColor, TextAreaType } from "../../Model/types"
import { TextArea } from "../TextArea/TextArea"
import { Image } from "../Image/Image"
import style from './Slide.module.css'

type SlideProps = {
    id: string,
    objects: Array<TextAreaType | ImageType>
    background: SolidColor | GradientColor | ImageSrc
}

function Slide(slideProps: SlideProps) {
    let slideStyle
    switch (slideProps.background.type) {
        case 'solid':
            {
                slideStyle = {
                    backgroundColor: slideProps.background.value
                }
                break
            }
        case 'image':
            {
                slideStyle = {
                    backgroundImage: 'url(\'' + slideProps.background.value + '\')'
                }
                break
            }
        case 'gradient':
            {
                slideStyle = {
                    backgroundImage: 'linear-gradient(to left, ' + slideProps.background.value.firstColor + ', ' + slideProps.background.value.secondColor + ')'
                }
                break
            }
    }

    return (
        <div style={slideStyle} className={style.slide}>
            {
                slideProps.objects.map(object => {
                    switch (object.type) {
                        case 'textObj':
                            return <TextArea
                                key={object.id}
                                value={object.value}
                                font={object.font}
                                color={object.color}
                                textSize={object.textSize}
                                pos={object.pos}
                                size={object.size}
                                turnAngle={object.turnAngle} />
                        case 'imageObj':
                            return <Image
                                key={object.id}
                                src={object.src}
                                pos={object.pos}
                                size={object.size}
                                turnAngle={object.turnAngle} />
                    }
                })
            }
        </div>
    )
}

export { Slide }