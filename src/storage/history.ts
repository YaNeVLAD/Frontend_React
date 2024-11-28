import { RootState } from "./redux/types"
import { EditorType } from "./types"
import { Store } from "redux"

type CommandHistory = {
    undo: () => EditorType | undefined,
    redo: () => EditorType | undefined
}

function getLastState(stack: Array<EditorType>): EditorType {
    return stack[stack.length - 1]
}

function initHistory(store: Store<RootState>): CommandHistory {
    const undoStack: Array<EditorType> = []
    let redoStack: Array<EditorType> = []

    let previousEditor = store.getState().editor

    store.subscribe(() => {
        const editor = store.getState().editor
        if (!undoStack.length || previousEditor.presentation != editor.presentation) {
            if (editor == getLastState(undoStack)) {
                undoStack.pop()
                redoStack.push(previousEditor)
            } else if (editor == getLastState(redoStack)) {
                redoStack.pop()
                undoStack.push(previousEditor)
            } else {
                undoStack.push(previousEditor)
                redoStack = []
            }
        }
        previousEditor = editor
    })

    function undo() {
        return getLastState(undoStack)
    }

    function redo() {
        return getLastState(redoStack)
    }

    return {
        undo,
        redo,
    }
}

export { initHistory }
export type { CommandHistory }