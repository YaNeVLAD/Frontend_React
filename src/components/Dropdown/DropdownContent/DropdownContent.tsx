import { ReactNode } from "react"
import style from './DropdownContent.module.css'

type DropdownContentProps = {
    content: Array<ReactNode>,
    open: boolean
}

function DropdownContent({ content, open }: DropdownContentProps) {
    return (
        <div className={`${style.dropdownContent} ${open ? style.contentOpen : ''}`}>
            {content.map(item =>
                <div className={style.dropdownItem}>{item}</div>
            )}
        </div>
    )
}

export { DropdownContent }