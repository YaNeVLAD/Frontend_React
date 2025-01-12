import { ImageType } from "../../../storage/types"
import style from './Image.module.css'

type ImageProps = {
    context: ImageType,
    scale: number
}

const Image = ({ context }: ImageProps) => {
    return (
        <div
            draggable={false}
            style={{
                backgroundImage: `url(${context.src.value})`,
            }}
            className={style.image}>
        </div >
    )
}

export { Image }