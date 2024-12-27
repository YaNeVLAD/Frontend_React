import { CSSProperties, useRef, useState } from 'react'
import { TextAreaType } from '../../../storage/types'
import style from './TextArea.module.css'
import useHandleClickOutside from '../../../hooks/useHandleClickOutside'
import { useAppActions } from '../../../hooks/useRedux'

type TextAreaProps = {
    context: TextAreaType,
    scale: number,
    slideId: string,
    canBeEditable: boolean,
}

const TextArea = ({ context, scale, slideId, canBeEditable }: TextAreaProps) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const [isEditable, setIsEditable] = useState(false)

    const { changeTextValue } = useAppActions()

    useHandleClickOutside(textAreaRef, () => setIsEditable(false))

    const textAreaStyle: CSSProperties = {
        textAlign: context.text.alignment.horizontal,
        fontWeight: context.text.font.weight,
        alignContent: context.text.alignment.vertical,
        fontFamily: context.text.font.family,
        fontSize: context.text.font.size * scale,
        color: context.text.font.color,
        userSelect: (isEditable && !canBeEditable) ? 'text' : 'none',
        cursor: (isEditable && !canBeEditable) ? 'text' : 'default',
    }

    const handleDoubleClick = (e: React.MouseEvent) => {
        if (!canBeEditable) return        
        setIsEditable(true)
        e.stopPropagation()
        if (textAreaRef.current) {
            textAreaRef.current.select()
        }
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        if (isEditable && canBeEditable) {
            e.stopPropagation()
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        changeTextValue(context.id, slideId, e.target.value)
    }

    return (
        <div className={style.textAreaWrapper} onMouseDown={handleMouseDown}>
            <textarea
                ref={textAreaRef}
                style={textAreaStyle}
                draggable={false}
                placeholder={isEditable ? '' : context.placeholder}
                className={style.textAreaInput}
                readOnly={!canBeEditable}
                onDoubleClick={handleDoubleClick}
                onChange={onChange}
                value={context.text.value}
            />
        </div>
    )
}

export { TextArea }