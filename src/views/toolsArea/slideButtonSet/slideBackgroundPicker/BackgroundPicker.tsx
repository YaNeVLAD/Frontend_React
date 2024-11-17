import { CSSProperties } from "react"
import { Button } from "../../../../components/button/Button"
import ColorInput from "../../../../components/colorInput/ColorInput"
import ImageInput from "../../../../components/ImageInput/ImageInput"
import style from "./BackgroundPicker.module.css"
import ArrowDown20Icon from "../../../../components/common/icons/ArrowDown20Icon"

type ColorPickerProps = {
    color: string,
    onColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onImageUpload: (data: string) => void
}

const BackgroundPicker = ({ color, onColorChange, onImageUpload }: ColorPickerProps) => {
    const backgroundStyle: CSSProperties = {
        backgroundColor: color
    }

    return (
        <>
            <div className={style.colorPickerWrapper}>
                <label className={style.colorPickerLabel}>Цвет</label>
                <ColorInput color={color} onColorChange={onColorChange}>
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

export default BackgroundPicker