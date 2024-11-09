import { CSSProperties } from "react"
import Popover from "../../../../components/popover/Popover"
import style from "./ColorPicker.module.css"

type ColorPickerProps = {
    color: string,
    onColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const ColorPicker = ({ color, onColorChange }: ColorPickerProps) => {
    const backgroundStyle: CSSProperties = {
        backgroundColor: color
    }

    return (
        <div className={style.colorPickerWrapper}>
            <label className={style.colorPickerLabel}>Цвет</label>
            <Popover content={<ColorInput color={color} onColorChange={onColorChange} />}>
                <div
                    style={backgroundStyle}
                    className={style.colorPickerButton}>
                </div>
            </Popover >
        </div>
    )
}

const ColorInput = ({ color, onColorChange }: ColorPickerProps) => {
    return (
        <>
            <input
                type='color'
                value={color}
                onChange={onColorChange} />
        </>
    )
}

export default ColorPicker