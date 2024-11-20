import { IconComponent } from '../common/IconComponent'
import Popover from '../Popover/Popover'
import style from './Button.module.css'
import { useRef, useState } from 'react'

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

type ButtonDisplayTypes = 'tools-area' | 'color-picker' | 'tools-area-popover' | 'image-input' | 'dropdown'

type BaseButtonProps = {
    type: ButtonType,
    onClick: () => void,
    popoverContent?: JSX.Element,
    displayType: ButtonDisplayTypes,
    isDisabled?: boolean
}

type ButtonProps = BaseButtonProps & VariableButtons

const displayClassMap: Record<ButtonDisplayTypes, string> = {
    'tools-area': style.toolsAreaButton,
    'color-picker': style.colorPickerButton,
    'tools-area-popover': style.toolsAreaPopoverButton,
    'image-input': style.imageInputButton,
    'dropdown': style.dropdownButton
}

const Button = ({ onClick, popoverContent, children, displayType, isDisabled }: ButtonProps) => {
    const ref = useRef<HTMLButtonElement>(null)
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    const closePopover = () => setIsPopoverOpen(false)
    const togglePopover = () => setIsPopoverOpen(!isPopoverOpen)

    const onButtonClick = () => {
        onClick()
        if (popoverContent) closePopover()
    }

    const selectedClass = displayClassMap[displayType]

    return (
        <div className={style.buttonWrapper}>
            <button
                disabled={isDisabled}
                ref={ref}
                onClick={onButtonClick}
                className={`${selectedClass} ${popoverContent ? style.popoverButton : ''}`}>
                {children}
            </button>
            {popoverContent
                && <Popover
                    isOpen={isPopoverOpen}
                    togglePopover={togglePopover}
                    closePopover={closePopover}
                    content={popoverContent} />}
        </div>
    )
}

export { Button }