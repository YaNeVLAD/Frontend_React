import { ReactNode, useState } from 'react'
import style from './Popup.module.css'
import Close24Icon from '../common/Icons/Close24Icon'
import Close24ActiveIcon from '../common/Icons/Close24ActiveIcon'

type PopupProps = {
    title?: string,
    content: ReactNode,
    children?: ReactNode,
    footer?: ReactNode
    closeAction: () => void,
}

const Popup = ({ title, content, children, footer, closeAction }: PopupProps) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <>
            {children}
            <div className={style.overlay}>
                <div className={style.popup}>
                    <div className={style.titleWrapper}>
                        {title && (<span className={style.title}>{title}</span>)}
                        <div
                            className={style.closeIcon}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={closeAction}>
                            {isHovered ? Close24ActiveIcon : Close24Icon}
                        </div>
                    </div>
                    {content}
                    {footer}
                </div>
            </div>
        </>
    )
}

export default Popup
