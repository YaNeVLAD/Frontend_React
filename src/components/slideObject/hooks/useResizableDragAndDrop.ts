import { RefObject, useCallback, useEffect, useRef } from "react"
import { PositionType, SizeType } from "../../../storage/types"
import { dispatch } from "../../../storage/editor"
import { moveObject, resizeObject } from "../../../storage/actions/objectActions"

export function useResizableDragAndDrop(
    ref: RefObject<HTMLElement>,
    parentRef: RefObject<HTMLElement>,
    initialPos: PositionType,
    initialSize: SizeType,
    setPos: (pos: PositionType) => void,
    setSize: (size: SizeType) => void
) {
    const pos = useRef<PositionType>(initialPos)
    const size = useRef<SizeType>(initialSize)

    const handleMouseDown = useCallback((event: MouseEvent) => {
        const handle = (event.target as HTMLElement).dataset.handle
        if (!handle || !ref.current || !parentRef.current) return

        const startX = event.clientX
        const startY = event.clientY
        // const { left, top, width, height } = ref.current.getBoundingClientRect()

        const resize = (e: MouseEvent) => {
            const deltaX = e.clientX - startX
            const deltaY = e.clientY - startY

            const newSize = { ...initialSize }
            const newPos = { ...initialPos }

            switch (handle) {
                case "top-left":
                    newPos.x += deltaX
                    newPos.y += deltaY
                    newSize.width -= deltaX
                    newSize.height -= deltaY
                    break
                case "top-right":
                    newPos.y += deltaY
                    newSize.width += deltaX
                    newSize.height -= deltaY
                    break
                case "bottom-left":
                    newPos.x += deltaX
                    newSize.width -= deltaX
                    newSize.height += deltaY
                    break
                case "bottom-right":
                    newSize.width += deltaX
                    newSize.height += deltaY
                    break
                case "top":
                    newPos.y += deltaY
                    newSize.height -= deltaY
                    break
                case "right":
                    newSize.width += deltaX
                    break
                case "bottom":
                    newSize.height += deltaY
                    break
                case "left":
                    newPos.x += deltaX
                    newSize.width -= deltaX
                    break
                default:
                    break
            }

            pos.current = newPos
            size.current = newSize

            setSize(newSize)
            setPos(newPos)
        }

        const stopResize = () => {
            document.removeEventListener("mousemove", resize)
            document.removeEventListener("mouseup", stopResize)
            dispatch(resizeObject, size.current)
            dispatch(moveObject, pos.current)
        }

        document.addEventListener("mousemove", resize)
        document.addEventListener("mouseup", stopResize)

        event.preventDefault()
    }, [initialPos, initialSize, parentRef, ref, setPos, setSize])

    useEffect(() => {
        if (ref.current) {
            ref.current.querySelectorAll(".resize-handle").forEach(handle => {
                handle.addEventListener("mousedown", handleMouseDown as EventListener)
            })
        }

        return () => {
            if (ref.current) {
                ref.current.querySelectorAll(".resize-handle").forEach(handle => {
                    handle.removeEventListener("mousedown", handleMouseDown as EventListener)
                })
            }
        }
    }, [handleMouseDown, ref])

    return null
}
