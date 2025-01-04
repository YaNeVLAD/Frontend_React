import Cursor20Icon from "../../../components/common/Icons/Cursor20Icon"
import Search24Icon from "../../../components/common/Icons/Search24Icon"
import Upload24Icon from "../../../components/common/Icons/Upload24Icon"
import Image20Icon from "../../../components/common/Icons/Image20Icon"
import SeachImagePopup from "../../SearchImagePopup/SearchImagePopup"
import Text20Icon from "../../../components/common/Icons/Text20Icon"
import { useSelectedSlide } from "../../../hooks/useSelectedSlide"
import ImageInput from "../../../components/ImageInput/ImageInput"
import { Button } from "../../../components/Button/Button"
import Popover from "../../../components/Popover/Popover"
import { useAppActions } from "../../../hooks/useRedux"
import { useState } from "react"

const CreateButtonSet = () => {
    const selectedSlide = useSelectedSlide()
    const { deselectObjects, loadImage, addObject } = useAppActions()

    const [isPopoverOpen, setIsPopoverOpen] = useState(false)
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    if (selectedSlide == undefined) return

    const closePopover = () => setIsPopoverOpen(false)
    const togglePopover = () => setIsPopoverOpen(!isPopoverOpen)

    const onAddTextArea = () => addObject(selectedSlide?.id, 'textObj', 'Введите текст')

    const onImageUpload = (src: string) => {
        loadImage(selectedSlide.id, src)
        closePopover()
    }

    const selectImagePopoverContent = (
        <>
            <ImageInput
                type="custom"
                onImageUpload={onImageUpload}>
                <Button
                    type="icon&text"
                    displayType="dropdown">
                    {Upload24Icon}
                    {'Загрузить с компьютера'}
                </Button>
            </ImageInput>
            <Button
                type="icon&text"
                displayType="dropdown"
                onClick={() => setIsPopupOpen(true)}
            >
                {Search24Icon}
                {'Найти в интернете'}
            </Button>
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

            <Popover
                isOpen={isPopoverOpen}
                closePopover={closePopover}
                content={selectImagePopoverContent}>
                <Button
                    type="icon"
                    displayType="tools-area"
                    onClick={togglePopover}>
                    {Image20Icon}
                </Button>
            </Popover>

            <SeachImagePopup
                selectedSlideId={selectedSlide.id}
                isOpen={isPopupOpen}
                setIsOpen={setIsPopupOpen}
            />
        </>
    )
}

export { CreateButtonSet }