import { BackgroundPicker } from "./SlideBackgroundPicker/BackgroundPicker"
import { useGetSelectedSlide } from "../../../hooks/useGetSelectedSlide"
import { Button } from "../../../components/Button/Button"
import { useAppActions } from "../../../hooks/useRedux"
import Popup from "../../../components/Popup/Popup"
import { useState } from "react"

const SlideButtonSet = () => {
    const selectedSlide = useGetSelectedSlide()

    const { deleteSlide } = useAppActions()

    const [isPopupOpen, setIsPopupOpen] = useState(false)

    if (selectedSlide == undefined) return (<></>)

    return (
        <>
            <Button
                type="text"
                displayType="tools-area"
                onClick={() => setIsPopupOpen(true)}>
                {'Фон'}
            </Button>

            {isPopupOpen && (<Popup
                title="Фон"
                closeAction={() => setIsPopupOpen(false)}
                content={<BackgroundPicker />}>
            </Popup>)
            }

            <Button
                type="text"
                displayType="tools-area"
                onClick={() => deleteSlide(selectedSlide.id)}>
                {'Удалить слайд'}
            </Button>
        </>
    )
}

export { SlideButtonSet }