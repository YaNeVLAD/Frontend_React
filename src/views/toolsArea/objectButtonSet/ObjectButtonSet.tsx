import RecycleBin20Icon from "../../../components/common/Icons/RecycleBin20Icon"
import { useGetSelectedObject } from "../../../hooks/useGetSelectedObject"
import { useGetSelectedSlide } from "../../../hooks/useGetSelectedSlide"
import { changeSrcValue } from "../../../storage/actions/imageActions"
import ImageInput from "../../../components/ImageInput/ImageInput"
import { Button } from "../../../components/Button/Button"
import { useAppActions } from "../../../hooks/useRedux"
import { dispatch } from "../../../storage/editor"

const ObjectButtonSet = () => {
    const slide = useGetSelectedSlide()
    const object = useGetSelectedObject()

    const { deleteObject } = useAppActions()

    const onDeleteObject = () => deleteObject(slide?.id, object?.id)

    if (object == undefined) return (<></>)

    return (
        <>
            <Button
                type="icon"
                displayType="tools-area"
                onClick={onDeleteObject}>
                {RecycleBin20Icon}
            </Button>

            {object.type == 'textObj' && (
                <>
                    <TextObjectButtonSet
                    // object={object}
                    />
                </>
            )}
            {object.type == 'imageObj' && (
                <>
                    <ImageObjectButtonSet
                    // object={object}
                    />
                </>
            )}
        </>
    )
}

const ImageObjectButtonSet = (
    // { object }: { object: ImageType }
) => {
    const updateImage = (image: string) => {
        dispatch(changeSrcValue, { value: image })
    }

    return (
        <>
            <ImageInput
                type="custom"
                onImageUpload={updateImage}>
                <Button
                    type="text"
                    displayType="tools-area"
                    onClick={() => { }}>
                    {'Заменить изображение'}
                </Button>
            </ImageInput>
        </>
    )
}

const TextObjectButtonSet = (
    // { object }: { object: TextAreaType }
) => {
    return (
        <>
        </>
    )
}

export { ObjectButtonSet }
