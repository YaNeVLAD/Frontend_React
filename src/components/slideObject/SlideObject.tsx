import { ImageType, TextAreaType } from "../../storage/types"
import { TextArea } from "../../views/textArea/TextArea"
import { Image } from "../../views/image/Image"
import { dispatch } from "../../storage/presentation"
import { selectObject } from "../../storage/functions"
import style from './SlideObject.module.css'

type SlideObjectProps = {
    selectedObjectId: string | undefined,
    object: TextAreaType | ImageType,
}

function SlideObject(slideObjectProps: SlideObjectProps) {
    function onClick() {
        dispatch(selectObject, { id: slideObjectProps.object.id })
    }

    let object
    switch (slideObjectProps.object.type) {
        case 'textObj':
            object = <TextArea
                object={slideObjectProps.object}
                onClick={onClick} />
            break
        case 'imageObj':
            object = <Image
                object={slideObjectProps.object}
                onClick={onClick} />
            break
    }

    const slideObjectStyle = {
        left: slideObjectProps.object.pos.x,
        top: slideObjectProps.object.pos.y,
        width: slideObjectProps.object.size.width,
        height: slideObjectProps.object.size.height,
        transform: 'rotate(' + slideObjectProps.object.turnAngle + 'deg)',
        border: '',
    }

    if (slideObjectProps.object.id == slideObjectProps.selectedObjectId) {
        slideObjectStyle.border = 'solid 5px #6565FF'
    }

    return (
        <div className={style.slideObject} style={slideObjectStyle}>
            {object}
        </div>
    )
}

export { SlideObject }