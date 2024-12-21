// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Route<Template extends string, Params extends Record<string, string | number> = {}> = {
    url: Template
    params?: Params
}

type EditorTemplate = '/'
type SpeakerViewerTemplate = '/view/s/:id'
type SpeakerNotesTemplate = '/view/s/:id/n'
type PDFViewerTemplate = '/view/pdf/:id'

type PresentationParams = { id: string | number }

function createPath<Template extends string, Params extends Record<string, string | number>>(
    route: Route<Template, Params>,
    params: Params
): string {
    console.log(params)

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

const SpeakerViewerRoute: Route<SpeakerViewerTemplate, PresentationParams> = {
    url: "/view/s/:id"
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
    createPath,
    EditorRoute,
    PDFViewerRoute,
    SpeakerNotesRoute,
    SpeakerViewerRoute,
}