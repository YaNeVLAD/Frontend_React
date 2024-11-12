import { deselectAllObjects } from '../../../storage/actions/objectActions'
import { useZoomableScroll } from './hooks/useZoomableScroll'
import { dispatch } from '../../../storage/editor'
import styles from './ScrollAreaWrapper.module.css'

interface ZoomableScrollWrapperProps {
    children: JSX.Element
}

const ScrollAreaWrapper = ({ children }: ZoomableScrollWrapperProps) => {
    const { containerRef, scale } = useZoomableScroll()
    return (
        <div
            className={styles.container}
            ref={containerRef}
            onMouseDown={(e) => {
                if (e.defaultPrevented) return
                e.preventDefault()
                dispatch(deselectAllObjects)
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
