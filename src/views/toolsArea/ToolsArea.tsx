import { changePresentationTitle } from '../../storage/actions/presentation/changeTitle'
import { PresentationButtonSet } from './presentationButtonSet/PresentationButtonSet'
import { CreateButtonSet } from './createButtonsSet/CreateButtonSet'
import { ObjectButtonSet } from './objectButtonSet/ObjectButtonSet'
import { SlideButtonSet } from './slideButtonSet/SlideButtonSet'
import { useImportPresentation } from '../../hooks/useImportPresentation'
import { exportDocument } from '../../storage/file/export'
import { SelectionType } from '../../storage/types'
import { dispatch } from '../../storage/editor'
import { useRef } from 'react'
import style from './ToolsArea.module.css'

type ToolsAreaProps = {
    title: string,
    selection: SelectionType
}

function ToolsArea({ title, selection }: ToolsAreaProps) {
    const presentationInputRef = useRef<HTMLInputElement>(null)

    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value
        dispatch(changePresentationTitle, { title: value })
    }

    useImportPresentation(presentationInputRef)

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

            <input type='file' ref={presentationInputRef} accept='.json' />

            <div className={style.toolsArea}>

                <PresentationButtonSet />
                <div className={style.separator} />

                <CreateButtonSet />
                <div className={style.separator} />

                {selection.selectedObject
                    ? <ObjectButtonSet object={selection.selectedObject} />
                    : <SlideButtonSet slide={selection.selectedSlide} />
                }
                <div className={style.separator} />
            </div>
        </>
    )
}

export { ToolsArea }