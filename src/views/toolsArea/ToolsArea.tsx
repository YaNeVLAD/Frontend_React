import { changePresentationTitle } from '../../storage/actions/presentation/changeTitle'
import { changeSlideBackgroundType } from '../../storage/actions/slide/changeBackground'
import { deleteObject } from '../../storage/actions/object/delete'
import { deleteSlide } from '../../storage/actions/slide/delete'
import { addObject } from '../../storage/actions/object/add'
import { addSlide } from '../../storage/actions/slide/add'
import { Button } from '../../components/Button/Button'
import { BackgroundType } from '../../storage/types'
import { dispatch } from '../../storage/editor'
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
        <>
            <div className={style.presentationTitleWrapper}>
                <input
                    type="text"
                    placeholder={"Введите название презентации"}
                    defaultValue={title}
                    onChange={onTitleChange}
                    className={style.presentationTitle} />
            </div>

            <div className={style.toolsArea}>
                <input
                    type='color'
                    value={background.value}
                    onChange={onColorChange} />

                <Button
                    type='icon'
                    value={'plus'}
                    onClick={onAddSlideClick}
                    className='' />

                <Button
                    type='icon'
                    value={'text'}
                    onClick={onAddTextClick}
                    className='' />

                <Button
                    type='icon'
                    value={'image'}
                    onClick={onAddImageClick}
                    className='' />

                <Button
                    type='text'
                    value='Удалить слайд'
                    onClick={onDeleteSlideClick}
                    className='' />

                <Button
                    type='text'
                    value='Удалить объект'
                    onClick={onDeletObjectClick}
                    className='' />
            </div>
        </>
    )
}

export { ToolsArea }