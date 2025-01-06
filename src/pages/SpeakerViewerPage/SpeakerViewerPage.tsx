import SpeakerViewer from '../../views/Viewers/SpeakerViewer/SpeakerViewer'

const SpeakerViewerPage = () => {
    // const location = useLocation()
    // const params = new URLSearchParams(location.search)
    // const fullscreen = params.get('fullscreen') == String(true)

    // useEffect(() => {
    //     if (fullscreen) {
    //         const enableFullscreen = async () => {
    //             const elem = document.documentElement
    //             try {
    //                 if (elem.requestFullscreen) await elem.requestFullscreen()
    //             } catch (error) {
    //                 console.error("Failed to enable fullscreen:", error)
    //             }
    //         }
    //         enableFullscreen()
    //     }
    // }, [fullscreen])
    return <SpeakerViewer />
}

export default SpeakerViewerPage