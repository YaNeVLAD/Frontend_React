import useImageSearchApi from "../../hooks/useImageSearchApi"
import { useAppActions } from "../../hooks/useRedux"
import Popup from "../../components/Popup/Popup"
import { useRef, useEffect } from "react"
import styles from "./SearchImagePopup.module.css"

type SeachImagePopupProps = {
    selectedSlideId: string,
    isOpen: boolean,
    setIsOpen: (val: boolean) => void
}

const SeachImagePopup = ({ selectedSlideId, isOpen, setIsOpen }: SeachImagePopupProps) => {
    const { images, loading, handleSearch, loadMore } = useImageSearchApi()
    const imageGridRef = useRef<HTMLDivElement | null>(null)
    const { addObject } = useAppActions()

    const addImage = (src: string) => {
        addObject(selectedSlideId, 'imageObj', src)
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

        if (grid) {
            grid.addEventListener('scroll', handleScroll)
        }

        return () => {
            if (grid) {
                grid.removeEventListener('scroll', handleScroll)
            }
        }
    }, [loadMore, loading])

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const searchQuery = (e.target as HTMLFormElement).elements.namedItem('query') as HTMLInputElement
        handleSearch(searchQuery.value)
    }

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
                        <div ref={imageGridRef} className={styles.imageGrid}>
                            {images.map((img) => (
                                <img
                                    key={img.id}
                                    src={img.urls.small}
                                    alt={img.alt_description || 'Image'}
                                    className={styles.image}
                                    onClick={() => addImage(img.urls.small)}
                                />
                            ))}
                            {loading && <div className={styles.loadingText}>Загрузка...</div>}
                        </div>
                    </div>
                }
            />
        )
    )
}

export default SeachImagePopup