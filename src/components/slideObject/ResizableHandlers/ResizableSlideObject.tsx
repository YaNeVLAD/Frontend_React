import { SELECTED_OBJECT_OUTLINE, SELECTED_OBJECT_OUTLINE_SHADOW } from '../../../storage/constants'
import { SizeType, SlideObjectType } from '../../../storage/types'
import React, { useRef, useState, useCallback } from 'react'
import { useAppActions } from '../../../hooks/useRedux'
import useDragAndDrop from '../hooks/useDragAndDrop'
import { ResizableBox } from './ResizableBox'
import { SlideObject } from '../SlideObject'
import styles from "./ResizableSlideObject.module.css"

type WithResizableProps = {
    object: SlideObjectType
    slideId: string
    scale: number
    isSelected: boolean
    parentRef: React.RefObject<HTMLElement>
}

const withResizable = (WrappedComponent: React.ComponentType<WithResizableProps>) => {
    return ({ object, slideId, scale, isSelected, parentRef }: WithResizableProps) => {
        const ref = useRef<HTMLDivElement>(null)
        const [resizeData, setResizeData] = useState<SizeType>({
            width: object.size.width,
            height: object.size.height
        })
        const { moveObject, resizeObject } = useAppActions()

        const onResize = useCallback(
            (size: SizeType) => {
                setResizeData(size)
                resizeObject(slideId, object.id, size)
            },
            [resizeObject, slideId, object.id]
        )

        const currentPosition = useDragAndDrop(
            ref,
            parentRef,
            object.pos,
            (pos) => moveObject(slideId, object.id, pos)
        )

        // Стиль для позиционирования и изменения размера
        const slideObjectStyle = {
            left: `${currentPosition.x - resizeData.width / 2}%`,
            top: `${currentPosition.y - resizeData.height / 2}%`,
            width: `${resizeData.width}%`,
            height: `${resizeData.height}%`,
            transform: `rotate(${object.turnAngle}deg)`,
            outline: isSelected ? SELECTED_OBJECT_OUTLINE : '',
            boxShadow: isSelected ? SELECTED_OBJECT_OUTLINE_SHADOW : '',
        }

        return (
            <div ref={ref} style={slideObjectStyle} className={styles.slideObject}>
                <WrappedComponent
                    object={{ ...object, size: resizeData }}
                    slideId={slideId}
                    scale={scale}
                    isSelected={isSelected}
                    parentRef={parentRef}
                />
                {isSelected && (
                    <ResizableBox
                        onResize={onResize}
                        width={resizeData.width}
                        height={resizeData.height}
                    />
                )}
            </div>
        )
    }
}

// Оборачиваем SlideObject в HOC, добавляем функциональность ресайза
const ResizableSlideObject = withResizable(SlideObject)

export { ResizableSlideObject }
