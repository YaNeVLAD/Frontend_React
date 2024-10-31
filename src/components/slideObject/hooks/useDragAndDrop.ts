import { moveObject } from "../../../storage/actions/object/move"
import { PositionType } from "../../../storage/types"
import { dispatch } from "../../../storage/editor"
import { useRef, useEffect } from "react"

const useDragAndDrop = (
    ref: React.RefObject<HTMLElement>,
    parentRef: React.RefObject<HTMLElement>,
    setPos: (pos: PositionType) => void
) => {
    const startPos = useRef<PositionType>({ x: 0, y: 0 })
    const currentPos = useRef<PositionType>({ x: 0, y: 0 })
    const offset = useRef<PositionType>({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
            if (!ref.current || !ref.current.contains(e.target as Node)) return
            if (!parentRef.current) return

            const elementRect = ref.current.getBoundingClientRect()

            startPos.current = { x: e.pageX, y: e.pageY }
            offset.current = {
                x: e.pageX - elementRect.left,
                y: e.pageY - elementRect.top,
            }

            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (!parentRef.current) return

            const parentRect = parentRef.current.getBoundingClientRect()
            currentPos.current = {
                x: e.pageX - parentRect.left - offset.current.x,
                y: e.pageY - parentRect.top - offset.current.y,
            }

            setPos(currentPos.current)
        }

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)

            dispatch(moveObject, { x: currentPos.current.x, y: currentPos.current.y })
        }

        document.addEventListener("mousedown", handleMouseDown)

        return () => {
            document.removeEventListener("mousedown", handleMouseDown)
        }
    }, [ref, parentRef, setPos])
}

export { useDragAndDrop }
