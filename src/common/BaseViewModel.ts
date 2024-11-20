import { ViewModel } from "../storage/types"
import { deepCopy } from "../storage/utils/deepCopy"

const BASE_VIEWMODEL: ViewModel = {
    scale: 1,
    slideTheme: {
        background: { type: "solid", value: "#ffffff" }
    }
}

const BaseViewModel = (): ViewModel => deepCopy(BASE_VIEWMODEL)

export { BaseViewModel }