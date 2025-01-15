import { useMemo } from "react"
import rgbaToHex from "../../../storage/utils/rgbaToHex"
import styles from "./SolidColorPalette.module.css"

type SolidColorPaletteProps = {
    color: string,
    onColorSelect: (color: string) => void,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const SolidColorPalette = ({ color, onChange, onColorSelect }: SolidColorPaletteProps) => {
    const generatePalette = () => {
        const rows = []
        const steps = 10

        rows.push(
            Array.from({ length: steps }, (_, i) => {
                const value = Math.round((255 / (steps - 1)) * i)
                return `rgba(${value}, ${value}, ${value}, ${(steps - 1 - i) / (steps - 1)})`
            })
        )

        const rainbowColors = ["#FF0000", "#FFA500", "#FFFF00", "#008000", "#0000FF", "#4B0082", "#EE82EE"]
        for (const baseColor of rainbowColors) {
            const [r, g, b] = baseColor.match(/\w\w/g)!.map((c) => parseInt(c, 16))
            rows.push(
                Array.from({ length: steps }, (_, i) =>
                    `rgba(${r}, ${g}, ${b}, ${(steps - i) / (steps)})`
                )
            )
        }

        return rows
    }

    const palette = useMemo(() => generatePalette(), [])

    return (
        <div>
            {palette.map((row, rowIndex) => (
                <div className={styles.colorPalette} key={rowIndex}>
                    {row.map((color, colIndex) => (
                        <div
                            key={colIndex}
                            className={styles.color}
                            onClick={() => {
                                const rgbaMatch = color.match(/[\d.]+/g)
                                if (rgbaMatch && rgbaMatch.length >= 4) {
                                    const [r, g, b, a] = rgbaMatch.map(Number)
                                    onColorSelect(rgbaToHex(r, g, b, a))
                                }
                            }}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            ))}
            <input
                type="color"
                value={color}
                className={styles.colorInput}
                onChange={onChange}
            />
        </div>
    )
}

export default SolidColorPalette