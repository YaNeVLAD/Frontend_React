import { COLLECTION_SLIDE_OBJECT_SCALE, COLLECTION_SLIDE_SCALE } from "../../storage/constants"
import useDragAndDrop from "../../components/SlideObject/hooks/useDragAndDrop"
import { useAppActions, useAppSelector } from "../../hooks/useRedux"
import { useSelectedSlide } from "../../hooks/useSelectedSlide"
import { Slide } from "../../components/Slide/Slide"
import { useEffect, useRef, useState } from "react"
import style from './SlideCollection.module.css'

const SlideCollection = () => {
    const selectedSlide = useSelectedSlide()
    const presentationSlides = useAppSelector(state => state.editor.presentation.slides)
    const selectedSlideIds = useAppSelector(s => s.editor.selection).selectedSlideIds
    const { moveSlide, selectSlides } = useAppActions()

    const containerRef = useRef<HTMLDivElement>(null)
    const [mousePos, setMousePos] = useState(0)

    const { dragging, handleMouseDown } = useDragAndDrop(() => {
        if (dragging && selectedSlideIds?.length) {
            const container = containerRef.current
            if (!container) return

            const slideElements = Array.from(container.querySelectorAll(`.${style.slideWrapper}`))
            const slideCenters = slideElements.map(el => {
                const rect = el.getBoundingClientRect()
                return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
            })

            const draggedIndexes = presentationSlides
                .map((slide, index) => ({ slide, index }))
                .filter(({ slide }) => selectedSlideIds.includes(slide.id))
                .map(({ index }) => index)

            const draggedCenters = draggedIndexes.map(index => slideCenters[index])
            const targetCenter = draggedCenters[0]

            let newIndex = selectedSlide ? presentationSlides.indexOf(selectedSlide) : 0
            slideCenters.forEach((center, index) => {
                const rect = slideElements[index].getBoundingClientRect()
                if (
                    !draggedIndexes.includes(index) &&
                    Math.abs(center.x - targetCenter.x) < rect.width / 2 &&
                    Math.abs(center.y - targetCenter.y) < rect.height / 2
                ) {
                    newIndex = index
                }
            })

            if (newIndex == presentationSlides.length) {
                const reorderedSlides = presentationSlides.filter(slide => !selectedSlideIds.includes(slide.id))
                const draggedSlides = presentationSlides.filter(slide => selectedSlideIds.includes(slide.id))
                moveSlide([...reorderedSlides, ...draggedSlides])
            } else {
                const reorderedSlides = [...presentationSlides]
                const draggedSlides = draggedIndexes.map(index => reorderedSlides[index])
                draggedIndexes.sort((a, b) => b - a).forEach(index => reorderedSlides.splice(index, 1))
                reorderedSlides.splice(newIndex, 0, ...draggedSlides)
                moveSlide(reorderedSlides)
            }
        }
    })

    const handleSlideClick = (slideId: string, index: number, event: React.MouseEvent<HTMLDivElement>) => {
        const isCtrlPressed = event.ctrlKey || event.metaKey
        const isShiftPressed = event.shiftKey
        if (!selectedSlideIds) return
        if (isCtrlPressed && isShiftPressed) {
            const lastSelectedIndex = presentationSlides.findIndex(s => s.id === selectedSlideIds[selectedSlideIds.length - 1])
            const rangeStart = Math.min(lastSelectedIndex, index)
            const rangeEnd = Math.max(lastSelectedIndex, index)
            const rangeIds = presentationSlides.slice(rangeStart, rangeEnd + 1).map(s => s.id)
            const newSelection = Array.from(new Set([...selectedSlideIds, ...rangeIds]))
            selectSlides(newSelection)
        } else if (isShiftPressed) {
            const lastSelectedIndex = presentationSlides.findIndex(s => s.id === selectedSlideIds[selectedSlideIds.length - 1])
            const rangeStart = Math.min(lastSelectedIndex, index)
            const rangeEnd = Math.max(lastSelectedIndex, index)
            const rangeIds = presentationSlides.slice(rangeStart, rangeEnd + 1).map(s => s.id)
            selectSlides(rangeIds)
        } else if (isCtrlPressed) {
            const newSelection = selectedSlideIds.includes(slideId)
                ? selectedSlideIds.filter(id => id !== slideId)
                : [...selectedSlideIds, slideId]
            selectSlides(newSelection)
        } else {
            selectSlides([slideId])
        }
    }

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                setMousePos(e.clientY - 75)
            }
        }

        document.addEventListener('mousemove', handleMouseMove)
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return (
        <div
            className={style.slideCollection}
            ref={containerRef}
        >
            {presentationSlides.map((slide, index) => {
                const isDraggingSlide = dragging && selectedSlideIds?.indexOf(slide.id) != -1
                const draggedIndex = presentationSlides.findIndex(s => s.id == selectedSlide?.id)

                let marginBottom = ''
                let marginTop = ''

                if (draggedIndex == 0 && index == 1 && dragging) {
                    marginTop = '118px'
                }

                if (draggedIndex === presentationSlides.length - 1 && index === presentationSlides.length - 2 && dragging) {
                    marginBottom = '118px'
                }

                if (draggedIndex !== 0 && draggedIndex !== presentationSlides.length - 1 && dragging) {
                    if (index == draggedIndex - 1) {
                        marginBottom = '58.5px'
                    }
                    if (index == draggedIndex + 1) {
                        marginTop = '58.5px'
                    }
                }

                return (
                    <div
                        key={slide.id}
                        className={style.slideWrapper}
                        style={{
                            position: isDraggingSlide ? 'absolute' : 'relative',
                            top: isDraggingSlide ? mousePos : undefined,
                            marginBottom: marginBottom,
                            marginTop: marginTop,
                            zIndex: isDraggingSlide ? 1 : 0,
                            cursor: dragging ? 'grabbing' : 'default',
                        }}
                        onMouseDown={handleMouseDown}
                        onClick={(e) => handleSlideClick(slide.id, index, e)}
                    >
                        {dragging && selectedSlide?.id == slide.id ||
                            <h3 className={style.slideCollectionItemTitle}>{index + 1}</h3>
                        }
                        <div className={style.slideCollectionItemDiv}>
                            <Slide
                                id={slide.id}
                                isSelected={!!(selectedSlideIds && selectedSlideIds.indexOf(slide.id) != -1)}
                                className={style.slideCollectionSlide}
                                scale={COLLECTION_SLIDE_SCALE}
                                objectScale={COLLECTION_SLIDE_OBJECT_SCALE}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SlideCollection