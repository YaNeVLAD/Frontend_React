import SelectImagePopup from "../../../SelectImagePopup/SelectImagePopup"
import { useAppActions, useAppSelector } from "../../../../hooks/useRedux"
import { useSelectedSlide } from "../../../../hooks/useSelectedSlide"
import ColorInput from "../../../../components/ColorInput/ColorInput"
import { Button } from "../../../../components/Button/Button"
import { BackgroundType } from "../../../../storage/types"
import ColorButton from "../../../ColorButton/ColorButton"
import { useState } from "react"
import styles from "./BackgroundPicker.module.css"

const BackgroundPicker = () => {
    const selectedSlide = useSelectedSlide()

    const themeBackground = useAppSelector(state => state.viewModel.slideTheme.background)

    const { changeSlideBackground } = useAppActions()
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [background, setBackground] = useState<BackgroundType | undefined>(selectedSlide?.background)

    if (selectedSlide == undefined) return (<></>)

    const restoreBackground = () => {
        setBackground(themeBackground)
        changeSlideBackground(selectedSlide.id, themeBackground)
    }

    const onBackgroundChange = (newBackground: BackgroundType) => {
        if (background?.value == newBackground.value) return
        setBackground(newBackground)
        changeSlideBackground(selectedSlide.id, newBackground)
    }

    const onImageUpload = (base64: string) => {
        const background: BackgroundType = { value: base64, type: 'image' }
        setBackground(background)
        changeSlideBackground(selectedSlide.id, background)
    }

    return (
        <div className={styles.colorPickerContent}>
            <div className={styles.colorPickerWrapper}>
                <label className={styles.colorPickerLabel}>
                    {'Цвет'}
                </label>
                <ColorInput
                    color={selectedSlide.background.value}
                    onColorChange={onBackgroundChange}>
                    <ColorButton />
                </ColorInput>
            </div>
            <div className={styles.colorPickerWrapper}>
                <label className={styles.colorPickerLabel}>
                    {'Изображение'}
                </label>
                <Button
                    type="text"
                    displayType="image-input"
                    onClick={() => setIsPopupOpen(true)}>
                    {'Выбрать изображение'}
                </Button>

                {isPopupOpen &&
                    <SelectImagePopup
                        setIsOpen={setIsPopupOpen}
                        onImageLoad={onImageUpload}
                    />
                }
            </div>
            <div className={styles.colorPickerWrapper}>
                <label className={styles.colorPickerLabel}>
                    {'Восстановить исходный фон'}
                </label>
                <Button
                    isDisabled={background?.value == themeBackground.value}
                    type="text"
                    displayType="image-input"
                    onClick={restoreBackground}>
                    {'Восстановить'}
                </Button>
            </div>
        </div>
    )
}

export { BackgroundPicker }