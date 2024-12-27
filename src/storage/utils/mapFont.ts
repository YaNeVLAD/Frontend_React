import { CSSProperties } from "react"
import { Font } from "../types"

function mapFont(font: Font, scale: number = 1): CSSProperties {
    const [family, weight, italic] = font.family.split('-')

    return {
        fontFamily: family,
        fontWeight: weight === 'Bold' ? 'bold' : 'normal',
        fontStyle: italic === 'Italic' ? 'italic' : 'normal',
        fontSize: `${font.size * scale}px`,
        color: font.color,
    }
}

export default mapFont