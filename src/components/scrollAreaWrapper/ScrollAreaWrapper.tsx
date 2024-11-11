import { useState, useRef, useEffect } from 'react'
import styles from './ScrollAreaWrapper.module.css'

interface ZoomableScrollWrapperProps {
    children: JSX.Element
}

const ScrollAreaWrapper = ({ children }: ZoomableScrollWrapperProps) => {
    const [scale, setScale] = useState(1)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current

        const handleWheel = (e: WheelEvent) => {
            if (e.ctrlKey) {
                e.preventDefault()

                const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1
                const newScale = Math.min(2, Math.max(0.5, scale * zoomFactor))
                const container = containerRef.current

                if (container && newScale !== scale) {
                    // Координаты курсора относительно контейнера
                    const rect = container.getBoundingClientRect()
                    const offsetX = (e.clientX - rect.left) / scale
                    const offsetY = (e.clientY - rect.top) / scale

                    // Устанавливаем новый масштаб
                    setScale(newScale)

                    // Прокручиваем контейнер, чтобы сохранить положение курсора
                    container.scrollLeft += offsetX * (newScale - scale)
                    container.scrollTop += offsetY * (newScale - scale)
                }
            }
        }

        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false })
            return () => container.removeEventListener('wheel', handleWheel)
        }
    }, [scale])

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
