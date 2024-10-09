import { useState } from 'react'
import { addObject, addSlide, changePresentationTitle, deleteObject, deleteSlide } from '../../storage/functions'
import { dispatch } from '../../storage/presentation'
import style from './ToolsArea.module.css'

type ToolsAreaProps = {
    title: string
}

function onAddSlideClick() {
    dispatch(addSlide, {})
}

function onAddImageClick() {
    dispatch(addObject, { type: 'imageObj' })
}

function onAddTextClick() {
    dispatch(addObject, { type: 'textObj' })
}


function onDeleteSlideClick() {
    dispatch(deleteSlide, {})
}

function onDeletObjectClick() {
    dispatch(deleteObject, {})
}

function ToolsArea(toolsAreaProps: ToolsAreaProps) {
    const [title, setTitle] = useState(toolsAreaProps.title)

    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const onTitleBlur = () => {
        onPresentationTitleChange(title)
    }

    const onTitleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onPresentationTitleChange(title)
        }
    }

    function onPresentationTitleChange(newTitle: string) {
        dispatch(changePresentationTitle, { title: newTitle })
    }
    
    return (
        <div className={style.toolsArea}>
            <input
                type="text"
                value={title}
                onChange={onTitleChange}
                onBlur={onTitleBlur}
                onKeyDown={onTitleKeyDown} />
            <button
                className={style.addSlide}
                onClick={onAddSlideClick}>
                +slide
            </button>
            <button
                className={style.addObject}
                onClick={onAddImageClick}>
                +image
            </button>
            <button
                className={style.addObject}
                onClick={onAddTextClick}>
                +text
            </button>
            <button
                className={style.deleteSlide}
                onClick={onDeleteSlideClick}>
                -slide
            </button>
            <button
                className={style.deleteObject}
                onClick={onDeletObjectClick}>
                -object
            </button>
        </div>
    )
}

export { ToolsArea }