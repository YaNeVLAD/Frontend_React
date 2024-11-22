import { ViewModel } from "../storage/types"

function BASE_VIEWMODEL(): ViewModel {
    return {
        scale: 1,
        slideTheme: {
            background: { type: "solid", value: "#ffffff" }
        }
    }
}

export { BASE_VIEWMODEL }