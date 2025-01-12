import { createPath, Route, RouteParams } from "../storage/utils/createPath"
import { NavigateOptions, useNavigate } from "react-router"

const useNavigateWithParams = () => {
    const navigate = useNavigate()

    return <Template extends string, Params extends RouteParams>(
        route: Route<Template, Params>,
        params: Params,
        options?: NavigateOptions,
    ) => {
        const path = createPath(route, params)
        navigate(path, options)
    }
}

export default useNavigateWithParams