import { CSSProperties } from "react"
import { Font } from "../types"

function mapFont(font: Font, scale: number = 1): CSSProperties {
    return {
        fontFamily: font.family,
        fontWeight: font.weight,
        fontStyle: font.style,
        fontSize: `${font.size * scale}px`,
        color: font.color,
    }
}

export default mapFont