import { PositionType } from "../../../storage/types"
import { useEffect } from "react"

function useDragAndDrop(
    ref: React.RefObject<HTMLElement>,
    parentRef: React.RefObject<HTMLElement>,
    initialPosition: PositionType,
    onPositionChange: (pos: PositionType) => void
) {
    let dragging = false
    let offset = { x: 0, y: 0 }
    let position = initialPosition

    useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
            const rect = ref.current?.getBoundingClientRect()
            if (rect) {
                dragging = true
                offset = {
                    x: e.clientX - (rect.left + rect.width / 2),
                    y: e.clientY - (rect.top + rect.height / 2)
                }
            }
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (!dragging || !parentRef.current) return

            const parentRect = parentRef.current.getBoundingClientRect()
            const newX = e.clientX - parentRect.left - offset.x
            const newY = e.clientY - parentRect.top - offset.y

            position = {
                x: (newX / parentRect.width) * 100,
                y: (newY / parentRect.height) * 100
            }
            onPositionChange(position)
        }

        const handleMouseUp = () => {
            dragging = false
        }

        const handleMouseLeave = () => {
            dragging = false
        }

        const element = ref.current
        element?.addEventListener("mousedown", handleMouseDown)
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseup", handleMouseUp)
        window.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            element?.removeEventListener("mousedown", handleMouseDown)
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleMouseUp)
            window.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [ref, parentRef])

    return position
}

export default useDragAndDrop
