import { ImageType, TextAreaType } from "../../Model/types"
import { TextArea } from "../textArea/TextArea"
import { Image } from "../image/Image"

type SlideObjectProps = {
    object: TextAreaType | ImageType
}
//Прокинуть объект дальше
function SlideObject(slideObjectProps: SlideObjectProps) {
    let object
    switch (slideObjectProps.object.type) {
        case 'textObj':
            object = <TextArea object={slideObjectProps.object} />
            break
        case 'imageObj':
            object = <Image object={slideObjectProps.object} />
            break
    }

    return (
        <div>
            {object}
        </div>
    )
}

export { SlideObject }