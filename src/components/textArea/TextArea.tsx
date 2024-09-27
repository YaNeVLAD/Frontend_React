import { TextAreaType } from '../../Model/types'
import style from './TextArea.module.css'

type TextAreaProps = {
    object: TextAreaType
}

function TextArea(textAreaProps: TextAreaProps) {
    const textAreaStyle = {
        left: textAreaProps.object.pos.x,
        top: textAreaProps.object.pos.y,
        height: textAreaProps.object.size.height,
        width: textAreaProps.object.size.width,
        font: textAreaProps.object.font,
        fontSize: textAreaProps.object.textSize,
        color: textAreaProps.object.color,
        transform: 'rotate(' + textAreaProps.object.turnAngle + 'deg)'
    }

    return (
        <div>
            <p style={textAreaStyle} className={style.textArea}>{textAreaProps.object.value}</p>
        </div>
    )
}

export { TextArea }