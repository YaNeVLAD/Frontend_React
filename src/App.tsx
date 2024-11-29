import { ZoomProvider } from './views/WorkspaceArea/ScrollAreaWrapper/ZoomContext'
import { SlideCollection } from './views/SlideCollection/SlideCollection'
import WorkspaceArea from './views/WorkspaceArea/WorkspaceArea'
import { CommandHistoryContext } from './hooks/historyContext'
import { COLLECTION_SLIDE_SCALE } from './storage/constants'
import { ToolsArea } from './views/ToolsArea/ToolsArea'
import { CommandHistory } from './storage/history'
import useKeyBinding from './hooks/useKeyBinding'
import style from './App.module.css'

type AppProps = {
    history: CommandHistory
}

function App({ history }: AppProps) {
    useKeyBinding(history)
    return (
        <CommandHistoryContext.Provider value={history}>
            <ZoomProvider>
                <ToolsArea />
                <div className={style.container}>
                    <SlideCollection scale={COLLECTION_SLIDE_SCALE} />
                    <WorkspaceArea />
                </div>
            </ZoomProvider>
        </CommandHistoryContext.Provider>
    )
}

export default App