import { TextAreaType } from '../../../storage/types'
import { useRef } from 'react'
import style from './TextArea.module.css'

type TextAreaProps = {
    context: TextAreaType,
    scale: number,
}

const TextArea = ({ context, scale }: TextAreaProps) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const textAreaStyle = {
        fontFamily: context.font,
        fontSize: context.textSize * scale,
        color: context.color,
    }

    return (
        <div className={style.textAreaWrapper}>
            <textarea
                ref={textAreaRef}
                draggable={false}
                defaultValue={context.value}
                style={textAreaStyle}
                className={style.textAreaInput}
                autoFocus
                rows={1} />
        </div>
    )
}

export { TextArea }