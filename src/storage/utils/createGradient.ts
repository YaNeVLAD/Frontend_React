import { GradientColor } from "../types"

function createGradient(color: GradientColor): string {
    if (color.gradient.type == 'linear') {
        return `linear-gradient(${color.gradient.start + 90}deg, ${color.value
            .map((stop) => `${stop.color} ${stop.position}%`)
            .join(', ')})`
    }
    return `radial-gradient(circle at ${color.gradient.start}, ${color.value
        .map((stop) => `${stop.color} ${stop.position}%`)
        .join(', ')})`
}

export default createGradient