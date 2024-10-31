import { selectObject } from "../../../storage/actions/object/select"
import { dispatch } from "../../../storage/editor"
import { ImageType } from "../../../storage/types"
import style from './Image.module.css'

type ImageProps = {
    context: ImageType,
    scale: number
}

function Image({ context }: ImageProps) {
    const onClick = () => dispatch(selectObject, { id: context.id })
    return (
        <img
            draggable={false}
            className={style.image}
            src={context.src.value}
            onClick={onClick} />
    )
}

export { Image }