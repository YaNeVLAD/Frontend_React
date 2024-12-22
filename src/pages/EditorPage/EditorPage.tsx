import { ZoomProvider } from "../../views/WorkspaceArea/ScrollAreaWrapper/ZoomContext"
import { SlideCollection } from "../../views/SlideCollection/SlideCollection"
import WorkspaceArea from "../../views/WorkspaceArea/WorkspaceArea"
import { CommandHistoryContext } from "../../hooks/historyContext"
import { COLLECTION_SLIDE_SCALE, PROJECT_NAME } from "../../storage/constants"
import useAppKeyBinding from "../../hooks/useAppKeyBinding"
import { ToolsArea } from "../../views/ToolsArea/ToolsArea"
import { CommandHistory } from "../../storage/history"
import styles from "./EditorPage.module.css"
import { useEffect } from "react"
import { useAppSelector } from "../../hooks/useRedux"
import TitleArea from "../../views/TitleArea/TitleArea"

type EditorPageProps = {
    history: CommandHistory
}

const EditorPage = ({ history }: EditorPageProps) => {
    useAppKeyBinding(history)
    const presentationTitle = useAppSelector(state => state.editor.presentation.title)

    useEffect(() => {
        document.title = `${presentationTitle} - ${PROJECT_NAME}`
    })

    return (
        <CommandHistoryContext.Provider value={history}>
            <ZoomProvider>
                <TitleArea />
                <ToolsArea />
                <div className={styles.container}>
                    <SlideCollection scale={COLLECTION_SLIDE_SCALE} />
                    <WorkspaceArea />
                </div>
            </ZoomProvider>
        </CommandHistoryContext.Provider>
    )
}

export default EditorPage
