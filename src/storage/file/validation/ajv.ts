import { PresentationType, SlideType, BackgroundType, SolidColor, ImageSrc, GradientColor, SlideObjectType, PositionType, SelectionType, SizeType, SlidePreset } from '../../types'
import { arrayAjv, numberAjv, objectAjv, stringAjv } from './ajvTypes'
import Ajv, { JSONSchemaType } from 'ajv'

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
    type: 'object',
    properties: {
        type: { type: 'string', const: 'gradient' },
        gradient: {
            type: 'object',
            oneOf: [
                {
                    type: 'object',
                    properties: {
                        type: { type: 'string', const: 'linear' },
                        start: { type: 'number' },
                    },
                    required: ['type', 'start'],
                    additionalProperties: false,
                },
                {
                    type: 'object',
                    properties: {
                        type: { type: 'string', const: 'radial' },
                        start: {
                            type: 'string',
                            enum: ['center', 'top left', 'top right', 'bottom left', 'bottom right'],
                        },
                    },
                    required: ['type', 'start'],
                    additionalProperties: false,
                },
            ],
        },
        value: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    color: { type: 'string' },
                    position: { type: 'number' },
                },
                required: ['color', 'position'],
                additionalProperties: false,
            },
            minItems: 1,
        },
    },
    required: ['type', 'gradient', 'value'],
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
                placeholder: { type: stringAjv },
                text: {
                    type: objectAjv,
                    properties: {
                        font: {
                            type: objectAjv,
                            properties: {
                                family: {
                                    type: stringAjv,
                                    enum: ['Roboto', 'Montserrat'],
                                },
                                weight: {
                                    type: stringAjv,
                                    enum: ['Normal', 'Bold'],
                                },
                                style: {
                                    type: stringAjv,
                                    enum: ['Normal', 'Italic'],
                                },
                                size: { type: numberAjv },
                                color: { type: stringAjv },
                            },
                            required: ['family', 'weight', 'style', 'size', 'color'],
                            additionalProperties: false,
                        },
                        alignment: {
                            type: objectAjv,
                            properties: {
                                horizontal: {
                                    type: stringAjv,
                                    enum: ['center', 'start', 'end'],
                                },
                                vertical: {
                                    type: stringAjv,
                                    enum: ['center', 'start', 'end'],
                                },
                            },
                            required: ['horizontal', 'vertical'],
                            additionalProperties: false,
                        },
                        decoration: {
                            type: stringAjv,
                            enum: ['none', 'underline'],
                        },
                        value: { type: stringAjv },
                    },
                    required: ['font', 'alignment', 'decoration', 'value'],
                    additionalProperties: false,
                },
            },
            required: ['id', 'type', 'pos', 'size', 'turnAngle', 'placeholder', 'text'],
            additionalProperties: false,
        },
    ],
}

const slideTypeSchema: JSONSchemaType<SlideType> = {
    type: objectAjv,
    properties: {
        id: { type: stringAjv },
        preset: { type: stringAjv, enum: ['image', 'title', 'title&image', 'none', 'title&text'] as SlidePreset[] },
        objects: { type: arrayAjv, items: slideObjectTypeSchema },
        background: backgroundTypeSchema,
        note: { type: stringAjv }
    },
    required: ['id', 'preset', 'objects', 'background', 'note'],
    additionalProperties: false,
}

const presentationTypeSchema: JSONSchemaType<PresentationType> = {
    type: objectAjv,
    properties: {
        title: { type: stringAjv },
        slides: { type: arrayAjv, items: slideTypeSchema },
        id: { type: stringAjv },
        author: { type: stringAjv },
    },
    required: ['title', 'slides', 'id', 'author'],
    additionalProperties: false,
}

const selectionTypeSchema: JSONSchemaType<SelectionType> = {
    type: objectAjv,
    properties: {
        selectedSlideIds: { type: arrayAjv, items: { type: stringAjv }, nullable: true },
        selectedObjectId: { type: stringAjv, nullable: true },
    },
    required: [],
    additionalProperties: false,
}

const validatePresentation = ajv.compile(presentationTypeSchema)
const validateSelection = ajv.compile(selectionTypeSchema)

export {
    validatePresentation,
    validateSelection
}