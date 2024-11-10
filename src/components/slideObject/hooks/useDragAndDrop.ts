import { useEffect, useRef } from 'react'
import { dispatch } from '../../../storage/editor'
import { moveObject } from '../../../storage/actions/objectActions'

type PositionType = {
    x: number
    y: number
}

const useDragAndDrop = (
    ref: React.RefObject<HTMLElement>,
    parentRef: React.RefObject<HTMLElement>,
    initialPosition: PositionType,
    setPos: (pos: PositionType) => void
) => {
    const offset = useRef<PositionType>({ x: 0, y: 0 })
    const isDragging = useRef(false)
    const pos = useRef<PositionType>(initialPosition)

    useEffect(() => {
        const objRef = ref.current

        const handleMouseDown = (e: MouseEvent) => {
            if (!objRef || !parentRef.current) return

            const elemRect = objRef.getBoundingClientRect()

            offset.current = {
                x: e.clientX - elemRect.left,
                y: e.clientY - elemRect.top,
            }

            isDragging.current = true

            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current || !objRef || !parentRef.current) return

            const parentRect = parentRef.current.getBoundingClientRect()

            const newX = ((e.clientX - parentRect.left - offset.current.x) / parentRect.width) * 100
            const newY = ((e.clientY - parentRect.top - offset.current.y) / parentRect.height) * 100

            const newPos = {
                x: Math.max(0, Math.min(100, newX)),
                y: Math.max(0, Math.min(100, newY)),
            }

            setPos(newPos)
            pos.current = newPos
        }

        const handleMouseUp = () => {
            isDragging.current = false

            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
            dispatch(moveObject, pos.current)
        }

        objRef?.addEventListener('mousedown', handleMouseDown)

        return () => {
            objRef?.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [ref, parentRef, setPos])
}

export default useDragAndDrop
