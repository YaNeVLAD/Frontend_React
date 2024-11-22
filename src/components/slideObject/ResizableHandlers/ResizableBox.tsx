import React, { useState, useRef, useEffect } from 'react'

type ResizableBoxProps = {
    onResize: (size: { width: number, height: number }) => void
    width: number
    height: number
}

const ResizableBox: React.FC<ResizableBoxProps> = ({ onResize, width, height }) => {
    const boxRef = useRef<HTMLDivElement>(null)
    const [dragging, setDragging] = useState(false)
    const [resizeDirection, setResizeDirection] = useState<string | null>(null)
    const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 })
    const [initialSize, setInitialSize] = useState({ width: width, height: height })
    const [currentSize, setCurrentSize] = useState({ width: width, height: height })

    const handleMouseDown = (e: React.MouseEvent, direction: string) => {
        e.preventDefault()
        setResizeDirection(direction)
        setDragging(true)
        setInitialMousePos({ x: e.clientX, y: e.clientY })
        setInitialSize({ width: currentSize.width, height: currentSize.height })
    }

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (dragging) {
                const dx = e.clientX - initialMousePos.x
                const dy = e.clientY - initialMousePos.y

                let newWidth = initialSize.width
                let newHeight = initialSize.height

                switch (resizeDirection) {
                    case 'top-left':
                        newWidth = Math.max(10, initialSize.width - dx)
                        newHeight = Math.max(10, initialSize.height - dy)
                        break
                    case 'top-right':
                        newWidth = Math.max(10, initialSize.width + dx)
                        newHeight = Math.max(10, initialSize.height - dy)
                        break
                    case 'bottom-left':
                        newWidth = Math.max(10, initialSize.width - dx)
                        newHeight = Math.max(10, initialSize.height + dy)
                        break
                    case 'bottom-right':
                        newWidth = Math.max(10, initialSize.width + dx)
                        newHeight = Math.max(10, initialSize.height + dy)
                        break
                    case 'top':
                        newHeight = Math.max(10, initialSize.height - dy)
                        break
                    case 'right':
                        newWidth = Math.max(10, initialSize.width + dx)
                        break
                    case 'bottom':
                        newHeight = Math.max(10, initialSize.height + dy)
                        break
                    case 'left':
                        newWidth = Math.max(10, initialSize.width - dx)
                        break
                    default:
                        break
                }

                setCurrentSize({ width: newWidth, height: newHeight })
                onResize({ width: newWidth, height: newHeight })
            }
        }

        const handleMouseUp = () => {
            setDragging(false)
            setResizeDirection(null)
            onResize(currentSize)
        }

        if (dragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        } else {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [currentSize, dragging, initialMousePos, initialSize, onResize, resizeDirection])

    const boxStyle: React.CSSProperties = {
        width: `100%`,
        height: `100%`,
        position: 'static',
        cursor: 'pointer',
    }

    const cornerStyle = (direction: string): React.CSSProperties => ({
        position: 'absolute',
        width: '12px',
        height: '12px',
        backgroundColor: '#0B57D0',
        cursor: `${direction}-resize`,
        zIndex: 10,
    })

    return (
        <div ref={boxRef} style={boxStyle}>
            <div
                style={{ ...cornerStyle('nw'), top: '-6px', left: '-6px' }}
                onMouseDown={(e) => handleMouseDown(e, 'top-left')}
            />
            <div
                style={{ ...cornerStyle('ne'), top: '-6px', right: '-6px' }}
                onMouseDown={(e) => handleMouseDown(e, 'top-right')}
            />
            <div
                style={{ ...cornerStyle('sw'), bottom: '-6px', left: '-6px' }}
                onMouseDown={(e) => handleMouseDown(e, 'bottom-left')}
            />
            <div
                style={{ ...cornerStyle('se'), bottom: '-6px', right: '-6px' }}
                onMouseDown={(e) => handleMouseDown(e, 'bottom-right')}
            />
            <div
                style={{ ...cornerStyle('n'), top: '-6px', left: '50%' }}
                onMouseDown={(e) => handleMouseDown(e, 'top')}
            />
            <div
                style={{ ...cornerStyle('e'), right: '-6px', top: '50%' }}
                onMouseDown={(e) => handleMouseDown(e, 'right')}
            />
            <div
                style={{ ...cornerStyle('s'), bottom: '-6px', left: '50%' }}
                onMouseDown={(e) => handleMouseDown(e, 'bottom')}
            />
            <div
                style={{ ...cornerStyle('w'), left: '-6px', top: '50%' }}
                onMouseDown={(e) => handleMouseDown(e, 'left')}
            />
        </div>
    )
}

export { ResizableBox }