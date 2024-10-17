import { ReactNode } from "react"
import style from './DropdownContent.module.css'

type DropdownContentProps = {
    content: Array<ReactNode>,
    open: boolean
}

function DropdownContent(props: DropdownContentProps) {
    return (
        <div className={`${style.dropdownContent} ${props.open ? style.contentOpen : ''}`}>
            {props.content}
        </div>
    )
}

export { DropdownContent }