import { ImageType, TextAreaType } from "../../Model/types"
import { TextArea } from "../textArea/TextArea"
import { Image } from "../image/Image"

type SlideObjectProps = {
    object: TextAreaType | ImageType
}

function SlideObject(slideObjectProps: SlideObjectProps) {
    let object
    switch (slideObjectProps.object.type) {
        case 'textObj':
            object = <TextArea
                key={slideObjectProps.object.id}
                value={slideObjectProps.object.value}
                font={slideObjectProps.object.font}
                color={slideObjectProps.object.color}
                textSize={slideObjectProps.object.textSize}
                pos={slideObjectProps.object.pos}
                size={slideObjectProps.object.size}
                turnAngle={slideObjectProps.object.turnAngle} />
            break
        case 'imageObj':
            object = <Image
                key={slideObjectProps.object.id}
                src={slideObjectProps.object.src}
                pos={slideObjectProps.object.pos}
                size={slideObjectProps.object.size}
                turnAngle={slideObjectProps.object.turnAngle} />
            break
    }

    return (
        <div>
            {object}
        </div>
    )
}

export { SlideObject }