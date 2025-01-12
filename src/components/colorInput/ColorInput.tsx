import GradientColorPalette from "../ColorPalette/GradientColorPatette/GradientColorPalette"
import SolidColorPalette from "../ColorPalette/SolidColorPalette/SolidColorPalette"
import Popover from "../Popover/Popover"
import { useState } from "react"
import Tabs from "../Tabs/Tabs"
import styles from "./ColorInput.module.css"
import { BackgroundType } from "../../storage/types"

const SolidColorTab = "Один цвет"
const GradientTab = "Градиент"

type ColorInputProps = {
    color: string,
    children?: JSX.Element,
    onColorChange: (background: BackgroundType) => void,
}

const ColorInput = ({ color, children, onColorChange }: ColorInputProps) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)
    const [currentTab, setCurrentTab] = useState<string>(SolidColorTab)

    const onSolidColorChange = (color: string) =>
        onColorChange({ value: color, type: 'solid' })

    const onGradientColorChange = (color: string) =>
        onColorChange({ value: color, type: 'gradient' })

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
                        <SolidColorPalette
                            color={color}
                            onChange={(e) => onSolidColorChange(e.target.value)}
                            onColorSelect={(color) => onSolidColorChange(color)}
                        />
                    }
                    {currentTab == GradientTab &&
                        <GradientColorPalette
                            color={color}
                            onColorChange={(color) => onGradientColorChange(color)}
                        />
                    }
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

export default ColorInput