import { PresentationType, SlideType, SlideStartContentType, BackgroundType, SolidColor, ImageSrc, GradientColor, SlideObjectType, PositionType, SelectionType, SizeType } from '../../types'
import Ajv, { JSONSchemaType } from 'ajv'
import { arrayAjv, numberAjv, objectAjv, stringAjv } from './ajvTypes'

const ajv = new Ajv()

const positionTypeSchema: JSONSchemaType<PositionType> = {
    type: objectAjv,
    properties: {
        x: { type: numberAjv },
        y: { type: numberAjv },
    },
    required: ['x', 'y'],
    additionalProperties: false,
}

const sizeTypeSchema: JSONSchemaType<SizeType> = {
    type: objectAjv,
    properties: {
        width: { type: numberAjv },
        height: { type: numberAjv },
    },
    required: ['width', 'height'],
    additionalProperties: false,
}

const solidColorSchema: JSONSchemaType<SolidColor> = {
    type: objectAjv,
    properties: {
        type: { type: stringAjv, const: 'solid' },
        value: { type: stringAjv },
    },
    required: ['type', 'value'],
    additionalProperties: false,
}

const gradientColorSchema: JSONSchemaType<GradientColor> = {
    type: objectAjv,
    properties: {
        type: { type: stringAjv, const: 'gradient' },
        value: { type: arrayAjv, items: { type: stringAjv } },
    },
    required: ['type', 'value'],
    additionalProperties: false,
}

const imageSrcSchema: JSONSchemaType<ImageSrc> = {
    type: objectAjv,
    properties: {
        type: { type: stringAjv, const: 'image' },
        value: { type: stringAjv },
    },
    required: ['type', 'value'],
    additionalProperties: false,
}

const backgroundTypeSchema: JSONSchemaType<BackgroundType> = {
    oneOf: [solidColorSchema, gradientColorSchema, imageSrcSchema],
}

const slideObjectTypeSchema: JSONSchemaType<SlideObjectType> = {
    type: objectAjv,
    oneOf: [
        {
            type: objectAjv,
            properties: {
                id: { type: stringAjv },
                type: { type: stringAjv, const: 'imageObj' },
                pos: positionTypeSchema,
                size: sizeTypeSchema,
                turnAngle: { type: numberAjv },
                src: imageSrcSchema,
            },
            required: ['id', 'type', 'pos', 'size', 'turnAngle', 'src'],
            additionalProperties: false,
        },
        {
            type: objectAjv,
            properties: {
                id: { type: stringAjv },
                type: { type: stringAjv, const: 'textObj' },
                pos: positionTypeSchema,
                size: sizeTypeSchema,
                turnAngle: { type: numberAjv },
                value: { type: stringAjv },
                font: { type: stringAjv },
                color: { type: stringAjv },
                textSize: { type: numberAjv },
            },
            required: ['id', 'type', 'pos', 'size', 'turnAngle', 'value', 'font', 'color', 'textSize'],
            additionalProperties: false,
        },
    ],
}

const slideTypeSchema: JSONSchemaType<SlideType> = {
    type: objectAjv,
    properties: {
        id: { type: stringAjv },
        startContentType: { type: stringAjv, enum: ['title', 'image', 'title&image', 'none'] as SlideStartContentType[] },
        objects: { type: arrayAjv, items: slideObjectTypeSchema },
        background: backgroundTypeSchema,
    },
    required: ['id', 'startContentType', 'objects', 'background'],
    additionalProperties: false,
}

const presentationTypeSchema: JSONSchemaType<PresentationType> = {
    type: objectAjv,
    properties: {
        title: { type: stringAjv },
        slides: { type: arrayAjv, items: slideTypeSchema },
    },
    required: ['title', 'slides'],
    additionalProperties: false,
}

const selectionTypeSchema: JSONSchemaType<SelectionType> = {
    type: objectAjv,
    properties: {
        selectedSlide: slideTypeSchema,
        selectedObject: { ...slideObjectTypeSchema, nullable: true }
    },
    required: ['selectedSlide'],
    additionalProperties: false,
}

const validatePresentation = ajv.compile(presentationTypeSchema)
const validateSelection = ajv.compile(selectionTypeSchema)

export {
    validatePresentation,
    validateSelection
}