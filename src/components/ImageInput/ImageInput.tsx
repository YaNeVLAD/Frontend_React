import style from "./ImageInput.module.css"
import useFileInput from "../../hooks/useImportImage"

type ImageInputProps = {
    onImageUpload: (data: string) => void
}

const ImageInput = ({ onImageUpload }: ImageInputProps) => {
    const { fileInputRef, handleFileChange } = useFileInput(onImageUpload)

    return (
        <div className={style.colorPickerWrapper}>
            <label className={style.colorPickerLabel}>Изображение</label>
            <label className={style.imageInputButton}>
                Обзор
                <input
                    className={style.hidden}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    type="file"
                    accept=".png, .jpeg, .jpg, .gif" />
            </label>
        </div>
    )
}

export default ImageInput