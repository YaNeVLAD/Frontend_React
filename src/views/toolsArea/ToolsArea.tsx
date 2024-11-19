import { PresentationButtonSet } from './PresentationButtonSet/PresentationButtonSet'
import { useExportPresentation } from '../../hooks/useExportDocument'
import { useImportPresentation } from './hooks/useImportPresentation'
import { useAppActions, useAppSelector } from '../../hooks/useRedux'
import { CreateButtonSet } from './CreateButtonsSet/CreateButtonSet'
import { ObjectButtonSet } from './ObjectButtonSet/ObjectButtonSet'
import WorkspaceActions from './WorkspaceActions/WorkspaceActions'
import { SlideButtonSet } from './SlideButtonSet/SlideButtonSet'
import { BasePresentation } from '../../common/basePresentation'
import { useRef } from 'react'
import style from './ToolsArea.module.css'

const ToolsArea = () => {
    const title = useAppSelector(state => state.editor.presentation.title)
    const selection = useAppSelector(state => state.editor.selection)

    const { changePresentationTitle } = useAppActions()

    const titleInputRef = useRef<HTMLInputElement>(null)

    const presentationInputRef = useRef<HTMLInputElement>(null)
    const presentationExportRef = useRef<HTMLButtonElement>(null)

    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        changePresentationTitle(event.target.value)
    }

    const onTitleInputBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length == 0) event.target.value = BasePresentation().title
        changePresentationTitle(event.target.value)
    }

    useImportPresentation(presentationInputRef)
    useExportPresentation(presentationExportRef)

    return (
        <>
            <input
                type="text"
                ref={titleInputRef}
                defaultValue={title}
                onChange={onTitleChange}
                onBlur={onTitleInputBlur}
                className={style.presentationTitle} />

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
            </div>
        </>
    )
}

export { ToolsArea }