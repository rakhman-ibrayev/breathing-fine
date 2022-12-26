import { Routes, Route, useNavigate } from 'react-router-dom'
import { lazy, Suspense, useEffect, useState } from 'react'
import { getMapData } from '@/utils/aqiService.js'
import Nav from '@/components/Nav/Nav'
import Footer from '@/components/Footer/Footer'
import './App.css'

const Home = lazy(() => import('@/pages/Home/Home'))
const Search = lazy(() => import('@/pages/Search/Search'))
const Error = lazy(() => import('@/pages/Error/Error'))

function App() {
    const [mapData, setMapData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getMapData()
            .then(res => res.json())
            .then(resObj => setMapData(resObj.data))
            .catch(() => navigate('/error'))
    }, [])

    return (
        <>
            <Nav />
            <Suspense>
                <Routes>
                    <Route path="/" element={<Home mapData={mapData} />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/error" element={<Error/>} />
                    <Route path="*" element={<Error/>} />
                </Routes>
            </Suspense>
            <Footer />
        </>
    )
}

export default App
