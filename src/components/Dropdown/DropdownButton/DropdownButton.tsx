import style from './DropdownButton.module.css'

type DropdownButtonProps = {
    buttonText: string,
    open: boolean,
    onClick: () => void,
}

function DropdownButton(props: DropdownButtonProps) {
    return (
        <div
            className={`${style.dropdownButton} ${props.open ? style.buttonOpen : ''} `}
            onClick={props.onClick}>
            {props.buttonText}
            <div className={`${style.icon} ${props.open ? style.pageUp : style.pageDown}`}></div>
        </div>
    )
}

export { DropdownButton }