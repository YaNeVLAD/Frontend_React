import Popover from '../Popover/Popover'
import { useState } from 'react'
import styles from './SelectList.module.css'

type SelectListProps = {
    options: string[],
    selected: string,
    onChange: (value: string) => void,
}

const SelectList = ({ options, selected, onChange }: SelectListProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const togglePopover = () => setIsOpen(!isOpen)
    const closePopover = () => setIsOpen(false)

    return (
        <Popover
            isOpen={isOpen}
            togglePopover={togglePopover}
            closePopover={closePopover}
            content={
                <ul className={styles.selectList}>
                    {options.map(option => (
                        <li
                            key={option}
                            className={`${styles.selectOption} ${option === selected ? styles.selected : ''}`}
                            onClick={(e) => {
                                e.stopPropagation()
                                onChange(option)
                                closePopover()
                            }}>
                            {option}
                        </li>
                    ))}
                </ul>
            }>
            <div
                className={styles.selectedValue}
                onClick={togglePopover}
            >
                {selected}
            </div>
        </Popover>
    )
}

export default SelectList