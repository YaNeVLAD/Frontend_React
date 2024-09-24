import style from './TextArea.module.css'

type TextAreaProps = {
    pos: {
        x: number,
        y: number,
    },
    size: {
        width: number,
        height: number,
    },
    turnAngle: number,

    value: string,
    font: string,
    color: string
    textSize: number,
}

function TextArea(textAreaProps: TextAreaProps) {
    const textAreaStyle = {
        left: textAreaProps.pos.x,
        top: textAreaProps.pos.y,
        height: textAreaProps.size.height,
        width: textAreaProps.size.width,
        font: textAreaProps.font,
        fontSize: textAreaProps.textSize,
        color: textAreaProps.color,
        transform: 'rotate(' + textAreaProps.turnAngle + 'deg)'
    }

    return (
        <div>
            <p style={textAreaStyle} className={style.textArea}>{textAreaProps.value}</p>
        </div>
    )
}

export { TextArea }