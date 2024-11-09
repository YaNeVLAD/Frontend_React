import React, { useState, ReactNode } from 'react'
import styles from './Popover.module.css'

type PopoverProps = {
    content: ReactNode
    children: ReactNode
}

const Popover: React.FC<PopoverProps> = ({ content, children }) => {
    const [isOpen, setIsOpen] = useState(false)

    const togglePopover = () => setIsOpen(!isOpen)

    return (
        <div className={styles.popoverContainer}>
            <div onClick={togglePopover} className={styles.clickable}>
                {children}
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
