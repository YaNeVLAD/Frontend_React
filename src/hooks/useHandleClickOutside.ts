import { useEffect } from "react"

const useHandleClickOutside = (
    ref: React.RefObject<HTMLElement>,
    onClickOutside: () => void,
) => {
    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            onClickOutside()
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)

        return () => document.removeEventListener('click', handleClickOutside)
    })
}

export default useHandleClickOutside