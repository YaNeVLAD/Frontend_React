import { CommandHistory } from "../storage/history"
import { useAppActions } from "./useRedux"
import { useEffect } from "react"
import { useSelectedSlide } from "./useSelectedSlide"
import { useSelectedObject } from "./useSelectedObject"

const useAppKeyBinding = (history: CommandHistory) => {
    const selectedSlide = useSelectedSlide()
    const selectedObject = useSelectedObject()
    const { setState, deleteSlide, deleteObject } = useAppActions()

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
                case "Delete":
                    if (selectedSlide && !selectedObject) {
                        deleteSlide()
                    }
                    if (selectedSlide && selectedObject) {
                        deleteObject(selectedSlide.id, selectedObject.id)
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