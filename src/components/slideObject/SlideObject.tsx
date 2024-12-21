import { useAppSelector } from "../../hooks/useRedux"
import { TextArea } from "./TextArea/TextArea"
import { Image } from "./Image/Image"
import { useRef } from "react"
import style from "./SlideObject.module.css"

type SlideObjectProps = {
    id: string,
    slideId: string,
    scale: number,
    isSelected: boolean,
    parentRef?: React.RefObject<HTMLElement>
}

const SlideObject = ({ id, slideId, scale }: SlideObjectProps) => {
    const ref = useRef<HTMLDivElement>(null)

    const slide = useAppSelector(
        state => state.editor.presentation.slides.find(s => s.id == slideId)
    )

    const object = slide?.objects.find(obj => obj.id == id)

    if (!object) return null

    const renderObject = () => {
        switch (object.type) {
            case "textObj":
                return <TextArea context={object} scale={scale} />
            case "imageObj":
                return <Image context={object} scale={scale} />
            default:
                throw new Error("Unknown object type")
        }
    }

    return (
        <div
            ref={ref}
            className={style.slideObject}
        >
            {renderObject()}
        </div>
    )
}

export { SlideObject }