import { ImageType } from "../../storage/types"
import style from './Image.module.css'

type ImageProps = {
    object: ImageType,
    onClick: () => void,
}

function Image(imageProps: ImageProps) {
    return (
        <img
            className={style.image}
            src={imageProps.object.src.value}
            onClick={imageProps.onClick} />
    )
}

export { Image }