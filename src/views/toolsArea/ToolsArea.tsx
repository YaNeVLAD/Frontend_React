import { changePresentationTitle } from '../../storage/actions/presentation/changeTitle'
import { PresentationButtonSet } from './presentationButtonSet/PresentationButtonSet'
import { deleteObject } from '../../storage/actions/object/delete'
import { deleteSlide } from '../../storage/actions/slide/delete'
import { SlideButtonSet } from './slideButtonSet/SlideButtonSet'
import { Button } from '../../components/button/Button'
import { SelectionType } from '../../storage/types'
import { dispatch } from '../../storage/editor'
import style from './ToolsArea.module.css'

type ToolsAreaProps = {
    title: string,
    selection: SelectionType
}

function ToolsArea({ title, selection }: ToolsAreaProps) {
    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value
        dispatch(changePresentationTitle, { title: value })
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

                <PresentationButtonSet />
                <div className={style.separator} />

                <SlideButtonSet slide={selection.selectedSlide} />
                <div className={style.separator} />

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