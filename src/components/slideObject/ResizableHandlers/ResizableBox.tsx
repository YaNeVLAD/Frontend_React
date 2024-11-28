import { SELECTED_OBJECT_OUTLINE, SELECTED_OBJECT_OUTLINE_SHADOW } from '../../../storage/constants'
import { SizeType } from '../../../storage/types'
import useResize from './useResize'
import React from 'react'

type ResizableBoxProps = {
    isSelected: boolean,
    onResize: (size: SizeType) => void,
    width: number,
    height: number,
}

const ResizableBox = ({ isSelected, onResize, width, height }: ResizableBoxProps) => {
    const { size, handleMouseDown } = useResize({ width, height }, onResize)

    const boxStyle: React.CSSProperties = {
        position: 'absolute',
        left: 0,
        top: 0,
        width: `${size.width}px`,
        height: `${size.height}px`,
        outline: isSelected ? SELECTED_OBJECT_OUTLINE : '',
        boxShadow: isSelected ? SELECTED_OBJECT_OUTLINE_SHADOW : '',
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
        isSelected && (
            <div style={boxStyle}>
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
    )
}

export { ResizableBox }