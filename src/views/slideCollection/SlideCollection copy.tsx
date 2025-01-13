import useDragAndDrop from "../../components/SlideObject/hooks/useDragAndDrop"
import { COLLECTION_SLIDE_OBJECT_SCALE } from "../../storage/constants"
import { useAppActions, useAppSelector } from "../../hooks/useRedux"
import { useSelectedSlide } from "../../hooks/useSelectedSlide"
import { Slide } from "../../components/Slide/Slide"
import { useEffect, useRef, useState } from "react"
import style from './SlideCollection.module.css'

type SlideCollectionProps = {
    scale: number;
}

const SlideCollection = ({ scale }: SlideCollectionProps) => {
    const selectedSlide = useSelectedSlide()
    const presentationSlides = useAppSelector(state => state.editor.presentation.slides)
    const { selectSlide, moveSlide } = useAppActions()

    const containerRef = useRef<HTMLDivElement>(null)
    const [mousePos, setMousePos] = useState(0)

    const { dragging, handleMouseDown } = useDragAndDrop(() => {
        if (dragging && selectedSlide) {
            const container = containerRef.current
            if (!container) return

            const slideElements = Array.from(container.querySelectorAll(`.${style.slideWrapper}`))
            const slideCenters = slideElements.map(el => {
                const rect = el.getBoundingClientRect()
                return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
            })

            const draggedIndex = presentationSlides.findIndex(slide => slide.id == selectedSlide.id)
            const draggedCenter = slideCenters[draggedIndex]

            let newIndex = draggedIndex
            slideCenters.forEach((center, index) => {
                const rect = slideElements[index].getBoundingClientRect()
                if (
                    index !== draggedIndex &&
                    Math.abs(center.x - draggedCenter.x) < rect.width / 2 &&
                    Math.abs(center.y - draggedCenter.y) < rect.height / 2
                ) {
                    newIndex = index
                }
            })

            if (newIndex !== draggedIndex) {
                const reorderedSlides = [...presentationSlides]
                const [draggedSlide] = reorderedSlides.splice(draggedIndex, 1)
                reorderedSlides.splice(newIndex, 0, draggedSlide)
                moveSlide(reorderedSlides)
            }
        }
    })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                console.log(containerRef.current.scrollTop)
                setMousePos(e.clientY - containerRef.current.getBoundingClientRect().top + 10)
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
            style={{ cursor: dragging ? 'grabbing' : 'default' }}
        >
            {presentationSlides.map((slide, index) => {
                const isDraggingSlide = dragging && selectedSlide?.id == slide.id
                const draggedIndex = presentationSlides.findIndex(s => s.id == selectedSlide?.id)
                const isPrevNeighbor = dragging && index == draggedIndex - 1
                const isNextNeighbor = dragging && index == draggedIndex + 1
                const isFirstSlide = index === 0
                const isLastSlide = index === presentationSlides.length - 1

                let marginBottom = ''
                let marginTop = ''

                if (isFirstSlide && isNextNeighbor) {
                    marginTop = '118px'
                }

                if (isLastSlide && isPrevNeighbor) {
                    marginBottom = '118px'
                }

                if (isPrevNeighbor && !isFirstSlide) {
                    marginBottom = '58.5px'
                }
                
                if (isNextNeighbor && !isLastSlide) {
                    marginTop = '58.5px'
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
                        }}
                        onMouseDown={(e) => {
                            selectSlide(slide.id)
                            handleMouseDown(e)
                        }}
                    >
                        <h3 className={style.slideCollectionItemTitle}>{index + 1}</h3>
                        <div className={style.slideCollectionItemDiv}>
                            <Slide
                                id={slide.id}
                                isSelected={slide.id == selectedSlide?.id}
                                className={style.slideCollectionSlide}
                                scale={scale}
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