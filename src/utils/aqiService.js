import { fetchWrapper } from './helpers'
const API_KEY = import.meta.env.VITE_AQI_CN_API_KEY
const BASE_URL = 'https://api.waqi.info'

export const getMapData = async () => {
    const jsonData = await fetchWrapper(
        `${BASE_URL}/v2/map/bounds?latlng=-90,-180,90,180&networks=official&token=${API_KEY}`
    )
    return jsonData.data
}

export const getCityDataByName = async (cityName) => {
    const jsonData = await fetchWrapper(`${BASE_URL}/feed/${cityName}/?token=${API_KEY}`)
    return jsonData.data
}

export const getCityDataByGeo = async (lat, lng) => {
    const jsonData = await fetchWrapper(`${BASE_URL}/feed/geo:${lat};${lng}/?token=${API_KEY}`)
    return jsonData.data
}