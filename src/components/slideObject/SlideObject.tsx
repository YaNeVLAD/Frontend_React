import { SELECTED_OBJECT_OUTLINE, SELECTED_OBJECT_OUTLINE_SHADOW } from "../../storage/constants"
import { SlideObjectType } from "../../storage/types"
import { useAppActions } from "../../hooks/useRedux"
import { TextArea } from "./TextArea/TextArea"
import { Image } from "./Image/Image"
import { useRef } from "react"
import style from "./SlideObject.module.css"

type SlideObjectProps = {
    object: SlideObjectType
    slideId: string
    scale: number
    isSelected: boolean
    parentRef: React.RefObject<HTMLElement>
}


const SlideObject = ({ object, scale, isSelected }: SlideObjectProps) => {
    const ref = useRef<HTMLDivElement>(null)

    const { selectObject } = useAppActions()

    if (!object) return null

    const slideObjectStyle = {
        width: `100%`,
        height: `100%`,
        transform: `rotate(${object.turnAngle}deg)`,
        outline: isSelected ? SELECTED_OBJECT_OUTLINE : "",
        boxShadow: isSelected ? SELECTED_OBJECT_OUTLINE_SHADOW : "",
    }

    // Мемоизируем handleResize, чтобы избежать циклических вызовов

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
            style={slideObjectStyle}
            onMouseDown={(e) => {
                e.preventDefault()
                selectObject(object.id)
            }}
        >
            {renderObject()}
            {isSelected && (
                <></>
                // <ResizableBox />
            )}
        </div>
    )
}

export { SlideObject }