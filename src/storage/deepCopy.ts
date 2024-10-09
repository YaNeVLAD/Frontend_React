/* eslint-disable @typescript-eslint/no-explicit-any */
function deepCopy<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
        return obj
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