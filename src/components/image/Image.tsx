import { ImageSrc } from "../../Model/types"
import style from './Image.module.css'

type ImageProps = {
    pos: {
        x: number,
        y: number,
    },
    size: {
        width: number,
        height: number,
    },
    turnAngle: number,
    src: ImageSrc
}

function Image(ImageProps: ImageProps) {
    const imageStyle = {
        left: ImageProps.pos.x,
        top: ImageProps.pos.y,
        height: ImageProps.size.height,
        width: ImageProps.size.width,
        transform: 'rotate(' + ImageProps.turnAngle + 'deg)'
    }

    return (
        <div>
            <img style={imageStyle} className={style.image} src={ImageProps.src.value} />
        </div>
    )
}

export { Image }