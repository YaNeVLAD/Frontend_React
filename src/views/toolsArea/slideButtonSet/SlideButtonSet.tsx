import { BackgroundPicker } from "./SlideBackgroundPicker/BackgroundPicker"
import { useSelectedSlide } from "../../../hooks/useSelectedSlide"
import { Button } from "../../../components/Button/Button"
import { useAppActions } from "../../../hooks/useRedux"
import { BackgroundType } from "../../../storage/types"
import Popup from "../../../components/Popup/Popup"
import { useState } from "react"
import styles from "./SlideButtonSet.module.css"

const SlideButtonSet = () => {
    const selectedSlide = useSelectedSlide()

    const { deleteSlide } = useAppActions()

    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const openPopup = () => setIsPopupOpen(true)
    const closePopup = () => setIsPopupOpen(false)

    if (selectedSlide == undefined) return (<></>)

    return (
        <>
            <Button
                type="text"
                displayType="tools-area"
                onClick={openPopup}>
                {'Фон'}
            </Button>

            {isPopupOpen && (<Popup
                title="Фон"
                closeAction={closePopup}
                content={<BackgroundPicker />}
                footer={<BackgroundPopupFoorter
                    background={selectedSlide.background}
                    closePopup={closePopup} />}>
            </Popup>)
            }

            <Button
                type="text"
                displayType="tools-area"
                onClick={() => deleteSlide()}>
                {'Удалить слайд'}
            </Button>
        </>
    )
}

type BackgroundPopupFoorterProps = {
    background: BackgroundType,
    closePopup: () => void
}

const BackgroundPopupFoorter = ({ background, closePopup }: BackgroundPopupFoorterProps) => {
    const { changeAllSlidesBackground, changeSlideThemeBackground } = useAppActions()

    const changeBackground = () => {
        changeSlideThemeBackground(background)
        changeAllSlidesBackground(background)
        closePopup()
    }

    return (
        <div className={styles.popupFooterWrapper}>
            <button
                onClick={changeBackground}
                className={styles.imageInputButton}>
                {'Применить ко всем'}
            </button>
            <button
                onClick={closePopup}
                className={styles.closeButton}>
                {'Готово'}
            </button>
        </div>
    )
}

export { SlideButtonSet }