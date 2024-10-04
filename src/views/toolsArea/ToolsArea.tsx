import { addObject, addSlide, deleteObject, deleteSlide } from '../../storage/functions'
import { dispatch } from '../../storage/presentation'
import style from './ToolsArea.module.css'

type ToolsAreaProps = {
    title: string
}

function onAddSlideClick() {
    dispatch(addSlide, {})
}

function onAddObjectClick() {
    dispatch(addObject, {type: 'imageObj'})
}

function onDeleteSlideClick() {
    dispatch(deleteSlide, {})
}

function onDeletObjectClick() {
    dispatch(deleteObject, {})
}

function ToolsArea(toolsAreaProps: ToolsAreaProps) {
    return (
        <div className={style.toolsArea}>
            <h2 className={style.presentationTitle}>
                {toolsAreaProps.title}
            </h2>
            <button className={style.addSlide} onClick={onAddSlideClick}>+</button>
            <button className={style.addObject} onClick={onAddObjectClick}>+</button>
            <button className={style.deleteSlide} onClick={onDeleteSlideClick}>-</button>
            <button className={style.deleteObject} onClick={onDeletObjectClick}>-</button>
        </div>
    )
}

export { ToolsArea }