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

                const zoomStep = scale * 0.25
                const newScale = e.deltaY > 0
                    ? Math.max(0.25, scale - zoomStep)
                    : Math.min(16, scale + zoomStep)

                if (container && newScale !== scale) {
                    const rect = container.getBoundingClientRect()
                    const offsetX = (e.clientX - rect.x) / scale
                    const offsetY = (e.clientY - rect.y) / scale

                    setScale(newScale)
                    container.scrollLeft += offsetX * (newScale - scale) * scale
                    container.scrollTop += offsetY * (newScale - scale) * scale
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
