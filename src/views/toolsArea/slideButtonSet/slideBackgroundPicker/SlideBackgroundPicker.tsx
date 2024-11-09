import ColorInput from "../../../../components/colorInput/ColorInput"
import ImageInput from "../../../../components/ImageInput/ImageInput"

type ColorPickerProps = {
    color: string,
    onColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onImageUpload: (data: string) => void
}

const SlideBackgroundPicker = ({ color, onColorChange, onImageUpload }: ColorPickerProps) => {
    return (
        <>
            <ColorInput color={color} onColorChange={onColorChange}></ColorInput>
            <ImageInput onImageUpload={onImageUpload}></ImageInput>
        </>
    )
}

export default SlideBackgroundPicker