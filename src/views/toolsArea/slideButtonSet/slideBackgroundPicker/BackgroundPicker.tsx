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
            <ColorInput color={color} onColorChange={onColorChange}></ColorInput>
            <div className={style.colorPickerWrapper}>
                <label className={style.colorPickerLabel}>Изображение</label>
                <label className={style.imageInputButton}>
                    Обзор
                    <ImageInput onImageUpload={onImageUpload} />
                </label>
            </div>
        </>
    )
}

export default BackgroundPicker