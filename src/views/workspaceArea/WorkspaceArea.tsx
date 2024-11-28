import { SELECTED_SLIDE_SCALE, WORKSPACE_SLIDE_OBJECT_SCALE } from "../../storage/constants"
import { useGetSelectedObject } from "../../hooks/useGetSelectedObject"
import { useGetSelectedSlide } from "../../hooks/useGetSelectedSlide"
import ScrollAreaWrapper from "./ScrollAreaWrapper/ScrollAreaWrapper"
import { Slide } from "../../components/Slide/Slide"
import style from "./WorkspaceArea.module.css"

const WorkspaceArea = () => {
    const selectedSlide = useGetSelectedSlide()
    const selectedObject = useGetSelectedObject()

    if (selectedSlide == undefined) return (<></>)

    return (
        <ScrollAreaWrapper>
            <div
                className={style.workspaceArea}>
                <div
                    className={style.workspaceSlideWrapper}>
                    <Slide
                        id={selectedSlide.id}
                        selectedObjectId={selectedObject?.id}
                        isSelected={false}
                        className={style.workspaceSlide}
                        scale={SELECTED_SLIDE_SCALE}
                        objectScale={WORKSPACE_SLIDE_OBJECT_SCALE} />
                </div>
            </div >
        </ScrollAreaWrapper>
    )
}

export default WorkspaceArea
