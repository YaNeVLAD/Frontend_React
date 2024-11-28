import { SELECTED_OBJECT_OUTLINE, SELECTED_OBJECT_OUTLINE_SHADOW } from '../../../storage/constants'
import { useAppActions, useAppSelector } from '../../../hooks/useRedux'
import { SlideObject } from '../SlideObject'
import useDragAndResize from './useResize'
import { useRef } from 'react'
import styles from "./ResizableSlideObject.module.css"
import { PositionType } from '../../../storage/types'

type WithResizableProps = {
    id: string,
    slideId: string
    scale: number
    isSelected: boolean
    parentRef: React.RefObject<HTMLElement>
}

const withResizable = (WrappedComponent: React.ComponentType<WithResizableProps>) => {
    return ({ id, slideId, scale, isSelected, parentRef }: WithResizableProps) => {
        const ref = useRef<HTMLDivElement>(null)

        const slide = useAppSelector(
            state => state.editor.presentation.slides.find(
                s => s.id == slideId
            ))

        const object = slide?.objects.find(obj => obj.id == id)

        if (!object) return (<></>)

        const { moveObject, resizeObject } = useAppActions()

        const { offset, sizeOffset, handleMouseDown } = useDragAndResize(
            (offset: PositionType, sizeOffset: PositionType | undefined) => {
                moveObject(slideId, id, {
                    x: object.pos.x + offset.x,
                    y: object.pos.y + offset.y
                })
                if (sizeOffset) {
                    resizeObject(slideId, id, {
                        width: object.size.width + sizeOffset.x,
                        height: object.size.height + sizeOffset.y
                    })
                }
            })

        const cornerStyle = (direction: string): React.CSSProperties => ({
            position: 'absolute',
            width: '12px',
            height: '12px',
            backgroundColor: '#0B57D0',
            cursor: `${direction}-resize`,
            zIndex: 10,
        })

        const slideObjectStyle = {
            left: `${(object.pos.x + offset.x) * scale}px`,
            top: `${(object.pos.y + offset.y) * scale}px`,
            width: `${(object.size.width + sizeOffset.x) * scale}px`,
            height: `${(object.size.height + sizeOffset.y) * scale}px`,
            transform: `rotate(${object.turnAngle}deg)`,
            outline: isSelected ? SELECTED_OBJECT_OUTLINE : '',
            boxShadow: isSelected ? SELECTED_OBJECT_OUTLINE_SHADOW : '',
        }

        return (
            <div
                ref={ref}
                style={slideObjectStyle}
                className={styles.slideObject}
                onMouseDown={(e) => handleMouseDown(e, "drag")}
            >
                <WrappedComponent
                    id={id}
                    slideId={slideId}
                    scale={scale}
                    isSelected={isSelected}
                    parentRef={parentRef}
                />
                {isSelected && (
                    <>
                        <div
                            style={{ ...cornerStyle("nw"), left: "-6px", top: "-6px" }}
                            onMouseMove={(e) => handleMouseDown(e, 'top-left')}
                        />
                        <div
                            style={{ ...cornerStyle('ne'), top: '-6px', right: '-6px' }}
                            onMouseMove={(e) => handleMouseDown(e, 'top-right')}
                        />
                        <div
                            style={{ ...cornerStyle('sw'), bottom: '-6px', left: '-6px' }}
                            onMouseMove={(e) => handleMouseDown(e, 'bottom-left')}
                        />
                        <div
                            style={{ ...cornerStyle('se'), bottom: '-6px', right: '-6px' }}
                            onMouseMove={(e) => handleMouseDown(e, 'bottom-right')}
                        />
                        <div
                            style={{ ...cornerStyle('n'), top: '-6px', left: '50%' }}
                            onMouseMove={(e) => handleMouseDown(e, 'top')}
                        />
                        <div
                            style={{ ...cornerStyle('e'), right: '-6px', top: '50%' }}
                            onMouseMove={(e) => handleMouseDown(e, 'right')}
                        />
                        <div
                            style={{ ...cornerStyle('s'), bottom: '-6px', left: '50%' }}
                            onMouseMove={(e) => handleMouseDown(e, 'bottom')}
                        />
                        <div
                            style={{ ...cornerStyle('w'), left: '-6px', top: '50%' }}
                            onMouseMove={(e) => handleMouseDown(e, 'left')}
                        />
                    </>
                )}
            </div>
        )
    }
}

const ResizableSlideObject = withResizable(SlideObject)

export { ResizableSlideObject }
