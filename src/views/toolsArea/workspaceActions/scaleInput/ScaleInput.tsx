import { useZoomContext } from '../../../WorkspaceArea/ScrollAreaWrapper/hooks/useZoomContext'
import Popover from '../../../../components/Popover/Popover'
import React, { useEffect, useRef, useState } from 'react'
import styles from './ScaleInput.module.css'

const ScaleInput = () => {
    const { scale, setScale } = useZoomContext()
    const inputRef = useRef<HTMLInputElement>(null)

    const [inputValue, setInputValue] = useState(toPercent(scale))
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    useEffect(() => {
        setInputValue(toPercent(scale))
    }, [scale])

    const closePopover = () => setIsPopoverOpen(false)

    const onScaleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const target = e.target as HTMLInputElement
            const scaleNumber = limitScale(target.value, scale)
            setScale(scaleNumber)
            setInputValue(toPercent(scaleNumber))
            inputRef.current?.blur()
        }
    }

    const selectAllText = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select()
        setInputValue(inputValue)
        setIsPopoverOpen(true)
    }

    const restoreValue = () => {
        setInputValue(inputValue)
    }

    const onOptionChange = (value: number) => {
        setScale(value)
        setInputValue(toPercent(value))
        setIsPopoverOpen(false)
    }

    const PopoverContent = (
        <>
            <div onClick={() => onOptionChange(0.50)}>50%</div>
            <div onClick={() => onOptionChange(0.75)}>75%</div>
            <div onClick={() => onOptionChange(0.90)}>90%</div>
            <div onClick={() => onOptionChange(1.00)}>100%</div>
            <div onClick={() => onOptionChange(1.25)}>125%</div>
            <div onClick={() => onOptionChange(1.50)}>150%</div>
            <div onClick={() => onOptionChange(2.00)}>200%</div>
        </>
    )

    return (
        <div>
            <Popover
                isOpen={isPopoverOpen}
                closePopover={closePopover}
                content={PopoverContent}>
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onFocus={selectAllText}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={onScaleChange}
                    onBlur={restoreValue}
                    className={styles.scaleInput}
                />
            </Popover>
        </div>
    )
}

function limitScale(scale: string, currentScale: number): number {
    let scalePercent
    if (scale == "") {
        scalePercent = currentScale
    } else {
        scalePercent = Number(scale) / 100
    }

    let scaleNumber = isNaN(scalePercent) ? currentScale : scalePercent
    scaleNumber =
        scaleNumber <= 0.25
            ? 0.25
            : scaleNumber >= 16
                ? 16
                : scaleNumber

    return scaleNumber
}

function toPercent(value: number): string {
    return `${(value * 100).toFixed(0)}%`
}

export default ScaleInput
