import style from './Button.module.css'

type Icons = 'plus' | 'pageUp' | 'pageDown' | 'cursor' | 'text' | 'image'

type ButtonWithIcon = {
    type: 'icon',
    value: Icons,
}

type ButtonWithText = {
    type: 'text',
    value: string,
}

type BaseButton = ButtonWithIcon | ButtonWithText

type ButtonProps = BaseButton & {
    className: string,
    onClick: () => void,
}

function Button(props: ButtonProps) {
    let payload
    let iconClass = ""
    let onClick
    switch (props.type) {
        case 'text':
            payload = <p>{props.value}</p>
            onClick = props.onClick
            break

        case 'icon':
            switch (props.value) {
                case 'plus':
                    iconClass += style.plus
                    break
                case 'cursor':
                    iconClass += style.cursor
                    break

                case 'image':
                    iconClass += style.image
                    break

                case 'text':
                    iconClass += style.text
                    break

                case 'pageUp':
                    iconClass += style.pageUp
                    break

                case 'pageDown':
                    iconClass += style.pageDown
                    break
            }
            payload = <div className={`${style.icon} ${iconClass}`} />
            onClick = props.onClick
            break
    }

    return (
        <button onClick={onClick} className={`${style.button} ${props.className}`}>
            {payload}
        </button>
    )
}

export { Button }
export type { ButtonProps }