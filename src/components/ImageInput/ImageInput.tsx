import useImportImage from "./hooks/useImportImage"
import style from "./ImageInput.module.css"

type ImageInputProps = {
    labelIcon?: () => JSX.Element
    labelText?: string,
    labelClassName?: string,
    onImageUpload: (data: string) => void
}

const ImageInput = ({ labelText, labelIcon, labelClassName, onImageUpload }: ImageInputProps) => {
    const { fileInputRef, handleFileChange } = useImportImage(onImageUpload)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileChange()
        e.target.value = ''
    }

    return (
        <label className={labelClassName || style.imageInputButton}>
            {labelIcon ? labelIcon() : <></>}
            {labelText || "Найти изображение"}
            <input
                className={style.hidden}
                ref={fileInputRef}
                onChange={onChange}
                type="file"
                accept=".png, .jpeg, .jpg, .gif" />
        </label>
    )
}

export default ImageInput