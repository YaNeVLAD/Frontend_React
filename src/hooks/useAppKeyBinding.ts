import { CommandHistory } from "../storage/history"
import { useAppActions } from "./useRedux"
import { useEffect } from "react"

const useAppKeyBinding = (history: CommandHistory) => {
    const { setState } = useAppActions()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.code) {
                case "KeyZ":
                    if (e.ctrlKey) {
                        const newState = history.undo()
                        if (newState) setState(newState)
                    }
                    break
                case "KeyY":
                    if (e.ctrlKey) {
                        const newState = history.redo()
                        if (newState) setState(newState)
                    }
                    break
                default:
                    break
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    })
}

export default useAppKeyBinding