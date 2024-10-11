import { changeTextValue } from '../../../storage/actions/textArea/changeValue'
import { deleteObject } from '../../../storage/actions/object/delete'
import { TextAreaType } from '../../../storage/types'
import { dispatch } from '../../../storage/editor'
import { useEffect, useRef, useState } from 'react'
import { selectObject } from '../../../storage/actions/object/select'
import style from './TextArea.module.css'

const MINIMUM_TEXT_SIZE = 1.5

type TextAreaProps = {
    context: TextAreaType,
    scale: number,
}

function TextArea({ context, scale }: TextAreaProps) {
    const [isEditable, setIsEditable] = useState(false)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        setIsEditable(true)
        if (textAreaRef.current) {
            const textarea = textAreaRef.current
            textarea.focus()
            textarea.selectionStart = textarea.selectionEnd = textarea.value.length
        }
    }, [])

    const onClick = () => {
        setIsEditable(true)
        dispatch(selectObject, { id: context.id })
    }

    const onBlur = () => {
        setIsEditable(false)
        if (context.value == "") dispatch(deleteObject)
    }

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = (event.target as HTMLTextAreaElement).value
        dispatch(changeTextValue, { value: value })
    }

    const textAreaStyle = {
        font: context.font,
        fontSize: context.textSize * scale + MINIMUM_TEXT_SIZE,
        color: context.color,
    }

    return (
        <div
            className={style.textAreaWrapper}
            onClick={onClick}>

            <textarea
                ref={textAreaRef}
                value={context.value}
                style={textAreaStyle}
                className={style.textAreaInput}
                autoFocus
                readOnly={!isEditable}
                rows={4}
                onBlur={onBlur}
                onChange={onChange} />
        </div>
    )
}

export { TextArea }