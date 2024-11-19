import useHandleClickOutside from '../../hooks/useHandleClickOutside'
import ArrowDown20Icon from '../common/icons/ArrowDown20Icon'
import { useRef } from 'react'
import styles from './Popover.module.css'

type PopoverProps = {
    isOpen: boolean,
    closePopover: () => void,
    content: JSX.Element,
    children?: JSX.Element,
}

const Popover = ({ isOpen, closePopover, content, children }: PopoverProps) => {
    const ref = useRef<HTMLDivElement>(null)

    useHandleClickOutside(ref, closePopover)

    return (
        <div className={styles.popoverContainer} ref={ref}>
            {children ||
                (<div className={`${styles.popoverIcon} ${isOpen && styles.pressed}`}>{ArrowDown20Icon}</div>)}
            {isOpen && (
                <div className={styles.popoverContent}>
                    {content}
                </div>
            )}
        </div>
    )
}

export default Popover
