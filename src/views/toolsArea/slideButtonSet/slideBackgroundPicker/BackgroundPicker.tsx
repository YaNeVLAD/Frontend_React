import ColorInput from "../../../../components/colorInput/ColorInput"
import ImageInput from "../../../../components/ImageInput/ImageInput"
import style from "./BackgroundPicker.module.css"

type ColorPickerProps = {
    color: string,
    onColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onImageUpload: (data: string) => void
}

const BackgroundPicker = ({ color, onColorChange, onImageUpload }: ColorPickerProps) => {
    return (
        <>
            <div className={style.colorPickerWrapper}>
                <label className={style.colorPickerLabel}>Цвет</label>
                <ColorInput color={color} onColorChange={onColorChange}></ColorInput>
            </div>
            <div className={style.colorPickerWrapper}>
                <label className={style.colorPickerLabel}>Изображение</label>
                <ImageInput onImageUpload={onImageUpload} />
            </div>
        </>
    )
}

export default BackgroundPicker