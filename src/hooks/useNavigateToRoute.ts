import { createPath, Route, RouteParams } from "../storage/utils/createPath"
import { useNavigate } from "react-router"

const useNavigateWithParams = () => {
    const navigate = useNavigate()

    return <Template extends string, Params extends RouteParams>(
        route: Route<Template, Params>,
        params: Params
    ) => {
        const path = createPath(route, params)
        navigate(path)
    }
}

export default useNavigateWithParams