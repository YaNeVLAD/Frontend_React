import { DropdownButton } from "./DropdownButton/DropdownButton"
import { DropdownContent } from "./DropdownContent/DropdownContent"
import { ReactNode, useEffect, useRef, useState } from "react"
import style from "./Dropdown.module.css"

type DropdownProps = {
    content: Array<ReactNode>
}

function Dropdown({ content }: DropdownProps) {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null)

    const onToggleDropdown = () => {
        setOpen(!open)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div
            ref={dropdownRef}
            className={style.dropdown}>
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