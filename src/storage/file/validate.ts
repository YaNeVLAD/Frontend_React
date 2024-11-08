import { PresentationType, SlideType, SlideStartContentType, BackgroundType, SolidColor, ImageSrc, GradientColor, SlideObjectType, PositionType } from '../types'
import Ajv, { JSONSchemaType } from 'ajv'

const ajv = new Ajv()

const positionTypeSchema: JSONSchemaType<PositionType> = {
    type: 'object',
    properties: {
        x: { type: 'number' },
        y: { type: 'number' },
    },
    required: ['x', 'y'],
    additionalProperties: false,
}

const solidColorSchema: JSONSchemaType<SolidColor> = {
    type: 'object',
    properties: {
        type: { type: 'string', const: 'solid' },
        value: { type: 'string' },
    },
    required: ['type', 'value'],
    additionalProperties: false,
}

const gradientColorSchema: JSONSchemaType<GradientColor> = {
    type: 'object',
    properties: {
        type: { type: 'string', const: 'gradient' },
        value: { type: 'array', items: { type: 'string' } },
    },
    required: ['type', 'value'],
    additionalProperties: false,
}

const imageSrcSchema: JSONSchemaType<ImageSrc> = {
    type: 'object',
    properties: {
        type: { type: 'string', const: 'image' },
        value: { type: 'string' },
    },
    required: ['type', 'value'],
    additionalProperties: false,
}

const backgroundTypeSchema: JSONSchemaType<BackgroundType> = {
    oneOf: [solidColorSchema, gradientColorSchema, imageSrcSchema],
}

const slideObjectTypeSchema: JSONSchemaType<SlideObjectType> = {
    oneOf: [
        {
            type: 'object',
            properties: {
                id: { type: 'string' },
                type: { type: 'string', const: 'imageObj' },
                pos: positionTypeSchema,
                size: {
                    type: 'object',
                    properties: {
                        width: { type: 'number' },
                        height: { type: 'number' },
                    },
                    required: ['width', 'height'],
                    additionalProperties: false,
                },
                turnAngle: { type: 'number' },
                src: imageSrcSchema,
            },
            required: ['id', 'type', 'pos', 'size', 'turnAngle', 'src'],
            additionalProperties: false,
        },
        {
            type: 'object',
            properties: {
                id: { type: 'string' },
                type: { type: 'string', const: 'textObj' },
                pos: positionTypeSchema,
                size: {
                    type: 'object',
                    properties: {
                        width: { type: 'number' },
                        height: { type: 'number' },
                    },
                    required: ['width', 'height'],
                    additionalProperties: false,
                },
                turnAngle: { type: 'number' },
                value: { type: 'string' },
                font: { type: 'string' },
                color: { type: 'string' },
                textSize: { type: 'number' },
            },
            required: ['id', 'type', 'pos', 'size', 'turnAngle', 'value', 'font', 'color', 'textSize'],
            additionalProperties: false,
        },
    ],
}

const slideTypeSchema: JSONSchemaType<SlideType> = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        startContentType: { type: 'string', enum: ['title', 'image', 'title&image', 'none'] as SlideStartContentType[] },
        objects: { type: 'array', items: slideObjectTypeSchema },
        background: backgroundTypeSchema,
    },
    required: ['id', 'startContentType', 'objects', 'background'],
    additionalProperties: false,
}

const presentationTypeSchema: JSONSchemaType<PresentationType> = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        slides: { type: 'array', items: slideTypeSchema },
    },
    required: ['title', 'slides'],
    additionalProperties: false,
}

const validatePresentation = ajv.compile(presentationTypeSchema)

export {
    validatePresentation
}