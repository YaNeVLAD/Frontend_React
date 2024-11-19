import ArrowDown20Icon from "../../../../components/common/Icons/ArrowDown20Icon"
import { useGetSelectedSlide } from "../../../../hooks/useGetSelectedSlide"
import ColorInput from "../../../../components/ColorInput/ColorInput"
import ImageInput from "../../../../components/ImageInput/ImageInput"
import { Button } from "../../../../components/Button/Button"
import { BackgroundType } from "../../../../storage/types"
import { useAppActions } from "../../../../hooks/useRedux"
import { CSSProperties, useState } from "react"
import styles from "./BackgroundPicker.module.css"

const BackgroundPicker = () => {
    const selectedSlide = useGetSelectedSlide()

    const { changeSlideBackground } = useAppActions()

    const [background, setBackground] = useState<BackgroundType | undefined>(selectedSlide?.background)

    if (selectedSlide == undefined) return (<></>)

    const restoreBackground = () => {
        const baseBackground: BackgroundType = { type: 'solid', value: "#ffffff" }
        setBackground(baseBackground)
        changeSlideBackground(selectedSlide.id, baseBackground)
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

    const backgroundStyle: CSSProperties = {
        backgroundColor: selectedSlide.background.type == 'solid'
            ? selectedSlide.background.value
            : ''
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
                    <Button
                        type="empty"
                        displayType="color-picker"
                        onClick={() => { }}>
                        <>
                            <div
                                style={backgroundStyle}
                                className={styles.colorInputButton}>
                            </div>
                            {ArrowDown20Icon}
                        </>
                    </Button>
                </ColorInput>
            </div>
            <div className={styles.colorPickerWrapper}>
                <label className={styles.colorPickerLabel}>
                    {'Изображение'}
                </label>
                <ImageInput onImageUpload={onImageUpload} />
            </div>
            <div className={styles.colorPickerWrapper}>
                <label className={styles.colorPickerLabel}>
                    {'Восстановить исходный фон'}
                </label>
                <Button
                    isDisabled={background?.type == 'solid' && background.value.toLowerCase() == "#ffffff"}
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