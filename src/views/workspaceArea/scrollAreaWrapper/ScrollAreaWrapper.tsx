import { useZoomableScroll } from './hooks/useZoomableScroll'
import { useAppActions } from '../../../hooks/useRedux'
import styles from './ScrollAreaWrapper.module.css'

interface ZoomableScrollWrapperProps {
    children: JSX.Element
}

const ScrollAreaWrapper = ({ children }: ZoomableScrollWrapperProps) => {
    const { containerRef, scale } = useZoomableScroll()

    const { deselectObjects } = useAppActions()

    return (
        <div
            className={styles.container}
            ref={containerRef}
            onMouseDown={(e) => {
                if (e.defaultPrevented) return
                e.preventDefault()
                deselectObjects()
            }}>
            <div
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
