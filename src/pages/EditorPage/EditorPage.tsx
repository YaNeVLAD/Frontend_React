import { ZoomProvider } from "../../views/WorkspaceArea/ScrollAreaWrapper/ZoomContext"
import { COLLECTION_SLIDE_SCALE, PROJECT_NAME } from "../../storage/constants"
import { SlideCollection } from "../../views/SlideCollection/SlideCollection"
import WorkspaceArea from "../../views/WorkspaceArea/WorkspaceArea"
import { CommandHistoryContext } from "../../hooks/historyContext"
import SpeakerNotes from "../../views/SpeakerNotes/SpeakerNotes"
import useAppKeyBinding from "../../hooks/useAppKeyBinding"
import { ToolsArea } from "../../views/ToolsArea/ToolsArea"
import TitleArea from "../../views/TitleArea/TitleArea"
import { CommandHistory } from "../../storage/history"
import { useAppSelector } from "../../hooks/useRedux"
import { useEffect, useState } from "react"
import styles from "./EditorPage.module.css"

type EditorPageProps = {
    history: CommandHistory
}

const EditorPage = ({ history }: EditorPageProps) => {
    useAppKeyBinding(history)
    const presentationTitle = useAppSelector(state => state.editor.presentation.title)

    const [notesHeight, setNotesHeight] = useState(180)

    useEffect(() => {
        document.title = `${presentationTitle} - ${PROJECT_NAME}`
    }, [presentationTitle])

    return (
        <CommandHistoryContext.Provider value={history}>
            <ZoomProvider>
                <TitleArea />
                <ToolsArea />
                <div className={styles.container} style={{ height: `calc(100% - ${notesHeight}px)` }}>
                    <SlideCollection scale={COLLECTION_SLIDE_SCALE} />
                    <WorkspaceArea />
                </div>
            </ZoomProvider>
            <SpeakerNotes notesHeight={notesHeight} setNotesHeight={setNotesHeight} />
        </CommandHistoryContext.Provider>
    )
}

export default EditorPage