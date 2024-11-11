import { ZoomContext } from "../ZoomContext"
import { useContext } from "react"

export const useZoomContext = () => {
    const context = useContext(ZoomContext)
    if (!context) {
        throw new Error('useZoomContext must be used within a ZoomProvider')
    }
    return context
}