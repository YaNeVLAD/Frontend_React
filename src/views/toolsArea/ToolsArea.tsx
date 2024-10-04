import { addSlide, deleteSlide } from '../../storage/functions'
import { dispatch } from '../../storage/presentation'
import style from './ToolsArea.module.css'

type ToolsAreaProps = {
    title: string
}

function onAddSlideButtonClick() {
    dispatch(addSlide, {})
}

function onDeleteSlideButtonClick() {
    dispatch(deleteSlide, {})
}

function ToolsArea(toolsAreaProps: ToolsAreaProps) {
    return (
        <div className={style.toolsArea}>
            <h2 className={style.presentationTitle}>
                {toolsAreaProps.title}
            </h2>
            <button className={style.addSlideButton} onClick={onAddSlideButtonClick}>+</button>
            <button className={style.deleteSlideButton} onClick={onDeleteSlideButtonClick}>-</button>
        </div>
    )
}

export { ToolsArea }