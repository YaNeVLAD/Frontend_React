/* eslint-disable @typescript-eslint/no-explicit-any */
import { PresentationType, SelectionType } from "../types"

function parsePresentationFromJson(dataJson: string): PresentationType | null {
    const data = JSON.parse(dataJson)
    if (isPresentationType(data)) return data
    return null
}

function parseSelectionFromJson(dataJson: string): SelectionType | null {
    const data = JSON.parse(dataJson)
    if (isSelectionType(data)) return data
    return null
}

function isPresentationType(data: any): data is PresentationType {
    return data && typeof data === "object" && "slides" in data
}

function isSelectionType(data: any): data is SelectionType {
    return data && typeof data === "object" && "selectedSlide" in data
}

export {
    parsePresentationFromJson,
    parseSelectionFromJson,
}