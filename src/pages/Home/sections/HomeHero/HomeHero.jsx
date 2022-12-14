import { lazy, Suspense } from 'react'
import Section from '@/components/Section'
import SearchBar from '@/components/SearchBar/SearchBar'
import './HomeHero.css'

const Earth = lazy(() => import('@/components/Earth/Earth'))

const HomeHero = ({ mapData }) => {
    return (
        <Section id="main-aqi-search" className="home-hero">
            <Suspense>
                <Earth data={mapData} />
            </Suspense>
            <div className="home-hero__content flex column justify-center">
                <p className="home-hero__heading">
                    Как сильно загрязнён ваш воздух?
                </p>
                <h1 className="home-hero__dashed flex align-center">
                    <div aria-hidden="true"></div>
                    <span>Индекс <b>AQI</b>.</span>
                </h1>
                <p className="home-hero__description">
                    Индекс качества воздуха (AQI) в вашей
                    или ближайшей от вас локации.
                </p>
                <SearchBar
                    modifier="home-hero"
                    placeholder="Поиск локации..."
                />
            </div>
        </Section>
    )
}

export default HomeHero