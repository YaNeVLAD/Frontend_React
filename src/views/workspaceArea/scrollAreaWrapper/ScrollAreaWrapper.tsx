import { useZoomableScroll } from './hooks/useZoomableScroll'
import styles from './ScrollAreaWrapper.module.css'

interface ZoomableScrollWrapperProps {
    children: JSX.Element
}

const ScrollAreaWrapper = ({ children }: ZoomableScrollWrapperProps) => {
    const { containerRef, scale } = useZoomableScroll()
    return (
        <div className={styles.container} ref={containerRef}>
            <div
                className={styles.content}
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: '0 0',
                }}
            >
                {children}
            </div>
        </div>
    )
}

export default ScrollAreaWrapper
