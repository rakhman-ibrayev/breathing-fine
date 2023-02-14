import { fetchWrapper } from './helpers'
const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY
const BASE_URL = 'https://api.unsplash.com/search/photos'

export const getImageByKeyword = async (keyword) => {
    const jsonData = await fetchWrapper(
        `${BASE_URL}?query=${keyword}&per_page=1&client_id=${API_KEY}`
    )
    return jsonData.results
}