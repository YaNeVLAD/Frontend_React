import { changePresentationTitle } from '../../storage/actions/presentation/changeTitle'
import { PresentationButtonSet } from './presentationButtonSet/PresentationButtonSet'
import { useImportPresentation } from '../../hooks/useImportPresentation'
import { CreateButtonSet } from './createButtonsSet/CreateButtonSet'
import { ObjectButtonSet } from './objectButtonSet/ObjectButtonSet'
import { BASE_PRESENTATION } from '../../common/basePresentation'
import { SlideButtonSet } from './slideButtonSet/SlideButtonSet'
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
        dispatch(changePresentationTitle, { title: event.target.value })
    }

    const onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length == 0) event.target.value = BASE_PRESENTATION.title
        dispatch(changePresentationTitle, { title: event.target.value })
    }

    useImportPresentation(presentationInputRef)

    return (
        <>
            <div className={style.presentationTitleWrapper}>
                <input
                    type="text"
                    defaultValue={title}
                    onChange={onTitleChange}
                    onBlur={onBlur}
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