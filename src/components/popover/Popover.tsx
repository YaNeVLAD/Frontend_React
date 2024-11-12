import useHandleClickOutside from '../../hooks/useHandleClickOutside'
import ArrowDown20Icon from '../common/icons/ArrowDown20Icon'
import { useState, useRef } from 'react'
import styles from './Popover.module.css'

type PopoverProps = {
    content: JSX.Element
    children?: JSX.Element
}

const Popover = ({ content, children }: PopoverProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    const togglePopover = () => setIsOpen(!isOpen)

    const hidePopover = () => setIsOpen(false)

    useHandleClickOutside(ref, hidePopover)

    return (
        <div className={styles.popoverContainer} ref={ref}>
            <div onClick={togglePopover} className={styles.clickable}>
                {children ||
                    (<div className={`${styles.popoverIcon} ${isOpen && styles.pressed}`}>{ArrowDown20Icon}</div>)}
            </div>
            {isOpen && (
                <div className={styles.popoverContent}>
                    {content}
                </div>
            )}
        </div>
    )
}

export default Popover
