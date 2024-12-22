import { IconComponent } from "../common/IconComponent"
import useImportImage from "./hooks/useImportImage"
import style from "./ImageInput.module.css"

type CustomImageInput = {
    type: 'custom'
    children: JSX.Element,
    onImageUpload: (base64: string) => void
}

type ImageInputProps = CustomImageInput | {
    type: 'default'
    labelIcon?: IconComponent
    labelText?: string,
    labelClassName?: string,
    onImageUpload: (data: string) => void
}

const ImageInput = ({ ...props }: ImageInputProps) => {
    const { fileInputRef, handleFileChange } = useImportImage(props.onImageUpload)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileChange()
        e.target.value = ''
    }

    const openInput = () => fileInputRef?.current?.click()

    switch (props.type) {
        case 'default':
            return (
                <label className={props.labelClassName || style.imageInputButton}>
                    {props.labelIcon}
                    {props.labelText || "Выбрать изображение"}
                    <input
                        className={style.hidden}
                        ref={fileInputRef}
                        onChange={onChange}
                        type="file"
                        accept=".png, .jpeg, .jpg, .gif" />
                </label>
            )

        case 'custom':
            return (
                <label className={style.customLabel} onClick={openInput}>
                    {props.children}
                    <input
                        className={style.hidden}
                        ref={fileInputRef}
                        onChange={onChange}
                        type="file"
                        accept=".png, .jpeg, .jpg, .gif" />
                </label>
            )
    }
}

export default ImageInput