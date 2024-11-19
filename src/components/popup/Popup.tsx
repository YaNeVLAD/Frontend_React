import { ReactNode } from 'react'
import style from './Popup.module.css'

type PopupProps = {
    title?: string,
    content: ReactNode,
    children?: ReactNode,
    footer?: ReactNode
    closeAction: () => void,
}

const Popup = ({ title, content, children, footer, closeAction }: PopupProps) => {
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
                    {footer}
                </div>
            </div>
        </>
    )
}

export default Popup
