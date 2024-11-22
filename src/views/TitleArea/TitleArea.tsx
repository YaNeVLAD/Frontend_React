import { useAppActions, useAppSelector } from "../../hooks/useRedux"
import { BASE_PRESENTATION } from "../../common/BasePresentation"
import { PROJECT_NAME } from "../../storage/constants"
import { useRef, useState, useEffect } from "react"
import style from "./TitleArea.module.css"

const TitleArea = () => {
    const [inputWidth, setInputWidth] = useState("auto")
    const spanRef = useRef<HTMLSpanElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const { changePresentationTitle } = useAppActions()
    const title = useAppSelector(state => state.editor.presentation.title)

    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        changePresentationTitle(event.target.value)
    }

    const onTitleInputBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length == 0) event.target.value = BASE_PRESENTATION().title
        changePresentationTitle(event.target.value)
    }

    const updateWidth = (value: string) => {
        if (spanRef.current) {
            spanRef.current.textContent = value || " "
            const newWidth = Math.min(spanRef.current.offsetWidth + 10, 600)
            setInputWidth(newWidth + "px")
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateWidth(e.target.value)
        onTitleChange(e)
    }

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (spanRef.current) {
            const value = e.target.value
            if (value.length > 20 && spanRef.current.offsetWidth > 600) {
                e.target.value = value.slice(0, 20) + "..."
            }
            onTitleInputBlur(e)
            document.title = title + ' - ' + PROJECT_NAME
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
                defaultValue={title}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={style.presentationTitle}
                style={{ width: inputWidth }}
            />
            <span ref={spanRef} className={style.hiddenSpan} />
        </div>
    )
}

export default TitleArea