import { TextAreaType } from '../../storage/types'
import style from './TextArea.module.css'

type TextAreaProps = {
    object: TextAreaType,
    onClick: () => void,
}

function TextArea(textAreaProps: TextAreaProps) {
    const textAreaStyle = {
        font: textAreaProps.object.font,
        fontSize: textAreaProps.object.textSize,
        color: textAreaProps.object.color,
    }

    return (
        <p
            style={textAreaStyle}
            className={style.textArea}
            onClick={textAreaProps.onClick}>
            {textAreaProps.object.value}
        </p>
    )
}

export { TextArea }