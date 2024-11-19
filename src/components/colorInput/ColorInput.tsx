import Popover from "../Popover/Popover"
import { useState } from "react"

type ColorInputProps = {
    color: string,
    children?: JSX.Element,
    onColorChange: (color: string) => void,
}

const ColorInput = ({ color, children, onColorChange }: ColorInputProps) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const color = e.target.value
        onColorChange(color)
    }

    const openPopover = () => setIsPopoverOpen(true)
    const closePopover = () => setIsPopoverOpen(false)

    return (
        <>
            <Popover
                isOpen={isPopoverOpen}
                closePopover={closePopover}
                content={
                    <input type="color" value={color} onChange={onChange} />
                }>
                <div onClick={openPopover}>{children || <>Цвет</>}</div>
            </Popover>
        </>
    )
}

export default ColorInput