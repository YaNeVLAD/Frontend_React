import { ZoomProvider } from "../../views/WorkspaceArea/ScrollAreaWrapper/ZoomContext"
import { SlideCollection } from "../../views/SlideCollection/SlideCollection"
import WorkspaceArea from "../../views/WorkspaceArea/WorkspaceArea"
import { CommandHistoryContext } from "../../hooks/historyContext"
import { COLLECTION_SLIDE_SCALE } from "../../storage/constants"
import useAppKeyBinding from "../../hooks/useAppKeyBinding"
import { ToolsArea } from "../../views/ToolsArea/ToolsArea"
import { CommandHistory } from "../../storage/history"
import styles from "./EditorPage.module.css"

type EditorPageProps = {
    history: CommandHistory
}

const EditorPage = ({ history }: EditorPageProps) => {
    useAppKeyBinding(history)
    return (
        <CommandHistoryContext.Provider value={history}>
            <ZoomProvider>
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
