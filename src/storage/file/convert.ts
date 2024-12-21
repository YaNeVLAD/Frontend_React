import { BackgroundType, PresentationType, SlideObjectType, SlideType } from '../types'
import { Color, PDFDocument, PDFPage, rgb } from 'pdf-lib'
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
    const page = doc.addPage([960, 540])

    await SlideBgToPDF(slide.background, doc, page)

    for (const object of slide.objects) {
        await ObjectToPDF(object, doc, page)
    }
}

async function SlideBgToPDF(background: BackgroundType, doc: PDFDocument, page: PDFPage) {
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
    }
}

async function ObjectToPDF(object: SlideObjectType, doc: PDFDocument, page: PDFPage) {
    const pageHeight = page.getHeight()

    if (object.type === 'textObj') {
        const fontBytes = await fetch('/fonts/Roboto-Regular.ttf').then(res => res.arrayBuffer())
        const font = await doc.embedFont(fontBytes)

        const pageY = pageHeight - object.pos.y - object.textSize
        page.drawText(object.value, {
            x: object.pos.x,
            y: pageY,
            size: object.textSize,
            color: hexToRgb(object.color),
            font,
        })
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

export {
    convertPresentationToPdf,
    exportPDF
}