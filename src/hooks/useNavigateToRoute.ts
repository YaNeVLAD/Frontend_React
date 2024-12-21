import { createPath, Route } from "../storage/utils/createPath"
import { useNavigate } from "react-router"

const useNavigateWithParams = () => {
    const navigate = useNavigate()

    return <Template extends string, Params extends Record<string, string | number>>(
        route: Route<Template, Params>,
        params: Params
    ) => {
        const path = createPath(route, params)
        navigate(path)
    }
}

export default useNavigateWithParams