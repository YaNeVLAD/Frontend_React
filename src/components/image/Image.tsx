import { ImageType } from "../../storage/types"
import style from './Image.module.css'

type ImageProps = {
    object: ImageType
}

function Image(imageProps: ImageProps) {
    const imageStyle = {
        left: imageProps.object.pos.x,
        top: imageProps.object.pos.y,
        height: imageProps.object.size.height,
        width: imageProps.object.size.width,
        transform: 'rotate(' + imageProps.object.turnAngle + 'deg)'
    }

    return (
        <img style={imageStyle}
            className={style.image}
            src={imageProps.object.src.value} />
    )
}

export { Image }