import { PositionType } from "../../../storage/types"
import { dispatch } from "../../../storage/editor"
import { useRef, useEffect } from "react"
import { moveObject } from "../../../storage/actions/objectActions"

//Варианты: Менять позицию у dom элемента
//Если делать как есть - прописываем логику обработки position в компоненте

const useDragAndDrop = (
    ref: React.RefObject<HTMLElement>,
    parentRef: React.RefObject<HTMLElement>,
    initialPosition: PositionType,
    setPos: (pos: PositionType) => void
) => {
    const position = useRef<PositionType>(initialPosition)
    const offset = useRef<PositionType>({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
            if (!ref.current || !ref.current.contains(e.target as Node)) return
            if (!parentRef.current) return

            const elementRect = ref.current.getBoundingClientRect()
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
            position.current = {
                x: e.pageX - parentRect.left - offset.current.x,
                y: e.pageY - parentRect.top - offset.current.y,
            }

            setPos(position.current)
        }

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
            dispatch(moveObject, position.current)
        }

        document.addEventListener("mousedown", handleMouseDown)

        return () => {
            document.removeEventListener("mousedown", handleMouseDown)
        }
    }, [ref, parentRef, setPos])
}

export { useDragAndDrop }
