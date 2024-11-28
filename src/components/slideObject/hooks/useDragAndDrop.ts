import { useState, useEffect, useCallback } from 'react'
import { PositionType } from '../../../storage/types'

const useDragAndDrop = (onDrop: () => void) => {
    const [dragging, setDragging] = useState<boolean>(false)
    const [offset, setOffset] = useState<PositionType>({ x: 0, y: 0 })
    const [startPosition, setStartPosition] = useState<{ startX: number, startY: number }>({
        startX: 0,
        startY: 0,
    })

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            if (dragging) {
                const x = event.clientX - startPosition.startX
                const y = event.clientY - startPosition.startY
                setOffset({ x, y })
            }
        },
        [dragging, startPosition]
    )

    const handleMouseUp = useCallback(() => {
        if (dragging) {
            setDragging(false)
            onDrop()
            setOffset({ x: 0, y: 0 })
        }
    }, [dragging, onDrop])

    const handleMouseDown = useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            setDragging(true)
            setStartPosition({
                startX: event.clientX,
                startY: event.clientY,
            })
        },
        []
    )

    useEffect(() => {
        if (dragging) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
        } else {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [dragging, handleMouseMove, handleMouseUp])

    return {
        offset,
        handleMouseDown,
    }
}

export default useDragAndDrop
