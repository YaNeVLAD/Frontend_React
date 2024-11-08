/* eslint-disable @typescript-eslint/no-explicit-any */
import { PresentationType, SelectionType } from "../types"
import { validatePresentation, validateSelection } from "./validation/ajv"

function parsePresentationFromJson(dataJson: string): PresentationType | null {
    const data = JSON.parse(dataJson)
    if (validatePresentation(data)) return data
    return null
}

function parseSelectionFromJson(dataJson: string): SelectionType | null {
    const data = JSON.parse(dataJson)
    if (validateSelection(data)) return data
    return null
}

export {
    parsePresentationFromJson,
    parseSelectionFromJson,
}