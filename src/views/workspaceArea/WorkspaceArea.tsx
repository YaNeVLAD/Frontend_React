import { SELECTED_SLIDE_SCALE, WORKSPACE_SLIDE_OBJECT_SCALE } from "../../storage/constants"
import ScrollAreaWrapper from "./scrollAreaWrapper/ScrollAreaWrapper"
import { SlideObjectType, SlideType } from "../../storage/types"
import { Slide } from "../../components/slide/Slide"
import style from "./WorkspaceArea.module.css"

type WorkspaceAreaProps = {
    slide: SlideType,
    selectedObject: SlideObjectType | undefined,
}

const WorkspaceArea = ({ slide, selectedObject }: WorkspaceAreaProps) => {
    return (
        <ScrollAreaWrapper>
            <div className={style.workspaceArea}>
                <div
                    className={style.workspaceSlideWrapper}>
                    <Slide
                        id={slide.id}
                        selectedObjectId={selectedObject?.id}
                        objects={slide.objects}
                        background={slide.background}
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
