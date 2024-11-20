import styles from "./SideDropdownMenu.module.css"

type SideDropdownMenuProps = {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
    children: JSX.Element,
    content: JSX.Element
}

const SideDropdownMenu = ({ isOpen, onOpen, onClose, children, content }: SideDropdownMenuProps) => {
    return (
        <div
            className={styles.dropdown}
            onMouseEnter={onOpen}
            onMouseLeave={onClose}>
            {children}
            {isOpen && <div className={styles.popover}>{content}</div>}
        </div>
    )
}

export default SideDropdownMenu
