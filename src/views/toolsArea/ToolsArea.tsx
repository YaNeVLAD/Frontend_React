import { addObject, addSlide, deleteObject, deleteSlide } from '../../storage/functions'
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
//При удалении объекта, он удаляется только в текущем слайде.
//Сам слайд в списке не изменяется
function ToolsArea(toolsAreaProps: ToolsAreaProps) {
    return (
        <div className={style.toolsArea}>
            <h2 className={style.presentationTitle}>
                {toolsAreaProps.title}
            </h2>
            <button className={style.addSlide} onClick={onAddSlideClick}>+slide</button>
            <button className={style.addObject} onClick={onAddImageClick}>+image</button>
            <button className={style.addObject} onClick={onAddTextClick}>+text</button>
            <button className={style.deleteSlide} onClick={onDeleteSlideClick}>-slide</button>
            <button className={style.deleteObject} onClick={onDeletObjectClick}>-object</button>
        </div>
    )
}

export { ToolsArea }