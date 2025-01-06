import { useSelectedSlide } from "../../../../hooks/useSelectedSlide"
import { useAppActions, useAppSelector } from "../../../../hooks/useRedux"
import ColorInput from "../../../../components/ColorInput/ColorInput"
import ImageInput from "../../../../components/ImageInput/ImageInput"
import { Button } from "../../../../components/Button/Button"
import { BackgroundType } from "../../../../storage/types"
import ColorButton from "../../../ColorButton/ColorButton"
import { useState } from "react"
import styles from "./BackgroundPicker.module.css"

const BackgroundPicker = () => {
    const selectedSlide = useSelectedSlide()

    const themeBackground = useAppSelector(state => state.viewModel.slideTheme.background)

    const { changeSlideBackground } = useAppActions()

    const [background, setBackground] = useState<BackgroundType | undefined>(selectedSlide?.background)

    if (selectedSlide == undefined) return (<></>)

    const restoreBackground = () => {
        setBackground(themeBackground)
        changeSlideBackground(selectedSlide.id, themeBackground)
    }

    const onBackgroundChange = (color: string) => {
        const background: BackgroundType = { value: color, type: 'solid' }
        setBackground(background)
        changeSlideBackground(selectedSlide.id, background)
    }

    const onImageUpload = (image: string) => {
        const background: BackgroundType = { value: image, type: 'image' }
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
                    color={
                        selectedSlide.background.type == 'solid'
                            ? selectedSlide.background.value
                            : "#ffffff"
                    }
                    onColorChange={onBackgroundChange}>
                    <ColorButton />
                </ColorInput>
            </div>
            <div className={styles.colorPickerWrapper}>
                <label className={styles.colorPickerLabel}>
                    {'Изображение'}
                </label>
                <ImageInput
                    type="custom"
                    onImageUpload={onImageUpload}>
                    <Button
                        type="text"
                        displayType="image-input"
                        onClick={() => { }}>
                        {'Выбрать изображение'}
                    </Button>
                </ImageInput>
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