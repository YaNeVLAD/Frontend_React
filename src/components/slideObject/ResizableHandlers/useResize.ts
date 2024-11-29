import { useState, useCallback, useEffect } from "react"
import { PositionType } from "../../../storage/types"

type Direction =
    | "top"
    | "left"
    | "right"
    | "bottom"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "drag"

const useDragAndResize = (
    onRelease: (offset: PositionType, sizeOffset?: PositionType) => void
) => {
    const [offset, setOffset] = useState<PositionType>({ x: 0, y: 0 })
    const [sizeOffset, setSizeOffset] = useState<PositionType>({ x: 0, y: 0 })
    const [dragging, setDragging] = useState(false)
    const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 })
    const [resizeDirection, setResizeDirection] = useState<Direction | null>(null)

    const handleMouseDown = useCallback(
        (e: React.MouseEvent, direction: Direction) => {
            e.preventDefault()
            if (!dragging) {
                setResizeDirection(direction)
                setDragging(true)
                setInitialMousePos({ x: e.clientX, y: e.clientY })
            }
        },
        [dragging]
    )

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!dragging || !resizeDirection) return

            const dx = e.clientX - initialMousePos.x
            const dy = e.clientY - initialMousePos.y

            if (resizeDirection === "drag") {
                setOffset({ x: dx, y: dy })
            } else {
                let widthOffset = 0
                let heightOffset = 0

                switch (resizeDirection) {
                    case "top-left":
                        setOffset({ x: dx, y: dy })
                        widthOffset = -dx
                        heightOffset = -dy
                        break
                    case "top-right":
                        setOffset({ x: offset.x, y: dy })
                        widthOffset = dx
                        heightOffset = -dy
                        break
                    case "bottom-left":
                        setOffset({ x: dx, y: offset.y })
                        widthOffset = -dx
                        heightOffset = dy
                        break
                    case "bottom-right":
                        widthOffset = dx
                        heightOffset = dy
                        break
                    case "top":
                        setOffset({ x: offset.x, y: dy })
                        heightOffset = -dy
                        break
                    case "right":
                        widthOffset = dx
                        break
                    case "left":
                        setOffset({ x: dx, y: offset.y })
                        widthOffset = -dx
                        break
                    case "bottom":
                        heightOffset = dy
                        break
                    default:
                        break
                }

                setSizeOffset({ x: widthOffset, y: heightOffset })
            }
        },
        [dragging, resizeDirection, initialMousePos, offset]
    )



    const handleMouseUp = useCallback(() => {
        function hasPositionChanged(): boolean {
            return offset.x !== 0 || offset.y !== 0 || sizeOffset.x !== 0 || sizeOffset.y !== 0
        }

        if (dragging) {
            setDragging(false)
            if (hasPositionChanged()) {
                onRelease(offset, resizeDirection !== "drag" ? sizeOffset : undefined)
            }
            setOffset({ x: 0, y: 0 })
            setSizeOffset({ x: 0, y: 0 })
        }
    }, [dragging, offset, onRelease, resizeDirection, sizeOffset])

    useEffect(() => {
        if (dragging) {
            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
        } else {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
        }
    }, [dragging, handleMouseMove, handleMouseUp])

    return { offset, sizeOffset, handleMouseDown }
}

export default useDragAndResize