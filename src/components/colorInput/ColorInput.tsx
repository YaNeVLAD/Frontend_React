import Popover from "../Popover/Popover"

type ColorInputProps = {
    color: string,
    children?: JSX.Element,
    onColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const ColorInput = ({ color, children, onColorChange }: ColorInputProps) => {
    return (
        <>
            <Popover content={
                <input type="color" value={color} onChange={onColorChange} />
            }>
                {children || <>Другое</>}
            </Popover>
        </>
    )
}

export default ColorInput