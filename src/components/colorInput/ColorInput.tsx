import rgbaToHex from "../../storage/utils/rgbaToHex"
import Popover from "../Popover/Popover"
import { useState } from "react"
import Tabs from "../Tabs/Tabs"
import styles from "./ColorInput.module.css"

const SolidColorTab = "Один цвет"
const GradientTab = "Градиент"

type ColorInputProps = {
    color: string,
    children?: JSX.Element,
    onColorChange: (color: string) => void,
}

const ColorInput = ({ color, children, onColorChange }: ColorInputProps) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)
    const [currentTab, setCurrentTab] = useState<string>(SolidColorTab)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const color = e.target.value
        onColorChange(color)
    }

    const openPopover = () => setIsPopoverOpen(true)
    const closePopover = () => setIsPopoverOpen(false)

    return (
        <Popover
            isOpen={isPopoverOpen}
            closePopover={closePopover}
            content={
                <>
                    <Tabs
                        tabs={[SolidColorTab, GradientTab]}
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                    />
                    {currentTab == SolidColorTab &&
                        <SolidColorTabContent
                            color={color}
                            onChange={onChange}
                            onColorSelect={(color) => onColorChange(color)}
                        />
                    }
                    {currentTab == GradientTab &&
                        <GradientTabContent />}
                </>
            }>
            <div
                className={isPopoverOpen ? styles.openedPopoverButton : ""}
                onClick={openPopover}>
                {children || <>Цвет</>}
            </div>
        </Popover>
    )
}

type SolidColorTabContentProps = {
    color: string,
    onColorSelect: (color: string) => void,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const SolidColorTabContent = ({ color, onChange, onColorSelect }: SolidColorTabContentProps) => {
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

    const palette = generatePalette()

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
            <input type="color" value={color} onChange={onChange} />
        </div>
    )
}


const GradientTabContent = () => {
    return (<></>)
}

export default ColorInput