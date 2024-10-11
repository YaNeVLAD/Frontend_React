import { addObject } from '../../storage/actions/object/add'
import { deleteObject } from '../../storage/actions/object/delete'
import { changePresentationTitle } from '../../storage/actions/presentation/changeTitle'
import { addSlide } from '../../storage/actions/slide/add'
import { changeSlideBackgroundType } from '../../storage/actions/slide/changeBackgroundType'
import { deleteSlide } from '../../storage/actions/slide/delete'
import { dispatch } from '../../storage/editor'
import { BackgroundType } from '../../storage/types'
import style from './ToolsArea.module.css'

type ToolsAreaProps = {
    title: string,
    background: BackgroundType
}

function onAddSlideClick() { dispatch(addSlide) }

function onAddImageClick() { dispatch(addObject, { type: 'imageObj' }) }

function onAddTextClick() { dispatch(addObject, { type: 'textObj' }) }

function onDeleteSlideClick() { dispatch(deleteSlide) }

function onDeletObjectClick() { dispatch(deleteObject) }

function ToolsArea({ title, background }: ToolsAreaProps) {
    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value
        dispatch(changePresentationTitle, { title: value })
    }

    const onColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value
        const background: BackgroundType = { value: value, type: 'solid' }
        dispatch(changeSlideBackgroundType, { background: background })
    }

    return (
        <div className={style.toolsArea}>
            <input
                type="text"
                defaultValue={title}
                onChange={onTitleChange} />
            <input
                type='color'
                value={background.value}
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