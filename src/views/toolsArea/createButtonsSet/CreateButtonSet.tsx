import Cursor20Icon from "../../../components/common/icons/Cursor20Icon"
import { useGetSelectedSlide } from "../../../hooks/useGetSelectedSlide"
import Upload24Icon from "../../../components/common/icons/Upload24Icon"
import Image20Icon from "../../../components/common/icons/Image20Icon"
import Text20Icon from "../../../components/common/icons/Text20Icon"
import ImageInput from "../../../components/ImageInput/ImageInput"
import { Button } from "../../../components/button/Button"
import Popover from "../../../components/popover/Popover"
import { useAppActions } from "../../../hooks/useRedux"
import style from "./CreateButtonSet.module.css"

const CreateButtonSet = () => {
    const selectedSlide = useGetSelectedSlide()
    const { deselectObjects, addObject } = useAppActions()

    const onAddTextArea = () => addObject(selectedSlide?.id, 'textObj', '')

    const onImageUpload = (image: string) => {
        addObject(selectedSlide?.id, 'imageObj', image)
    }

    const selectImagePopoverContent = (
        <>
            <ImageInput
                labelText="Загрузить с компьютера"
                labelIcon={Upload24Icon}
                labelClassName={style.uploadImagePopoverButton}
                onImageUpload={onImageUpload} />
        </>
    )

    return (
        <>
            <Button
                type="icon"
                displayType="tools-area"
                onClick={() => deselectObjects()}>
                {Cursor20Icon}
            </Button>

            <Button
                type="icon"
                displayType="tools-area"
                onClick={onAddTextArea}>
                {Text20Icon}
            </Button>

            <Popover content={selectImagePopoverContent}>
                <Button
                    type="icon"
                    displayType="tools-area"
                    onClick={() => { }}>
                    {Image20Icon}
                </Button>
            </Popover>
        </>
    )
}


export { CreateButtonSet }