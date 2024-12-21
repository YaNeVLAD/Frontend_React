import React, { useState, useEffect, useRef } from "react"
import style from "./TitleInput.module.css"
import { BASE_PRESENTATION } from "../../../common/BasePresentation"

type TitleInputProps = {
    title: string
    onTitleChange: (value: string) => void
}

const TitleInput = ({ title, onTitleChange }: TitleInputProps) => {
    const [inputWidth, setInputWidth] = useState("auto")
    const spanRef = useRef<HTMLSpanElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const updateWidth = (value: string) => {
        if (spanRef.current) {
            spanRef.current.textContent = value || " "
            const newWidth = Math.min(spanRef.current.offsetWidth + 10, 600)
            setInputWidth(newWidth + "px")
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateWidth(e.target.value)
        onTitleChange(e.target.value)
    }

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (spanRef.current) {
            const value = e.target.value
            if (value.length > 20 && spanRef.current.offsetWidth > 600) {
                e.target.value = value.slice(0, 20) + "..."
            }
            onTitleChange(
                e.target.value == "" ? BASE_PRESENTATION().title : e.target.value
            )
        }
    }

    useEffect(() => {
        updateWidth(title)
    }, [title])

    return (
        <div className={style.inputContainer}>
            <input
                type="text"
                ref={inputRef}
                value={title}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={style.presentationTitle}
                style={{ width: inputWidth }}
            />
            <span ref={spanRef} className={style.hiddenSpan} />
        </div>
    )
}

export default TitleInput