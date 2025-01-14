import { useState, useEffect, useCallback } from 'react'
import { PositionType } from '../../../storage/types'

const useDragAndDrop = (onDrop: () => void) => {
    const [dragging, setDragging] = useState<boolean>(false)
    const [offset, setOffset] = useState<PositionType>({ x: 0, y: 0 })
    const [startPosition, setStartPosition] = useState<PositionType>({
        x: 0,
        y: 0,
    })
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false)

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            if (isMouseDown) {
                const x = event.clientX - startPosition.x
                const y = event.clientY - startPosition.y
                setOffset({ x, y })
                if (!dragging) {
                    setDragging(true)
                }
            }
        },
        [isMouseDown, dragging, startPosition]
    )

    const handleMouseUp = useCallback(() => {
        if (dragging) {
            setDragging(false)
            onDrop()
            setOffset({ x: 0, y: 0 })
        }
        setIsMouseDown(false)
    }, [dragging, onDrop])

    const handleMouseDown = useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            setStartPosition({
                x: event.clientX,
                y: event.clientY,
            })
            setIsMouseDown(true)
        },
        []
    )

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [handleMouseMove, handleMouseUp])

    return {
        dragging,
        offset,
        handleMouseDown,
    }
}

export default useDragAndDrop