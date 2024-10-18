import { changePresentationTitle } from '../../storage/actions/presentation/changeTitle'
import { changeSlideBackgroundType } from '../../storage/actions/slide/changeBackground'
import { deselectAllObjects } from '../../storage/actions/object/deselectAll'
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
                    onClick={() => dispatch(addSlide, { type: 'none' })}
                    className=''
                    dropdownContent={[
                        <span onClick={() => dispatch(addSlide, { type: 'title' })}>Титульный слайд</span>,
                        <span onClick={() => dispatch(addSlide, { type: 'image' })}>Слайд с картинкой</span>,
                        <span onClick={() => dispatch(addSlide, { type: 'title&image' })}>Слайд с заголовком и картинкой</span>,
                        <span onClick={() => dispatch(addSlide, { type: 'none' })}>Пустой слайд</span>,
                    ]} />

                <Button
                    type='icon'
                    value={'cursor'}
                    onClick={() => dispatch(deselectAllObjects)}
                    className='' />

                <Button
                    type='icon'
                    value={'text'}
                    onClick={() => dispatch(addObject, { type: 'textObj' })}
                    className='' />

                <Button
                    type='icon'
                    value={'image'}
                    onClick={() => dispatch(addObject, { type: 'imageObj' })}
                    className='' />

                <Button
                    type='text'
                    value='Удалить слайд'
                    onClick={() => dispatch(deleteSlide)}
                    className='' />

                <Button
                    type='text'
                    value='Удалить объект'
                    onClick={() => dispatch(deleteObject)}
                    className='' />

            </div>
        </>
    )
}

export { ToolsArea }