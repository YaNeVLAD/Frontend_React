import { TextAreaType } from '../../../storage/types'
import style from './TextArea.module.css'
const MINIMUM_TEXT_SIZE = 1.5

type TextAreaProps = {
    object: TextAreaType,
    scale: number
    onClick: () => void,
}

function TextArea({ object, scale, onClick }: TextAreaProps) {
    const textAreaStyle = {
        font: object.font,
        fontSize: object.textSize * scale + MINIMUM_TEXT_SIZE,
        color: object.color,
    }

    return (
        <p
            style={textAreaStyle}
            className={style.textArea}
            onClick={onClick}>
            {object.value}
        </p>
    )
}

export { TextArea }