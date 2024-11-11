import { WORKSPACE_SLIDE_OBJECT_SCALE } from "../../storage/constants"
import { SlideObjectType, SlideType } from "../../storage/types"
import { Slide } from "../../components/slide/Slide"
import { useEffect, useRef, useState } from "react"
import style from "./WorkspaceArea.module.css"

type WorkspaceAreaProps = {
    slide: SlideType,
    selectedObject: SlideObjectType | undefined,
}

const WorkspaceArea = ({ slide, selectedObject }: WorkspaceAreaProps) => {
    const [scale, setScale] = useState(1)
    const [origin, setOrigin] = useState({ x: '50%', y: '50%' })
    const slideRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleZoom = (delta: number, cursorX: number, cursorY: number) => {
            if (!slideRef.current) return

            const rect = slideRef.current.getBoundingClientRect()
            const offsetX = ((cursorX - rect.left) / rect.width) * 100
            const offsetY = ((cursorY - rect.top) / rect.height) * 100

            setOrigin({ x: `${offsetX}%`, y: `${offsetY}%` })

            setScale((prevScale) => Math.min(Math.max(prevScale + delta, 0.5), 3))
        }

        const handleWheel = (e: WheelEvent) => {
            if (e.ctrlKey) {
                e.preventDefault()
                const delta = e.deltaY < 0 ? 0.1 : -0.1
                handleZoom(delta, e.clientX, e.clientY)
            }
        }

        window.addEventListener('wheel', handleWheel, { passive: false })
        return () => {
            window.removeEventListener('wheel', handleWheel)
        }
    }, [])

    return (
        <div className={style.workspaceArea}>
            <div
                ref={slideRef}
                className={style.workspaceSlideWrapper}
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: `${origin.x} ${origin.y}`,
                }}>

                <Slide
                    id={slide.id}
                    selectedObjectId={selectedObject?.id}
                    objects={slide.objects}
                    background={slide.background}
                    isSelected={false}
                    className={style.workspaceSlide}
                    scale={scale}
                    objectScale={WORKSPACE_SLIDE_OBJECT_SCALE} />
            </div>
        </div >
    )
}

export default WorkspaceArea
