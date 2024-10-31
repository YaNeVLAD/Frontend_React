import { changeTextValue } from '../../../storage/actions/textArea/changeValue'
import { selectObject } from '../../../storage/actions/object/select'
import { MINIMUM_TEXT_SIZE } from '../../../storage/constants'
import { TextAreaType } from '../../../storage/types'
import { useRef, useState } from 'react'
import { dispatch } from '../../../storage/editor'
import style from './TextArea.module.css'

type TextAreaProps = {
    context: TextAreaType,
    scale: number,
}

function TextArea({ context, scale }: TextAreaProps) {
    const [isEditable, setIsEditable] = useState(false)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const textAreaStyle = {
        fontFamily: context.font,
        fontSize: (context.textSize * scale) < MINIMUM_TEXT_SIZE
            ? MINIMUM_TEXT_SIZE
            : context.textSize * scale,
        color: context.color,
    }

    const onClick = () => {
        setIsEditable(true)
        dispatch(selectObject, { id: context.id })
    }

    const onBlur = () => {
        setIsEditable(false)
    }

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = (event.target as HTMLTextAreaElement).value
        dispatch(changeTextValue, { value: value })
    }

    return (
        <div
            className={style.textAreaWrapper}
            onClick={onClick}>

            <textarea
                ref={textAreaRef}
                draggable={false}
                value={context.value}
                style={textAreaStyle}
                className={style.textAreaInput}
                autoFocus
                readOnly={!isEditable}
                rows={1}
                onBlur={onBlur}
                onChange={onChange} />
        </div>
    )
}

export { TextArea }