import { useZoomContext } from '../../../workspaceArea/scrollAreaWrapper/hooks/useZoomContext'
import React, { useEffect, useRef, useState } from 'react'
import styles from './ScaleInput.module.css'
import Popover from '../../../../components/Popover/Popover'

const ScaleInput = () => {
    const { scale, setScale } = useZoomContext()
    const percentScale = toPercent(scale)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setInputValue(percentScale)
    }, [percentScale])

    const [inputValue, setInputValue] = useState(percentScale)

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
        setInputValue(percentScale)
    }

    const restoreValue = () => {
        setInputValue(percentScale)
    }

    // const onOptionChange = (value: string) => {
    //     setScale(Number(value))
    //     setInputValue(value)
    // }

    const PopoverContent = (
        <>
            <div>100</div>
            <div>200</div>
        </>
    )

    return (
        <div>
            <Popover content={PopoverContent} >
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
