import { useState } from "react"
import styles from "./SideDropdownMenu.module.css"

type SideDropdownMenuProps = {
    children: JSX.Element,
    content: JSX.Element
}

const SideDropdownMenu = ({ children, content }: SideDropdownMenuProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div
            className={styles.dropdown}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}>
            {children}
            {isOpen && <div className={styles.popover}>{content}</div>}
        </div>
    )
}

export default SideDropdownMenu
