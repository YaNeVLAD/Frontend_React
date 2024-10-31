import { changePresentationTitle } from '../../storage/actions/presentation/changeTitle'
import { PresentationButtonSet } from './presentationButtonSet/PresentationButtonSet'
import { ObjectButtonSet } from './objectButtonSet/ObjectButtonSet'
import { SlideButtonSet } from './slideButtonSet/SlideButtonSet'
import { SelectionType } from '../../storage/types'
import { dispatch } from '../../storage/editor'
import style from './ToolsArea.module.css'
import { exportDocument } from '../../storage/file/export'
import { importDocument } from '../../storage/file/import'

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

            <button onClick={exportDocument}>EXPORT</button>

            <input type='file' onChange={importDocument} />

            <div className={style.toolsArea}>

                <PresentationButtonSet />
                <div className={style.separator} />

                <SlideButtonSet slide={selection.selectedSlide} />
                <div className={style.separator} />

                <ObjectButtonSet object={selection.selectedObject} />
                <div className={style.separator} />

            </div>
        </>
    )
}

export { ToolsArea }