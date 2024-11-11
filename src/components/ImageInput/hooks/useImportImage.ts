import { useRef, useCallback } from 'react'

const useImportImage = (callback: (base64String: string) => void) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleFileChange: () => void = useCallback(() => {
        const file = fileInputRef.current?.files?.[0]
        if (!file) return

        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
        if (!allowedTypes.includes(file.type)) {
            alert('Unsupported file type.')
            return
        }

        const reader = new FileReader()
        reader.onload = () => {
            const base64String = reader.result as string
            callback(base64String)
        }
        reader.onerror = (error) => {
            alert('Error converting file to base64: ' + error)
        }

        reader.readAsDataURL(file)
    }, [callback])

    return { fileInputRef, handleFileChange }
}

export default useImportImage
