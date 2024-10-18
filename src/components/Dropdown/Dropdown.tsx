import { DropdownButton } from "./DropdownButton/DropdownButton"
import { DropdownContent } from "./DropdownContent/DropdownContent"
import { ReactNode, useState } from "react"
import style from "./Dropdown.module.css"

type DropdownProps = {
    content: Array<ReactNode>
}

function Dropdown({ content }: DropdownProps) {
    const [open, setOpen] = useState(false)

    const onToggleDropdown = () => {
        setOpen(!open)
    }

    return (
        <div className={style.dropdown}>
            <DropdownButton
                open={open}
                onClick={onToggleDropdown} />
            <DropdownContent
                content={content}
                open={open} />
        </div>
    )
}

export { Dropdown }