import { changePresentationTitle } from '../../storage/actions/presentation/changeTitle'
import { PresentationButtonSet } from './presentationButtonSet/PresentationButtonSet'
import { ObjectButtonSet } from './objectButtonSet/ObjectButtonSet'
import { SlideButtonSet } from './slideButtonSet/SlideButtonSet'
import { SelectionType } from '../../storage/types'
import { dispatch } from '../../storage/editor'
import { exportDocument } from '../../storage/file/export'
import style from './ToolsArea.module.css'
import { restoreEditor } from '../../storage/file/read'

type ToolsAreaProps = {
    title: string,
    selection: SelectionType
}
//Вынести импрот в обработчик.
//Сделать функцию readDocument которую можно вызвать в dispatch
function ToolsArea({ title, selection }: ToolsAreaProps) {
    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value
        dispatch(changePresentationTitle, { title: value })
    }

    const onImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        console.log(file)

        restoreEditor(file)
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

            <button onClick={exportDocument}>EXPORT</button>

            <input type='file' onChange={onImport} />

            <div className={style.toolsArea}>

                <PresentationButtonSet />
                <div className={style.separator} />

                <SlideButtonSet slide={selection.selectedSlide} />
                <div className={style.separator} />

                <ObjectButtonSet object={selection.selectedObject} />
            </div>
        </>
    )
}

export { ToolsArea }