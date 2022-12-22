const API_KEY = import.meta.env.VITE_AQI_CN_API_KEY
const BASE_URL = 'https://api.waqi.info/v2'

export const getMapData = async () => {
    return await fetch(`${BASE_URL}/map/bounds?latlng=-90,-180,90,180&networks=official&token=${API_KEY}`)
}