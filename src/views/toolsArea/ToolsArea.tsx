import { PresentationButtonSet } from './PresentationButtonSet/PresentationButtonSet'
import { CreateButtonSet } from './CreateButtonsSet/CreateButtonSet'
import { ObjectButtonSet } from './ObjectButtonSet/ObjectButtonSet'
import WorkspaceActions from './WorkspaceActions/WorkspaceActions'
import { useSelectedObject } from '../../hooks/useSelectedObject'
import { SlideButtonSet } from './SlideButtonSet/SlideButtonSet'
import TitleArea from '../TitleArea/TitleArea'
import MenuBar from '../MenuBar/MenuBar'
import style from './ToolsArea.module.css'

const ToolsArea = () => {
    const selectedObjectId = useSelectedObject()?.id
    return (
        <>
            <TitleArea />

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