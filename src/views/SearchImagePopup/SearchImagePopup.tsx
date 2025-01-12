import useImageSearchApi from "../../hooks/useImageSearchApi"
import { useAppActions } from "../../hooks/useRedux"
import Popup from "../../components/Popup/Popup"
import { useRef, useEffect } from "react"
import styles from "./SearchImagePopup.module.css"

type SeachImagePopupProps = {
    selectedSlideId: string
    isOpen: boolean
    setIsOpen: (val: boolean) => void
}

const SeachImagePopup = ({ selectedSlideId, isOpen, setIsOpen }: SeachImagePopupProps) => {
    const { images, loading, handleSearch, loadMore } = useImageSearchApi()
    const imageGridRef = useRef<HTMLDivElement | null>(null)
    const { loadImage } = useAppActions()

    const onImageLoad = (src: string) => {
        loadImage(selectedSlideId, src)
        setIsOpen(false)
    }

    useEffect(() => {
        const handleScroll = () => {
            if (!imageGridRef.current) return
            const { scrollTop, scrollHeight, clientHeight } = imageGridRef.current
            if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
                loadMore()
            }
        }

        const grid = imageGridRef.current
        if (grid) grid.addEventListener('scroll', handleScroll)
        return () => grid?.removeEventListener('scroll', handleScroll)
    }, [loadMore, loading])

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const searchQuery = (e.target as HTMLFormElement).elements.namedItem('query') as HTMLInputElement
        handleSearch(searchQuery.value)
    }

    const calculateImageStyle = (img: { width: number; height: number }): React.CSSProperties => ({
        gridRowEnd: `span ${Math.ceil((img.height / img.width) * 10)}`,
    })

    return (
        isOpen && (
            <Popup
                closeAction={() => setIsOpen(false)}
                title="Вставка изображения"
                content={
                    <div className={styles.popupContainer}>
                        <header className={styles.popupHeader}>
                            <form onSubmit={onSubmit} className={styles.searchForm}>
                                <input
                                    type="text"
                                    name="query"
                                    placeholder="Поиск изображений..."
                                    className={styles.searchInput}
                                />
                                <button type="submit" className={styles.searchButton}>
                                    Найти
                                </button>
                            </form>
                        </header>
                        <div
                            ref={imageGridRef}
                            className={styles.imageGrid}
                        >
                            {images.map((img) => (
                                <img
                                    key={img.id}
                                    src={img.urls.small}
                                    alt={img.alt_description || 'Image'}
                                    onClick={() => onImageLoad(img.urls.regular)}
                                    style={calculateImageStyle(img)}
                                />
                            ))}
                        </div>
                        {loading && <div className={styles.loadingText}>Загрузка...</div>}
                    </div>
                }
            />
        )
    )
}

export default SeachImagePopup