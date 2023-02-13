import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import PageLoader from '@/components/PageLoader/PageLoader'
import Nav from '@/components/Nav/Nav'
import Footer from '@/components/Footer/Footer'
import './App.css'

const Home = lazy(() => import('@/pages/Home/Home'))
const Search = lazy(() => import('@/pages/Search/Search'))
const Error = lazy(() => import('@/pages/Error/Error'))

function App() {
    return (
        <>
            <Suspense fallback={<PageLoader />}>
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/error" element={<Error />} />
                    <Route path="*" element={<Error />} />
                </Routes>
                <Footer />
            </Suspense>
        </>
    )
}

export default App
