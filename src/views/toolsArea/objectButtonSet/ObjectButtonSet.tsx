import RecycleBin20Icon from "../../../components/common/Icons/RecycleBin20Icon"
import { useSelectedObject } from "../../../hooks/useSelectedObject"
import { useSelectedSlide } from "../../../hooks/useSelectedSlide"
import ImageInput from "../../../components/ImageInput/ImageInput"
import { Button } from "../../../components/Button/Button"
import { useAppActions } from "../../../hooks/useRedux"

const ObjectButtonSet = () => {
    const slide = useSelectedSlide()
    const object = useSelectedObject()

    const { deleteObject, changeSrcValue } = useAppActions()

    if (slide == undefined || object == undefined) return

    const onDeleteObject = () => deleteObject(slide?.id, object?.id)
    const changeImageSrc = (src: string) => changeSrcValue(object.id, slide.id, src)

    if (object == undefined) return

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
                    />
                </>
            )}
            {object.type == 'imageObj' && (
                <>
                    <ImageObjectButtonSet
                        changeSrc={changeImageSrc}
                    />
                </>
            )}
        </>
    )
}

const ImageObjectButtonSet = (
    { changeSrc }: { changeSrc: (src: string) => void }
) => {
    return (
        <>
            <ImageInput
                type="custom"
                onImageUpload={(s) => changeSrc(s)}>
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
) => {
    return (
        <>
        </>
    )
}

export { ObjectButtonSet }
