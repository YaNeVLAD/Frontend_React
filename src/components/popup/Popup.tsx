import { ReactNode } from 'react'
import style from './Popup.module.css'

type PopupProps = {
    title?: string,
    content: ReactNode,
    children?: ReactNode,
    closeAction: () => void,
}

const Popup = ({ title, content, children, closeAction }: PopupProps) => {
    return (
        <>
            {children}
            <div className={style.overlay}>
                <div className={style.popup}>
                    <div className={style.titleWrapper}>
                        {title && (<span className={style.title}>{title}</span>)}
                        <div className={style.closeIcon} onClick={closeAction}></div>
                    </div>
                    {content}
                    <button onClick={closeAction} className={style.closeButton}>Готово</button>
                </div>
            </div>
        </>
    )
}

export default Popup
