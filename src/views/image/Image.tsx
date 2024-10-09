import { ImageType } from "../../storage/types"
import style from './Image.module.css'

type ImageProps = {
    object: ImageType,
    scale: number
    onClick: () => void,
}

function Image({ object, onClick }: ImageProps) {
    return (
        <img
            className={style.image}
            src={object.src.value}
            onClick={onClick} />
    )
}

export { Image }