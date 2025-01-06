type RouteParams = Record<string, unknown>

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Route<Template extends string, Params extends RouteParams = {}> = {
    url: Template
    params?: Params
}

type EditorTemplate = '/'
type SpeakerViewerTemplate = '/view/s/:id/:fullscreen'
type SpeakerNotesTemplate = '/view/s/:id/n'
type PDFViewerTemplate = '/view/pdf/:id'

type SpeakerViewerParams = { id: string | number, fullscreen: boolean }
type PresentationParams = { id: string | number }

function createPath<Template extends string, Params extends RouteParams>(
    route: Route<Template, Params>,
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

const EditorRoute: Route<EditorTemplate> = {
    url: "/"
}

const SpeakerViewerRoute: Route<SpeakerViewerTemplate, SpeakerViewerParams> = {
    url: "/view/s/:id/:fullscreen"
}

const SpeakerNotesRoute: Route<SpeakerNotesTemplate, PresentationParams> = {
    url: "/view/s/:id/n"
}

const PDFViewerRoute: Route<PDFViewerTemplate, PresentationParams> = {
    url: "/view/pdf/:id"
}

export type {
    Route
}

export {
    type RouteParams,
    createPath,
    EditorRoute,
    PDFViewerRoute,
    SpeakerNotesRoute,
    SpeakerViewerRoute,
}