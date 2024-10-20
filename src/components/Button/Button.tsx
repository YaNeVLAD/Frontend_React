import { Dropdown } from '../dropdown/Dropdown'
import { ReactNode } from 'react'
import style from './Button.module.css'

type Icon = 'plus' | 'pageUp' | 'pageDown' | 'cursor' | 'text' | 'image' | 'bucket' | 'trashCan'

type ButtonWithIcon = {
    type: 'icon',
    value: Icon,
}

type ButtonWithText = {
    type: 'text',
    value: string,
}

type BaseButton = ButtonWithIcon | ButtonWithText

type ButtonProps = BaseButton & {
    className: string,
    onClick: () => void,
    dropdownContent?: Array<ReactNode>
}

function Button(props: ButtonProps) {
    let payload
    let icon = ""
    let onClick
    switch (props.type) {
        case 'text':
            payload = <p>{props.value}</p>
            onClick = props.onClick
            break
        case 'icon':
            icon = selectButtonIcon(props.value)
            payload = <div className={`${style.icon} ${icon}`} />
            onClick = props.onClick
            break
    }

    return (
        <div className={style.buttonWrapper}>
            <button onClick={onClick} className={`${style.button} ${props.className}`}>
                {payload}
            </button>
            {
                props.dropdownContent
                    ? <Dropdown content={props.dropdownContent} />
                    : null
            }
        </div>
    )
}

function selectButtonIcon(icon: Icon): string {
    switch (icon) {
        case 'plus':
            return style.plus

        case 'cursor':
            return style.cursor

        case 'image':
            return style.image

        case 'text':
            return style.text

        case 'pageUp':
            return style.pageUp

        case 'pageDown':
            return style.pageDown

        case 'bucket':
            return style.bucket

        case 'trashCan':
            return style.trashCan

        default:
            throw new Error("Unknown button icon type")
    }
}

export { Button }