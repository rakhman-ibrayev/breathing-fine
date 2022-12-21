import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Nav from '@/components/Nav/Nav'
import './App.css'

const Home = lazy(() => import('@/pages/Home/Home'))
const Search = lazy(() => import('@/pages/Search/Search'))

function App() {

    return (
        <>
            <Nav />
            <Suspense>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
            </Suspense>
        </>
    )
}

export default App
