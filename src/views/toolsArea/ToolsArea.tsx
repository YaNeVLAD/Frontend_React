import { Button } from '../../components/Button/Button'
import { addObject } from '../../storage/actions/object/add'
import { deleteObject } from '../../storage/actions/object/delete'
import { changePresentationTitle } from '../../storage/actions/presentation/changeTitle'
import { addSlide } from '../../storage/actions/slide/add'
import { changeSlideBackgroundType } from '../../storage/actions/slide/changeBackground'
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
                    type='icon'
                    value={'plus'}
                    onClick={onAddImageClick}
                    dropList={[
                        { id: 0, value: 'option1', onClick: () => { } },
                        { id: 1, value: 'option2', onClick: () => { } },
                        { id: 2, value: 'option3', onClick: () => { } },
                        { id: 3, value: 'option4', onClick: () => { } },
                    ]}
                    className='' />

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
        </>
    )
}

export { ToolsArea }