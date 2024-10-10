import { changeTextValue } from '../../../storage/actions/textArea/changeValue'
import { TextAreaType } from '../../../storage/types'
import { dispatch } from '../../../storage/editor'
import { useState } from 'react'
import style from './TextArea.module.css'
import { deleteObject } from '../../../storage/actions/object/delete'

const MINIMUM_TEXT_SIZE = 1.5

type TextAreaProps = {
    object: TextAreaType,
    scale: number,
    onClick: () => void,
}

function TextArea({ object, scale, onClick }: TextAreaProps) {
    const [isEditable, setIsEditable] = useState(false)

    const handleDoubleClick = () => {
        setIsEditable(true)
    }

    const onBlur = () => {
        setIsEditable(false)
        if (object.value == "") dispatch(deleteObject)
    }

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = (event.target as HTMLTextAreaElement).value
        dispatch(changeTextValue, { value: value })
    }

    const textAreaStyle = {
        font: object.font,
        fontSize: object.textSize * scale + MINIMUM_TEXT_SIZE,
        color: object.color,
    }

    return (
        <div className={style.textAreaWrapper} onClick={onClick}>
            {isEditable ? (
                <textarea
                    value={object.value}
                    style={textAreaStyle}
                    className={style.textAreaInput}
                    onBlur={onBlur}
                    autoFocus
                    rows={4}
                    onChange={onChange}
                />
            ) : (
                <p
                    style={textAreaStyle}
                    className={style.textArea}
                    onDoubleClick={handleDoubleClick}>
                    {object.value.split('\n').map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    ))}
                </p>
            )}
        </div>
    )
}

export { TextArea }