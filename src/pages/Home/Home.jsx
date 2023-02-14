import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getMapData } from '@/utils/aqiService.js'

import HomeHero from './sections/HomeHero/HomeHero'
import HomeInfoPollution from './sections/HomeInfoPollution/HomeInfoPollution'
import HomeInfoWorstAQI from './sections/HomeInfoWorstAQI/HomeInfoWorstAQI'
import HomeInfoHarm from './sections/HomeInfoHarm/HomeInfoHarm'
import HomeComparison from './sections/HomeComparison/HomeComparison'
import HomeInfoReferences from './sections/HomeInfoReferences/HomeInfoReferences'

import './Home.css'

const Home = () => {
    const [mapData, setMapData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getMapData()
            .then(resData => setMapData(resData))
            .catch(() => navigate('/error'))
    }, [])

    return (
        <main className="home-page">
            <HomeHero mapData={mapData} />
            <HomeInfoPollution />
            <HomeInfoWorstAQI mapData={mapData} />
            <HomeInfoHarm />
            <HomeComparison />
            <HomeInfoReferences />
        </main>
    )
}

export default Home