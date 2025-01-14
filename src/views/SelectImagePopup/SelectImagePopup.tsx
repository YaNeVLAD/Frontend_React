import useImportImage from "../../components/ImageInput/hooks/useImportImage"
import useImageSearchApi from "../../hooks/useImageSearchApi"
import React, { useRef, useEffect, useState } from "react"
import Popup from "../../components/Popup/Popup"
import Tabs from "../../components/Tabs/Tabs"
import styles from "./SelectImagePopup.module.css"

type SelectImagePopupProps = {
    title?: string,
    setIsOpen: (open: boolean) => void,
    onImageLoad: (src: string) => void,
}

const UnsplashTab = "Unsplash Картинки"
const LoadImagesTab = "Загрузка"
const LinkImageTab = "Ссылка"

const SelectImagePopup = ({ title, setIsOpen, onImageLoad }: SelectImagePopupProps) => {
    const [tab, setTab] = useState(LoadImagesTab)

    const TabContent = () => {
        switch (tab) {
            case UnsplashTab:
                return <UnsplashImagesTabContent onImageSelect={onImageLoad} setIsOpen={setIsOpen} />
            case LoadImagesTab:
                return <LoadImagesTabContent onImageSelect={onImageLoad} setIsOpen={setIsOpen} />
            case LinkImageTab:
                return <LinkImageTabContent onImageSelect={onImageLoad} setIsOpen={setIsOpen} />
            default:
                return <></>
        }
    }

    return (
        <Popup
            closeAction={() => setIsOpen(false)}
            title={title || "Вставка изображения"}
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

type LinkImageTabContentProps = {
    setIsOpen: (open: boolean) => void,
    onImageSelect: (src: string) => void
}

const LinkImageTabContent = ({ setIsOpen, onImageSelect }: LinkImageTabContentProps) => {
    const [link, setLink] = useState("")
    const [error, setError] = useState("")
    const [previewSrc, setPreviewSrc] = useState("")

    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLink(e.target.value)
        setError("")
        setPreviewSrc("")
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (link) {
            const img = new Image()
            img.onload = () => {
                setPreviewSrc(link)
                setError("")
            }
            img.onerror = () => {
                setError("Ошибка загрузки изображения. Проверьте ссылку.")
                setPreviewSrc("")
            }
            img.src = link
        }
    }

    return (
        <>
            <header className={styles.popupHeader}>
                <form onSubmit={handleSubmit} className={styles.searchForm}>
                    <input
                        type="text"
                        name="query"
                        onChange={handleLinkChange}
                        placeholder="Вставьте ссылку на изображение"
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>
                        {'Найти'}
                    </button>
                </form>
            </header>
            {error && <p className={styles.errorMessage}>{error}</p>}
            {previewSrc && (
                <div className={styles.previewContainer}>
                    <img src={previewSrc} alt="Preview" className={styles.previewImage} />
                    <button
                        onClick={() => {
                            onImageSelect(previewSrc)
                            setIsOpen(false)
                        }}
                        className={styles.selectButton}
                    >
                        Выбрать изображение
                    </button>
                </div>
            )}
        </>
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

    const { fileInputRef, handleFileChange } = useImportImage(loadImage)

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragging(true)
    }

    const handleDragLeave = () => {
        setDragging(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragging(false)

        const file = e.dataTransfer.files[0]
        if (file && /\.(png|jpe?g|gif)$/i.test(file.name)) {
            const dataTransfer = new DataTransfer()
            dataTransfer.items.add(file)

            if (fileInputRef.current) {
                fileInputRef.current.files = dataTransfer.files
                handleFileChange()
            }
        } else {
            alert('Поддерживаются только файлы форматов .png, .jpeg, .jpg, .gif')
        }
    }

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`${styles.uploadContainer} ${dragging ? styles.dragging : ''}`}
        >
            <input
                ref={fileInputRef}
                type='file'
                accept='.png,.jpeg,.jpg,.gif'
                onChange={handleFileChange}
                className={styles.hiddenInput}
                id='fileInput'
            />
            <label htmlFor='fileInput' className={styles.uploadButton}>
                {'Обзор'}
            </label>
            <p className={styles.uploadText}>или перетащите файл сюда.</p>
        </div>
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
                        placeholder="Поиск в Unsplash Картинках"
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>
                        {'Найти'}
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