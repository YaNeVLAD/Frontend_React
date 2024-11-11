import { useZoomContext } from './useZoomContext'
import { useRef, useEffect } from 'react'

export function useZoomableScroll() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scale, setScale } = useZoomContext()

    useEffect(() => {
        const container = containerRef.current

        const handleWheel = (e: WheelEvent) => {
            if (e.ctrlKey) {
                e.preventDefault()

                const zoomStep = 0.1
                const newScale = e.deltaY > 0
                    ? Math.max(0.25, scale - zoomStep)
                    : Math.min(16, scale + zoomStep)

                if (container && newScale !== scale) {
                    const rect = container.getBoundingClientRect()
                    const offsetX = (e.clientX - rect.left) / scale
                    const offsetY = (e.clientY - rect.top) / scale

                    setScale(newScale)

                    container.scrollLeft += offsetX * (newScale - scale)
                    container.scrollTop += offsetY * (newScale - scale)
                }
            }
        }

        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false })
            return () => container.removeEventListener('wheel', handleWheel)
        }
    }, [scale, setScale])

    return { containerRef, scale }
}
