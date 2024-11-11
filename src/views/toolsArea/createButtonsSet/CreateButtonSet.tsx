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
    return (
        <>
            <Button
                icon={Cursor20Icon}
                onClick={() => dispatch(deselectAllObjects)}
                className='' />

            <Button
                icon={Text20Icon}
                onClick={() => dispatch(addObject, { type: 'textObj', value: '' })}
                className='' />

            <Popover content={selectImagePopoverContent()}>
                <Button
                    icon={Image20Icon}
                    onClick={() => { }}
                    className='' />
            </Popover>
        </>
    )
}

const onImageUpload = (image: string) => {
    dispatch(addObject, { type: 'imageObj', value: image })
}

const selectImagePopoverContent = () => {
    return (
        <>
            <ImageInput
                labelText="Загрузить с компьютера"
                labelIcon={Upload24Icon}
                labelClassName={style.uploadImagePopoverButton}
                onImageUpload={onImageUpload} />
        </>
    )
}

export { CreateButtonSet }