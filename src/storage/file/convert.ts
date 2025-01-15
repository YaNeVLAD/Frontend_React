import { BackgroundType, Font, PresentationType, SlideObjectType, SlideType } from '../types'
import { Color, PDFDocument, PDFPage, rgb } from 'pdf-lib'
import { SLIDE_WIDTH, SLIDE_HEIGHT } from '../constants'
import imageToPng from '../utils/imageToPng'
import fontkit from '@pdf-lib/fontkit'

async function convertPresentationToPdf(
    presentation: PresentationType
): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create()
    pdfDoc.registerFontkit(fontkit)

    await PresentationToPDF(pdfDoc, presentation)

    return await pdfDoc.save()
}

async function exportPDF(presentation: PresentationType) {
    const pdfBytes = await convertPresentationToPdf(presentation)
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${presentation.title}.pdf`
    link.click()
}

async function PresentationToPDF(doc: PDFDocument, presentation: PresentationType) {
    doc.setTitle(presentation.title)
    doc.setAuthor(presentation.author)
    doc.setCreationDate(new Date)
    doc.setModificationDate(new Date)

    for (const slide of presentation.slides) {
        await SlideToPDF(slide, doc)
    }
}

async function SlideToPDF(slide: SlideType, doc: PDFDocument) {
    const page = doc.addPage([SLIDE_WIDTH, SLIDE_HEIGHT])

    await SlideBackgroundToPDF(slide.background, doc, page)

    for (const object of slide.objects) {
        await ObjectToPDF(object, doc, page)
    }
}

async function SlideBackgroundToPDF(background: BackgroundType, doc: PDFDocument, page: PDFPage) {
    if (background.type == 'solid') {
        page.drawRectangle({
            x: 0,
            y: 0,
            width: page.getWidth(),
            height: page.getHeight(),
            color: hexToRgb(background.value),
        })
    } else if (background.type == 'image') {
        const imgBase64 = await imageToPng(background.value)
        const image = await doc.embedPng(imgBase64)
        page.drawImage(image, {
            x: 0,
            y: 0,
            width: page.getWidth(),
            height: page.getHeight(),
        })
    } else if (background.type == 'gradient') {
        if (background.type == 'gradient') {
            const canvas = document.createElement('canvas')
            canvas.width = page.getWidth()
            canvas.height = page.getHeight()
            const ctx = canvas.getContext('2d')

            if (ctx) {
                let gradient: CanvasGradient
                if (background.gradient.type === 'linear') {
                    const angleRad = (background.gradient.start * Math.PI) / 180
                    const x1 = 0.5 * (1 + Math.cos(angleRad)) * canvas.width
                    const y1 = 0.5 * (1 + Math.sin(angleRad)) * canvas.height
                    const x2 = canvas.width - x1
                    const y2 = canvas.height - y1
                    gradient = ctx.createLinearGradient(x1, y1, x2, y2)
                } else if (background.gradient.type === 'radial') {
                    let x = canvas.width / 2
                    let y = canvas.height / 2

                    switch (background.gradient.start) {
                        case 'top left':
                            x = 0
                            y = 0
                            break
                        case 'top right':
                            x = canvas.width
                            y = 0
                            break
                        case 'bottom left':
                            x = 0
                            y = canvas.height
                            break
                        case 'bottom right':
                            x = canvas.width
                            y = canvas.height
                            break
                    }

                    gradient = ctx.createRadialGradient(x, y, 0, x, y, Math.max(canvas.width, canvas.height))
                }

                background.value.forEach((colorStop) => {
                    gradient.addColorStop(colorStop.position / 100, colorStop.color)
                })

                ctx.fillStyle = gradient
                ctx.fillRect(0, 0, canvas.width, canvas.height)

                const imgBase64 = canvas.toDataURL('image/png').split(',')[1]
                const image = await doc.embedPng(imgBase64)
                page.drawImage(image, {
                    x: 0,
                    y: 0,
                    width: page.getWidth(),
                    height: page.getHeight(),
                })
            }
        }
    }
}

async function ObjectToPDF(object: SlideObjectType, doc: PDFDocument, page: PDFPage) {
    const pageHeight = page.getHeight()

    if (object.type === 'textObj') {
        const fontBytes = await fetch(`/fonts/${generateFontFileName(object.text.font)}`).then(res => res.arrayBuffer())
        const font = await doc.embedFont(fontBytes)

        const areaWidth = object.size.width
        const areaHeight = object.size.height

        const textHeight = object.text.font.size

        const lines: string[] = []
        let currentLine = ''
        const maxWidth = areaWidth - 2 * 10
        const words = object.text.value.split(' ')

        for (let i = 0; i < words.length; i++) {
            const currentWord = words[i] || ''

            const testLine = currentLine ? `${currentLine} ${currentWord}` : currentWord

            const lineWidth = font.widthOfTextAtSize(testLine, object.text.font.size)

            if (lineWidth < maxWidth) {
                currentLine = testLine
            } else {
                if (currentLine) {
                    lines.push(currentLine)
                }
                currentLine = currentWord
            }
        }
        if (currentLine) lines.push(currentLine)

        const pageY = pageHeight - object.pos.y - areaHeight

        const totalTextHeight = lines.length * textHeight
        let y = pageY

        if (object.text.alignment.vertical === 'center') {
            y = pageY + (areaHeight - totalTextHeight) / 2
        } else if (object.text.alignment.vertical === 'start') {
            y = pageY + (areaHeight - totalTextHeight)
        }

        if (lines.length == 0) return

        let x = object.pos.x
        const lineWidth = font.widthOfTextAtSize(lines[0], object.text.font.size)

        if (object.text.alignment.horizontal === 'center') {
            x = object.pos.x + (areaWidth - lineWidth) / 2
        } else if (object.text.alignment.horizontal === 'end') {
            x = object.pos.x + (areaWidth - lineWidth)
        }

        for (let i = 0; i < lines.length; i++) {
            const textLine = lines[i] || ''

            page.drawText(textLine, {
                x,
                y: y + i * textHeight,
                size: object.text.font.size,
                color: hexToRgb(object.text.font.color),
                font,
            })
        }
    } else if (object.type === 'imageObj') {
        const imgBase64 = await imageToPng(object.src.value)
        const image = await doc.embedPng(imgBase64)

        const pageY = pageHeight - object.pos.y - object.size.height
        page.drawImage(image, {
            x: object.pos.x,
            y: pageY,
            width: object.size.width,
            height: object.size.height,
        })
    }
}

function hexToRgb(hex: string): Color {
    const result = /^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i.exec(hex)
    if (result) {
        return rgb(
            parseInt(result[1], 16) / 255,
            parseInt(result[2], 16) / 255,
            parseInt(result[3], 16) / 255,
        )
    }
    return rgb(0, 0, 0)
}

const generateFontFileName = (font: Font): string => {
    const weight = font.weight == 'Bold' ? 'Bold' : 'Regular'
    const style = font.style == 'Italic' ? '-Italic' : ''
    return `${font.family}-${weight}${style}.ttf`
}

export {
    convertPresentationToPdf,
    exportPDF
}