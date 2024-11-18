import { IconComponent } from '../common/IconComponent'
import Popover from '../Popover/Popover'
import style from './Button.module.css'
import { useRef } from 'react'

type ButtonType = 'text' | 'icon' | 'icon&text' | 'empty'

type ButtonWithText = {
    type: 'text',
    children: string,
}

type ButtonWithIcon = {
    type: 'icon',
    children: IconComponent,
}

type ButtonWithIconAndText = {
    type: 'icon&text',
    children: [IconComponent, string],
}

type EmptyButton = {
    type: 'empty',
    children: JSX.Element,
}

type VariableButtons = ButtonWithText | ButtonWithIcon | ButtonWithIconAndText | EmptyButton

type ButtonDisplayTypes = 'tools-area' | 'color-picker' | 'tools-area-popover'

type BaseButtonProps = {
    type: ButtonType,
    onClick: () => void,
    popoverContent?: JSX.Element,
    displayType: ButtonDisplayTypes,
}

type ButtonProps = BaseButtonProps & VariableButtons

const Button = ({ onClick, popoverContent, children, displayType }: ButtonProps) => {
    const ref = useRef<HTMLButtonElement>(null)

    const displayClassMap: Record<ButtonDisplayTypes, string> = {
        'tools-area': style.toolsAreaButton,
        'color-picker': style.colorPickerButton,
        'tools-area-popover': style.toolsAreaPopoverButton,
    }

    const selectedClass = displayClassMap[displayType]

    return (
        <div className={style.buttonWrapper}>
            <button
                ref={ref}
                onClick={onClick}
                className={`${selectedClass} ${popoverContent ? style.popoverButton : ''}`}>
                {children}
            </button>
            {popoverContent && <Popover content={popoverContent} />}
        </div>
    )
}

export { Button }