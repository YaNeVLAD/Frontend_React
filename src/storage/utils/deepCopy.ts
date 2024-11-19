/* eslint-disable @typescript-eslint/no-explicit-any */
function deepCopy<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime()) as T
    }

    if (obj instanceof Map) {
        return new Map(Array.from(obj.entries()).map(([k, v]) => [deepCopy(k), deepCopy(v)])) as T
    }

    if (obj instanceof Set) {
        return new Set(Array.from(obj).map(item => deepCopy(item))) as T
    }

    const result: any = Array.isArray(obj) ? [] : {}

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key] = deepCopy(obj[key])
        }
    }

    return result
}

export { deepCopy }