import SpeakerViewer from '../../views/Viewers/SpeakerViewer/SpeakerViewer'
import useFakePresentationFetch from '../useFakePresentationFetch'
import { PresentationType } from '../../storage/types'
import { useParams } from 'react-router'
import { useState } from 'react'

type ViewerPageParams = {
    id: string
}

const SpeakerViewerPage = () => {
    const { id } = useParams<ViewerPageParams>()
    const [presentation, setPresentation] = useState<PresentationType | null>(null)

    useFakePresentationFetch(id, setPresentation)

    if (!presentation) return <div>Загрузка...</div>

    return (
        <SpeakerViewer />
    )
}

export default SpeakerViewerPage