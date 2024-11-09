import { CSSProperties } from "react"
import Popover from "../popover/Popover"
import style from "./ColorInput.module.css"

type ColorInputProps = {
    color: string,
    onColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const ColorInput = ({ color, onColorChange }: ColorInputProps) => {
    const backgroundStyle: CSSProperties = {
        backgroundColor: color
    }

    return (
        <>
            <Popover content={
                <input type="color" value={color} onChange={onColorChange} />
            }>
                <div
                    style={backgroundStyle}
                    className={style.colorInputButton}>
                </div>
            </Popover>
        </>
    )
}

export default ColorInput