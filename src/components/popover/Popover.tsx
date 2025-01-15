import useHandleClickOutside from '../../hooks/useHandleClickOutside'
import ArrowDown20Icon from '../common/Icons/ArrowDown20Icon'
import { useRef, useEffect, useState } from 'react'
import styles from './Popover.module.css'

type PopoverProps = {
    isOpen: boolean;
    togglePopover?: () => void;
    closePopover: () => void;
    content: JSX.Element;
    position?: 'top' | 'bottom' | 'left' | 'right';
    children?: JSX.Element;
};

const Popover = ({ isOpen, togglePopover, closePopover, content, position = 'bottom', children }: PopoverProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({})
    const [initialized, setInitialized] = useState(false)

    useHandleClickOutside(ref, closePopover)

    const calculatePosition = () => {
        const popover = contentRef.current
        if (!popover) return

        const { top, left, right, bottom, width, height } = popover.getBoundingClientRect()
        const newStyle: React.CSSProperties = { top: '100%', left: '0' }

        if (bottom > window.innerHeight) newStyle.top = `-${height}px`
        if (top < 0) newStyle.top = `100%`
        if (right > window.innerWidth) newStyle.left = `-${width}px`
        if (left < 0) newStyle.left = `100%`

        setPopoverStyle(newStyle)
        setInitialized(true)
    }

    useEffect(() => {
        if (isOpen && !initialized) calculatePosition()
    }, [isOpen, initialized])

    useEffect(() => {
        const handleResize = () => setInitialized(false)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const positionClass = styles[`popover-${position}`] || styles['popover-bottom']

    return (
        <div className={`${styles.popoverContainer} ${isOpen && styles.pressed}`} ref={ref}>
            {children || (
                <div onClick={togglePopover} className={`${styles.popoverIcon} ${isOpen && styles.pressed}`}>
                    {ArrowDown20Icon}
                </div>
            )}
            {isOpen && (
                <div
                    ref={contentRef}
                    style={popoverStyle}
                    className={`${styles.popoverContent} ${positionClass}`}
                >
                    {content}
                </div>
            )}
        </div>
    )
}

export default Popover