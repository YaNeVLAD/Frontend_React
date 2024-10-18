import style from './DropdownButton.module.css'

type DropdownButtonProps = {
    open: boolean,
    onClick: () => void,
}

function DropdownButton({ open, onClick }: DropdownButtonProps) {
    return (
        <div
            onClick={onClick}
            className={`${style.button} ${open ? style.buttonOpen : ''} `}>
            <div className={style.dropdownIcon} />
        </div>
    )
}

export { DropdownButton }