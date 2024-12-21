import { TextAreaType } from '../../../storage/types'
import { CSSProperties, useRef } from 'react'
import style from './TextArea.module.css'

type TextAreaProps = {
    context: TextAreaType,
    scale: number,
}

const TextArea = ({ context, scale }: TextAreaProps) => {
    const textAreaRef = useRef(null)

    const textAreaStyle: CSSProperties = {
        fontFamily: context.font,
        fontSize: context.textSize * scale,
        color: context.color,
        userSelect: 'none'
    }

    return (
        <div className={style.textAreaWrapper}>
            <p
                ref={textAreaRef}
                draggable={false}
                style={textAreaStyle}
                className={style.textAreaInput}>
                {context.value}
            </p>
        </div>
    )
}

export { TextArea }