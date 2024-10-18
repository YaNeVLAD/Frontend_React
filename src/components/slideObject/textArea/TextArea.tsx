import { changeTextValue } from '../../../storage/actions/textArea/changeValue'
import { changeObjectSize } from '../../../storage/actions/object/changeSize'
import { deleteObject } from '../../../storage/actions/object/delete'
import { selectObject } from '../../../storage/actions/object/select'
import { MINIMUM_TEXT_SIZE } from '../../../storage/constants'
import { TextAreaType } from '../../../storage/types'
import { useEffect, useRef, useState } from 'react'
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

    useEffect(() => {
        if (textAreaRef.current) {
            const textArea = textAreaRef.current
            textArea.focus()
            textArea.selectionStart = textArea.selectionEnd = textArea.value.length
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

        if (textAreaRef.current) {
            const textArea = textAreaRef.current

            textArea.style.height = 'auto'
            textArea.style.height = `${textArea.scrollHeight}px`

            dispatch(changeObjectSize, { width: context.size.width, height: textArea.scrollHeight })
        }
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
                rows={1}
                onBlur={onBlur}
                onChange={onChange} />
        </div>
    )
}

export { TextArea }