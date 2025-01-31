import { SELECTED_SLIDE_SCALE, WORKSPACE_SLIDE_OBJECT_SCALE } from "../../storage/constants"
import { useSelectedObject } from "../../hooks/useSelectedObject"
import { useSelectedSlide } from "../../hooks/useSelectedSlide"
import ScrollAreaWrapper from "./ScrollAreaWrapper/ScrollAreaWrapper"
import { Slide } from "../../components/Slide/Slide"
import style from "./WorkspaceArea.module.css"
import useImportImage from "../../components/ImageInput/hooks/useImportImage"
import { useAppActions } from "../../hooks/useRedux"
import { useEffect } from "react"

const WorkspaceArea = () => {
    const selectedSlide = useSelectedSlide()
    const selectedObject = useSelectedObject()
    const { loadImage } = useAppActions()

    const onImageDrop = (src: string) => loadImage(selectedSlide?.id || '', src)
    const { fileInputRef, handleFileChange } = useImportImage(onImageDrop)

    useEffect(() => {
        const handlePaste = (e: ClipboardEvent) => {
            if (!selectedSlide) return

            const clipboardItems = e.clipboardData?.items
            if (!clipboardItems) return

            for (const item of clipboardItems) {
                if (item.type.startsWith('image/')) {
                    const file = item.getAsFile()
                    if (file) {
                        const reader = new FileReader()
                        reader.onload = () => {
                            const src = reader.result as string
                            loadImage(selectedSlide.id, src)
                        }
                        reader.readAsDataURL(file)
                    }
                }
            }
        }

        window.addEventListener('paste', handlePaste)
        return () => window.removeEventListener('paste', handlePaste)
    }, [loadImage, selectedSlide])

    if (selectedSlide == undefined) return (<></>)

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()

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
        <>
            <ScrollAreaWrapper>
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className={style.workspaceArea}>
                    <div
                        className={style.workspaceSlideWrapper}>
                        <Slide
                            id={selectedSlide.id}
                            selectedObjectId={selectedObject?.id}
                            isSelected={false}
                            className={style.workspaceSlide}
                            scale={SELECTED_SLIDE_SCALE}
                            objectScale={WORKSPACE_SLIDE_OBJECT_SCALE} />
                    </div>
                </div>
            </ScrollAreaWrapper>
            <input
                ref={fileInputRef}
                type='file'
                accept='.png,.jpeg,.jpg,.gif'
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id='fileInput'
            />
        </>
    )
}

export default WorkspaceArea
