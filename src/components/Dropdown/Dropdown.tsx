import { DropdownButton } from "./DropdownButton/DropdownButton"
import { DropdownContent } from "./DropdownContent/DropdownContent"
import style from "./Dropdown.module.css"
import { useState } from "react"

function Dropdown() {
    const [open, setOpen] = useState(false)

    const onToggleDropdown = () => {
        setOpen(!open)
    }

    return (
        <div className={style.dropdown}>
            <DropdownButton
                buttonText="Button"
                open={open}
                onClick={onToggleDropdown} />
            <DropdownContent
                content={[<p>Привет</p>]}
                open={open} />
        </div>
    )
}

export { Dropdown }