import Popover from '../popover/Popover'
import { useRef } from 'react'
import style from './Button.module.css'

type ButtonProps = {
    icon?: () => JSX.Element,
    text?: string,
    className: string,
    onClick: () => void,
    popoverContent?: JSX.Element
}

const Button = ({ icon, text, className, onClick, popoverContent }: ButtonProps) => {
    const ref = useRef<HTMLButtonElement>(null)

    return (
        (<div className={style.buttonWrapper}>
            <button
                ref={ref}
                onClick={onClick}
                className={`${popoverContent ? style.popoverButton : style.button} ${className}`}>
                {icon ? icon() : <></>}
                {text || <></>}
            </button>
            {popoverContent && (<Popover content={popoverContent}></Popover>)}
        </div>)
    )
}

export { Button }