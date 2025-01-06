import { useCallback, useState } from "react"
import { ACCESS_KEY } from "../../env.ts"

type UnsplashImage = {
    id: string
    urls: {
        small: string,
        full: string,
        regular: string,
    }
    alt_description: string | null,
    height: number,
    width: number,
}

const useImageSearchApi = () => {
    const [images, setImages] = useState<UnsplashImage[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [query, setQuery] = useState<string>('')
    const [page, setPage] = useState<number>(1)

    const fetchImages = async (newQuery: string, newPage: number = 1): Promise<void> => {
        if (!newQuery.trim()) return
        setLoading(true)
        try {
            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=${newQuery}&page=${newPage}&per_page=20`,
                {
                    headers: {
                        Authorization: `Client-ID ${ACCESS_KEY}`,
                    },
                }
            )
            const data = await response.json()
            const results: UnsplashImage[] = data.results

            if (newPage === 1) {
                setImages(results)
            } else {
                setImages((prev) => [...prev, ...results])
            }
            setHasMore(results.length > 0)
        } catch (error) {
            console.error('Error fetching images:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = useCallback((newQuery: string) => {
        setImages([])
        setQuery(newQuery)
        setPage(1)
        setHasMore(true)
        fetchImages(newQuery, 1)
    }, [])

    const loadMore = useCallback(() => {
        if (!loading && hasMore) {
            const nextPage = page + 1
            setPage(nextPage)
            fetchImages(query, nextPage)
        }
    }, [loading, hasMore, query, page])

    return { images, loading, hasMore, handleSearch, loadMore }
}

export default useImageSearchApi