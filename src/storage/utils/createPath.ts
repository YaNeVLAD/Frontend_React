type RouteParams = Record<string, unknown>

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Route<UrlTemplate extends string, Params extends RouteParams = {}> = {
    url: UrlTemplate
    params?: Params
}

function createPath<UrlTemplate extends string, Params extends RouteParams>(
    route: Route<UrlTemplate, Params>,
    params: Params
): string {
    let path = route.url as string
    Object.keys(params).forEach((param) => {
        const paramPattern = `:${param}`
        if (path.includes(paramPattern)) {
            path = path.replace(paramPattern, String(params[param]))
        }
    })
    console.log(path)

    return path
}

const EditorRoute: Route<"/"> = {
    url: "/"
}

const SpeakerViewerRoute: Route<"/view/speaker/:id", { id: string }> = {
    url: "/view/speaker/:id",
}

const SpeakerNotesRoute: Route<"/view/speaker/:id/notes", { id: string }> = {
    url: "/view/speaker/:id/notes"
}

const PDFViewerRoute: Route<"/view/pdf/:id", { id: string }> = {
    url: "/view/pdf/:id"
}

const SlideShowRoute: Route<"/view/slide-show/:from", { from: number }> = {
    url: "/view/slide-show/:from"
}

export type {
    Route
}

export {
    type RouteParams,
    createPath,
    EditorRoute,
    SlideShowRoute,
    PDFViewerRoute,
    SpeakerNotesRoute,
    SpeakerViewerRoute,
}