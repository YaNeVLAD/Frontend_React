const imageToPng = async (base64: string): Promise<string> => {
    const img = new Image()
    img.src = base64

    return new Promise<string>((resolve, reject) => {
        img.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            if (!ctx) return

            canvas.width = img.width
            canvas.height = img.height

            ctx.drawImage(img, 0, 0)

            const pngDataUrl = canvas.toDataURL('image/png')
            resolve(pngDataUrl)
        }

        img.onerror = (error) => {
            reject(error)
        }
    })
}

export default imageToPng