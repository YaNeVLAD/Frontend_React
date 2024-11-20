import { PresentationButtonSet } from './PresentationButtonSet/PresentationButtonSet'
import { useGetSelectedObject } from '../../hooks/useGetSelectedObject'
import { useExportPresentation } from '../../hooks/useExportDocument'
import { useImportPresentation } from './hooks/useImportPresentation'
import { CreateButtonSet } from './CreateButtonsSet/CreateButtonSet'
import { ObjectButtonSet } from './ObjectButtonSet/ObjectButtonSet'
import WorkspaceActions from './WorkspaceActions/WorkspaceActions'
import { SlideButtonSet } from './SlideButtonSet/SlideButtonSet'
import TitleArea from '../TitleArea/TitleArea'
import MenuBar from '../MenuBar/MenuBar'
import { useRef } from 'react'
import style from './ToolsArea.module.css'

const ToolsArea = () => {
    const selectedObjectId = useGetSelectedObject()?.id

    const presentationInputRef = useRef<HTMLInputElement>(null)
    const presentationExportRef = useRef<HTMLButtonElement>(null)

    useImportPresentation(presentationInputRef)
    useExportPresentation(presentationExportRef)

    return (
        <>
            <TitleArea />

            <button ref={presentationExportRef}>EXPORT</button>

            <input type='file' ref={presentationInputRef} accept='.json' />

            <MenuBar />

            <div className={style.toolsArea}>

                <PresentationButtonSet />
                <div className={style.separator} />

                <WorkspaceActions />
                <div className={style.separator} />

                <CreateButtonSet />
                <div className={style.separator} />

                {selectedObjectId
                    ? <ObjectButtonSet />
                    : <SlideButtonSet />
                }
            </div>
        </>
    )
}

export { ToolsArea }