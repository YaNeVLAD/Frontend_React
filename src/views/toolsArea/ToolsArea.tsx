import { addObject, addSlide, changePresentationTitle, changeSlideBackground, deleteObject, deleteSlide } from '../../storage/functions'
import { useState } from 'react'
import { dispatch } from '../../storage/presentation'
import { Background } from '../../storage/types'
import style from './ToolsArea.module.css'

type ToolsAreaProps = {
    title: string,
    slideBackground: Background
}

function onAddSlideClick() { dispatch(addSlide, {}) }

function onAddImageClick() { dispatch(addObject, { type: 'imageObj' }) }

function onAddTextClick() { dispatch(addObject, { type: 'textObj' }) }

function onDeleteSlideClick() { dispatch(deleteSlide, {}) }

function onDeletObjectClick() { dispatch(deleteObject, {}) }

function ToolsArea(toolsAreaProps: ToolsAreaProps) {
    const [title, setTitle] = useState(toolsAreaProps.title)
    const [background, setBackground] = useState<Background>(toolsAreaProps.slideBackground)

    const onColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBackground({ value: event.target.value, type: 'solid' })
    }

    const onColorBlur = () => {
        dispatch(changeSlideBackground, { background })
    }

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
            <input
                type='color'
                value={background.value}
                onChange={onColorChange}
                onBlur={onColorBlur} />
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