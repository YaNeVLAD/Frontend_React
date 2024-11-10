import { selectObject } from "../../../storage/actions/objectActions"
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
        <div
            draggable={false}
            style={{
                backgroundImage: `url(${context.src.value})`,
            }}
            className={style.image}
            onClick={onClick} >

        </div >

        // <img
        //     draggable={false}
        //     className={style.image}
        //     src={context.src.value}
        //     onClick={onClick} />
    )
}

export { Image }