import Popover from '../Popover/Popover'
import { useState } from 'react'
import styles from './SelectList.module.css'

type SelectListProps<T extends string> = {
    options: T[],
    selected: T,
    onChange: (value: T) => void,
    optionClassName?: string,
    selectedClassName?: string
}

const SelectList = <T extends string>({ options, selected, onChange, optionClassName, selectedClassName }: SelectListProps<T>) => {
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
                            className={`${styles.selectOption} ${option === selected ? styles.selected : ''} ${optionClassName}`}
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
                className={`${styles.selectedValue} ${selectedClassName}`}
                onClick={togglePopover}
            >
                {selected}
            </div>
        </Popover>
    )
}

export default SelectList