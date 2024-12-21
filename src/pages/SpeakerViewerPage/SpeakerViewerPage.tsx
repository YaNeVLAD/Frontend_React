import { useParams } from "react-router"

type ViewerPageParams = {
    id: string
}

const ViewerPage = () => {
    const { id } = useParams<ViewerPageParams>()

    return (
        <>{id}</>
    )
}

export default ViewerPage