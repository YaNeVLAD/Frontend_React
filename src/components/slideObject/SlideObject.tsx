import { ImageType, TextAreaType } from "../../storage/types"
import { TextArea } from "../../views/textArea/TextArea"
import { Image } from "../../views/image/Image"

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