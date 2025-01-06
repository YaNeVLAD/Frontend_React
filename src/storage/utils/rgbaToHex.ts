const rgbaToHex = (r: number, g: number, b: number, a: number): string => {
    const blendWithWhite = (channel: number) => Math.round(channel * a + 255 * (1 - a))
    const toHex = (value: number) => blendWithWhite(value).toString(16).padStart(2, '0')
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export default rgbaToHex