import useHandleClickOutside from '../../hooks/useHandleClickOutside'
import ArrowDown20Icon from '../common/Icons/ArrowDown20Icon'
import { useRef } from 'react'
import styles from './Popover.module.css'

type PopoverProps = {
    isOpen: boolean,
    togglePopover?: () => void,
    closePopover: () => void,
    content: JSX.Element,
    children?: JSX.Element
}

const Popover = ({ isOpen, togglePopover, closePopover, content, children }: PopoverProps) => {
    const ref = useRef<HTMLDivElement>(null)

    useHandleClickOutside(ref, closePopover)

    return (
        <div className={`${styles.popoverContainer} ${isOpen && styles.pressed}`} ref={ref}>
            {children ||
                (<div
                    onClick={togglePopover}
                    className={`${styles.popoverIcon} ${isOpen && styles.pressed}`}>
                    {ArrowDown20Icon}
                </div>)
            }
            {isOpen && (
                <div className={styles.popoverContent}>
                    {content}
                </div>
            )}
        </div>
    )
}

export default Popover
