import ArrowDown20Icon from "../../../../components/common/icons/ArrowDown20Icon"
import { useGetSelectedSlide } from "../../../../hooks/useGetSelectedSlide"
import ColorInput from "../../../../components/ColorInput/ColorInput"
import ImageInput from "../../../../components/ImageInput/ImageInput"
import { Button } from "../../../../components/Button/Button"
import { BackgroundType } from "../../../../storage/types"
import { useAppActions } from "../../../../hooks/useRedux"
import { CSSProperties } from "react"
import style from "./BackgroundPicker.module.css"

const BackgroundPicker = () => {
    const selectedSlide = useGetSelectedSlide()
    const { changeSlideBackground } = useAppActions()

    if (selectedSlide == undefined) return (<></>)

    const onColorChange = (color: string) => {
        const background: BackgroundType = { value: color, type: 'solid' }
        changeSlideBackground(selectedSlide.id, background)
    }

    const onImageUpload = (image: string) => {
        const background: BackgroundType = { value: image, type: 'image' }
        changeSlideBackground(selectedSlide.id, background)
    }

    const backgroundStyle: CSSProperties = {
        backgroundColor: selectedSlide.background.type == 'solid'
            ? selectedSlide.background.value
            : ''
    }

    return (
        <>
            <div className={style.colorPickerWrapper}>
                <label className={style.colorPickerLabel}>Цвет</label>
                <ColorInput
                    color={
                        selectedSlide.background.type == 'solid'
                            ? selectedSlide.background.value
                            : "#FEFEFE"
                    }
                    onColorChange={onColorChange}>
                    <Button
                        type="empty"
                        displayType="color-picker"
                        onClick={() => { }}>
                        <>
                            <div
                                style={backgroundStyle}
                                className={style.colorInputButton}>
                            </div>
                            {ArrowDown20Icon}
                        </>
                    </Button>
                </ColorInput>
            </div>
            <div className={style.colorPickerWrapper}>
                <label className={style.colorPickerLabel}>Изображение</label>
                <ImageInput onImageUpload={onImageUpload} />
            </div>
        </>
    )
}

export { BackgroundPicker }