import React, { createContext, useState } from 'react'

type ZoomContextType = {
    scale: number
    setScale: (scale: number) => void,
}

const ZoomContext = createContext<ZoomContextType | undefined>(undefined)

const ZoomProvider: React.FC<{ children: JSX.Element[] }> = ({ children }) => {
    const [scale, setScale] = useState(1)
    return (
        <ZoomContext.Provider value={{ scale, setScale }}>
            {children}
        </ZoomContext.Provider>
    )
}

export {
    ZoomContext,
    ZoomProvider
}