import ImageInput from "../../components/ImageInput/ImageInput"
import useImageSearchApi from "../../hooks/useImageSearchApi"
import React, { useRef, useEffect, useState } from "react"
import Popup from "../../components/Popup/Popup"
import Tabs from "../../components/Tabs/Tabs"
import styles from "./SelectImagePopup.module.css"

type SelectImagePopupProps = {
    setIsOpen: (open: boolean) => void,
    onImageLoad: (src: string) => void,
}

const UnsplashTab = "Unsplash Картинки"
const LoadImagesTab = "Загрузка"
const LinkImageTab = "Ссылка"

const SelectImagePopup = ({ setIsOpen, onImageLoad }: SelectImagePopupProps) => {
    const [tab, setTab] = useState(LoadImagesTab)

    const TabContent = () => {
        switch (tab) {
            case UnsplashTab:
                return <UnsplashImagesTabContent onImageSelect={onImageLoad} setIsOpen={setIsOpen} />
            case LoadImagesTab:
                return <LoadImagesTabContent onImageSelect={onImageLoad} setIsOpen={setIsOpen} />
            case LinkImageTab:
                return <>124</>
            default:
                return <></>
        }
    }

    return (
        <Popup
            closeAction={() => setIsOpen(false)}
            title="Вставка изображения"
            content={
                <div className={styles.popupContainer}>
                    <Tabs
                        currentTab={tab}
                        setCurrentTab={setTab}
                        tabs={[LoadImagesTab, LinkImageTab, UnsplashTab]}
                    />
                    <TabContent />
                </div>
            }
        />
    )
}

type LoadImagesTabContentProps = {
    setIsOpen: (open: boolean) => void,
    onImageSelect: (src: string) => void
}

const LoadImagesTabContent = ({ setIsOpen, onImageSelect }: LoadImagesTabContentProps) => {
    const [dragging, setDragging] = useState(false)

    const loadImage = (src: string) => {
        onImageSelect(src)
        setIsOpen(false)
    }

    const handleDragOver = () => {
        setDragging(true)
    }

    const handleDragLeave = () => {
        setDragging(false)
    }

    const handleDrop = () => {
        setDragging(false)
    }

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`${styles.uploadContainer} ${dragging ? styles.dragging : ''}`}
        >
            <ImageInput
                type="custom"
                onImageUpload={loadImage}
            >
                <p className={styles.uploadButton}>
                    {'Обзор'}
                </p>
            </ImageInput>
            <p className={styles.uploadText}>или перетащите файл сюда.</p>
        </div >
    )
}

type UnsplashImagesTabContentProps = {
    setIsOpen: (open: boolean) => void,
    onImageSelect: (src: string) => void,
}

const UnsplashImagesTabContent = ({ setIsOpen, onImageSelect }: UnsplashImagesTabContentProps) => {
    const { images, loading, handleSearch, loadMore } = useImageSearchApi()
    const imageGridRef = useRef<HTMLDivElement | null>(null)

    const onImageLoad = (src: string) => {
        onImageSelect(src)
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
        <>
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
        </>
    )
}

export default SelectImagePopup