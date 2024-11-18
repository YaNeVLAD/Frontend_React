import { PresentationButtonSet } from './presentationButtonSet/PresentationButtonSet'
import { useExportPresentation } from '../../hooks/useExportDocument'
import { useImportPresentation } from './hooks/useImportPresentation'
import { useAppActions, useAppSelector } from '../../hooks/useRedux'
import { CreateButtonSet } from './createButtonsSet/CreateButtonSet'
import { ObjectButtonSet } from './objectButtonSet/ObjectButtonSet'
import WorkspaceActions from './workspaceActions/WorkspaceActions'
import { BASE_PRESENTATION } from '../../common/basePresentation'
import { SlideButtonSet } from './slideButtonSet/SlideButtonSet'
import { useRef } from 'react'
import style from './ToolsArea.module.css'

const ToolsArea = () => {
    const title = useAppSelector(state => state.editor.presentation.title)
    const selection = useAppSelector(state => state.editor.selection)

    const { changePresentationTitle } = useAppActions()

    const presentationInputRef = useRef<HTMLInputElement>(null)
    const presentationExportRef = useRef<HTMLButtonElement>(null)

    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        changePresentationTitle(event.target.value)
    }

    const onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length == 0) event.target.value = BASE_PRESENTATION.title
        changePresentationTitle(event.target.value)
    }

    useImportPresentation(presentationInputRef)
    useExportPresentation(presentationExportRef)

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

            <button ref={presentationExportRef}>EXPORT</button>

            <input type='file' ref={presentationInputRef} accept='.json' />

            <div className={style.toolsArea}>

                <PresentationButtonSet />
                <div className={style.separator} />

                <WorkspaceActions />
                <div className={style.separator} />

                <CreateButtonSet />
                <div className={style.separator} />

                {selection.selectedObjectId
                    ? <ObjectButtonSet />
                    : <SlideButtonSet />
                }
                <div className={style.separator} />
            </div>
        </>
    )
}

export { ToolsArea }