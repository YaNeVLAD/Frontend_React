import { CommandHistory } from "../storage/history"
import React from "react"

const defaultHistory: CommandHistory = {
    undo: () => undefined,
    redo: () => undefined
}

const CommandHistoryContext: React.Context<CommandHistory> = React.createContext(defaultHistory)

export {
    CommandHistoryContext
}