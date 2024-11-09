import { ReactNode, useRef, useState } from 'react'
import style from './Popup.module.css'

type PopupProps = {
    content: ReactNode,
    children: ReactNode
}

const Popup = ({ content, children }: PopupProps) => {
    const popupRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    const togglePopup = () => setIsOpen(!isOpen)

    return (
        <div>
            <div onClick={togglePopup}>{children}</div>

            {isOpen && (
                <div className={style.overlay}>
                    <div className={style.popup} ref={popupRef}>
                        {content}
                        <button onClick={togglePopup} className={style.closeButton}>Готово</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Popup
