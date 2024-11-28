import { ViewModel } from "../storage/types"

function BASE_VIEWMODEL(): ViewModel {
    return {
        slideTheme: {
            background: { type: "solid", value: "#ffffff" }
        }
    }
}

export { BASE_VIEWMODEL }