import { addObject, deselectAllObjects } from "../../../storage/actions/objectActions"
import Cursor20Icon from "../../../components/common/icons/Cursor20Icon"
import Upload24Icon from "../../../components/common/icons/Upload24Icon"
import Image20Icon from "../../../components/common/icons/Image20Icon"
import Text20Icon from "../../../components/common/icons/Text20Icon"
import ImageInput from "../../../components/ImageInput/ImageInput"
import { Button } from "../../../components/button/Button"
import Popover from "../../../components/popover/Popover"
import { dispatch } from "../../../storage/editor"
import style from "./CreateButtonSet.module.css"

const CreateButtonSet = () => {
    const onDeselectAllObjects = () => dispatch(deselectAllObjects)
    const onAddTextArea = () => dispatch(addObject, { type: 'textObj', value: '' })
    const onAddImage = () => { }

    return (
        <>
            <Button
                type="icon"
                displayType="tools-area"
                onClick={onDeselectAllObjects}>
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
                    onClick={onAddImage}>
                    {Image20Icon}
                </Button>
            </Popover>
        </>
    )
}

const onImageUpload = (image: string) => {
    dispatch(addObject, { type: 'imageObj', value: image })
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

export { CreateButtonSet }