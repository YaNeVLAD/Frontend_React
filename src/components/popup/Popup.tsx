import { ReactNode, useRef, useState } from 'react'
import style from './Popup.module.css'

type PopupProps = {
    title?: string,
    content: ReactNode,
    children: ReactNode
}

const Popup = ({ title, content, children }: PopupProps) => {
    const popupRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    const togglePopup = () => setIsOpen(!isOpen)

    return (
        <>
            <div onClick={togglePopup}>{children}</div>

            {isOpen && (
                <div className={style.overlay}>
                    <div className={style.popup} ref={popupRef}>
                        <div className={style.titleWrapper}>
                            {title || (<span className={style.title}>{title}</span>)}
                            <div className={style.closeIcon} onClick={togglePopup}></div>
                        </div>
                        {content}
                        <button onClick={togglePopup} className={style.closeButton}>Готово</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Popup
