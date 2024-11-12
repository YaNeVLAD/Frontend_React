import { ImageType, SlideObjectType, TextAreaType } from "../../../storage/types"
import RecycleBin20Icon from "../../../components/common/icons/RecycleBin20Icon"
import { changeSrcValue } from "../../../storage/actions/imageActions"
import { deleteObject } from "../../../storage/actions/objectActions"
import ImageInput from "../../../components/ImageInput/ImageInput"
import { Button } from "../../../components/button/Button"
import { dispatch } from "../../../storage/editor"
import style from "./ObjectButtonSet.module.css"

type ObjectButtonSetProps = {
    object: SlideObjectType
}

const ObjectButtonSet = ({ object }: ObjectButtonSetProps) => {
    const onDeleteObject = () => dispatch(deleteObject)

    return (
        <>
            <Button
                type="icon"
                onClick={onDeleteObject}>
                {RecycleBin20Icon}
            </Button>

            {object.type == 'textObj' && (
                <>
                    <div className={style.separator} />
                    <TextObjectButtonSet object={object} />
                </>
            )}
            {object.type == 'imageObj' && (
                <>
                    <div className={style.separator} />
                    <ImageObjectButtonSet object={object} />
                </>
            )}
        </>
    )
}

const ImageObjectButtonSet = (
    { object }: { object: ImageType }
) => {
    const updateImage = (image: string) => {
        dispatch(changeSrcValue, { value: image })
    }

    return (
        <>
            <ImageInput
                labelText="Заменить изображение"
                labelClassName={style.button}
                onImageUpload={updateImage} />
        </>
    )
}

const TextObjectButtonSet = (
    { object }: { object: TextAreaType }
) => {
    return (
        <>
        </>
    )
}

export { ObjectButtonSet }
