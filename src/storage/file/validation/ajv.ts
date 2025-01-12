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
    type: objectAjv,
    properties: {
        type: { type: stringAjv, const: 'gradient' },
        value: { type: stringAjv },
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
        // Для типа "imageObj"
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
        // Для типа "textObj" (с учетом новых изменений)
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
                                    enum: [
                                        'Roboto-Bold',
                                        'Roboto-Regular',
                                        'Arial-Regular',
                                        'Montserrat-Bold',
                                        'Montserrat-Regular',
                                        'Montserrat-Bold-Italic',
                                        'Montserrat-Regular-Italic'
                                    ]
                                },
                                size: { type: numberAjv },
                                color: { type: stringAjv },
                                weight: {
                                    type: numberAjv,
                                    enum: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
                                }
                            },
                            required: ['family', 'size', 'color', 'weight'],
                            additionalProperties: false
                        },
                        alignment: {
                            type: objectAjv,
                            properties: {
                                horizontal: {
                                    type: stringAjv,
                                    enum: ['center', 'start', 'end']
                                },
                                vertical: {
                                    type: stringAjv,
                                    enum: ['center', 'start', 'end']
                                }
                            },
                            required: ['horizontal', 'vertical'],
                            additionalProperties: false
                        },
                        value: { type: stringAjv }
                    },
                    required: ['font', 'alignment', 'value'],
                    additionalProperties: false
                }
            },
            required: ['id', 'type', 'pos', 'size', 'turnAngle', 'placeholder', 'text'],
            additionalProperties: false
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
        selectedSlideId: { type: stringAjv, nullable: true },
        selectedObjectId: { type: stringAjv, nullable: true }
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