import Popover from '../popover/Popover'
import { useRef } from 'react'
import style from './Button.module.css'
import { IconComponent } from '../common/IconComponent'

type ButtonType = 'text' | 'icon' | 'icon&text' | 'empty'

type ButtonWithText = {
    type: 'text'
    children: string,
}

type ButtonWithIcon = {
    type: 'icon'
    children: IconComponent
}

type ButtonWithIconAndText = {
    type: 'icon&text'
    children: [IconComponent, string]
}

type EmptyButton = {
    type: 'empty'
    children: JSX.Element
}

type VariableButtons = ButtonWithText | ButtonWithIcon | ButtonWithIconAndText | EmptyButton

type BaseButtonProps = {
    type: ButtonType,
    onClick: () => void,
    popoverContent?: JSX.Element
}

type ButtonProps = BaseButtonProps & VariableButtons

const Button = ({ onClick, popoverContent, children }: ButtonProps) => {
    const ref = useRef<HTMLButtonElement>(null)

    return (
        (<div className={style.buttonWrapper}>
            <button
                ref={ref}
                onClick={onClick}
                className={`${popoverContent ? style.popoverButton : style.button}`}>
                {children}
            </button>
            {popoverContent && (<Popover content={popoverContent}></Popover>)}
        </div>)
    )
}

export { Button }