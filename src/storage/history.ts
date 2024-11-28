import { RootState } from "./redux/reducers/rootReducer"
import { Store } from "redux"

type CommandHistory = {
    undo: () => RootState | undefined,
    redo: () => RootState | undefined
}

function getLastState(stack: Array<RootState>): RootState {
    return stack[stack.length - 1]
}

function hasStateChanged(prev: RootState, curr: RootState): boolean {
    return prev.editor.presentation != curr.editor.presentation
        || prev.viewModel != curr.viewModel
}

function initHistory(store: Store<RootState>): CommandHistory {
    const undoStack: Array<RootState> = []
    let redoStack: Array<RootState> = []

    let prevState = store.getState()

    store.subscribe(() => {
        const state = store.getState()
        if (!undoStack.length || hasStateChanged(prevState, state)) {
            if (state == getLastState(undoStack)) {
                undoStack.pop()
                redoStack.push(prevState)
            } else if (state == getLastState(redoStack)) {
                redoStack.pop()
                undoStack.push(prevState)
            } else {
                undoStack.push(prevState)
                redoStack = []
            }
        }
        prevState = state
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