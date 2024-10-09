import { addObject, addSlide, changePresentationTitle, changeSlideBackground, deleteObject, deleteSlide } from '../../storage/functions'
import { dispatch } from '../../storage/editor'
import { Background } from '../../storage/types'
import style from './ToolsArea.module.css'

type ToolsAreaProps = {
    title: string,
    background: Background
}

function onAddSlideClick() { dispatch(addSlide) }

function onAddImageClick() { dispatch(addObject, { type: 'imageObj' }) }

function onAddTextClick() { dispatch(addObject, { type: 'textObj' }) }

function onDeleteSlideClick() { dispatch(deleteSlide) }

function onDeletObjectClick() { dispatch(deleteObject) }

function ToolsArea(props: ToolsAreaProps) {
    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changePresentationTitle, { title: (event.target as HTMLInputElement).value })
    }

    const onColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const background: Background = { value: (event.target as HTMLInputElement).value, type: 'solid' }
        dispatch(changeSlideBackground, { background: background })
    }

    return (
        <div className={style.toolsArea}>
            <input
                type="text"
                defaultValue={props.title}
                onChange={onTitleChange} />
            <input
                type='color'
                value={props.background.value}
                onChange={onColorChange} />
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