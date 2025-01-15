import { useAppActions, useAppSelector } from "./useRedux"
import { useSelectedObject } from "./useSelectedObject"
import { useSelectedSlide } from "./useSelectedSlide"
import { CommandHistory } from "../storage/history"
import { useEffect } from "react"

const useAppKeyBinding = (history: CommandHistory) => {
    const selectedSlide = useSelectedSlide()
    const selectedObject = useSelectedObject()
    const presentation = useAppSelector(s => s.editor.presentation)
    const {
        setState,
        deleteSlide,
        deleteObject,
        selectSlide,
        changeObjectBounds,
        deselectObjects
    } = useAppActions()

    const currentSlideIndex =
        presentation.slides.findIndex(s => s.id == selectedSlide?.id)

    const changeSlide = (newIndex: number) => {
        if (newIndex >= 0 && newIndex < presentation.slides.length) {
            selectSlide(presentation.slides[newIndex].id)
        }
    }

    const moveObject = (offsetX: number, offsetY: number) => {
        if (selectedSlide && selectedObject)
            changeObjectBounds(
                selectedSlide.id,
                selectedObject.id,
                {
                    x: selectedObject.pos.x + offsetX,
                    y: selectedObject.pos.y + offsetY
                }
            )
    }

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

                case 'ArrowDown':
                    e.preventDefault()
                    if (selectedObject)
                        moveObject(0, 1)
                    else
                        changeSlide(currentSlideIndex + 1)
                    break
                case 'ArrowRight':
                    e.preventDefault()
                    if (!selectedObject)
                        changeSlide(currentSlideIndex + 1)
                    else
                        moveObject(1, 0)
                    break
                case 'ArrowUp':
                    e.preventDefault()
                    if (selectedObject)
                        moveObject(0, -1)
                    else
                        changeSlide(currentSlideIndex - 1)
                    break
                case 'ArrowLeft':
                    e.preventDefault()
                    if (!selectedObject)
                        changeSlide(currentSlideIndex - 1)
                    else
                        moveObject(-1, 0)
                    break

                case 'Escape':
                    e.preventDefault()
                    deselectObjects()
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