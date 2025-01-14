import Cursor20Icon from "../../../components/common/Icons/Cursor20Icon"
import Image20Icon from "../../../components/common/Icons/Image20Icon"
import SelectImagePopup from "../../SelectImagePopup/SelectImagePopup"
import Text20Icon from "../../../components/common/Icons/Text20Icon"
import { useSelectedSlide } from "../../../hooks/useSelectedSlide"
import { Button } from "../../../components/Button/Button"
import { useAppActions } from "../../../hooks/useRedux"
import { useState } from "react"

const CreateButtonSet = () => {
    const selectedSlide = useSelectedSlide()
    const { deselectObjects, addObject, loadImage } = useAppActions()

    const [isPopupOpen, setIsPopupOpen] = useState(false)

    if (selectedSlide == undefined) return

    const onAddTextArea = () => addObject(selectedSlide?.id, 'textObj', 'Введите текст')

    const onImageLoad = (src: string) => {
        loadImage(selectedSlide.id, src)
    }

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

            <Button
                type="icon"
                displayType="tools-area"
                onClick={() => setIsPopupOpen(true)}>
                {Image20Icon}
            </Button>

            {isPopupOpen &&
                <SelectImagePopup
                    onImageLoad={onImageLoad}
                    setIsOpen={setIsPopupOpen}
                />
            }
        </>
    )
}

export { CreateButtonSet }