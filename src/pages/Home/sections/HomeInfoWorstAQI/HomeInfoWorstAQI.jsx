import { useMemo } from 'react'
import Section from '@/components/Section'
import Intro from '@/components/Intro/Intro'
import ShadowBox from '@/components/ShadowBox/ShadowBox'
import './HomeInfoWorstAQI.css'

const Top10Chart = ({ places }) => {
    const highestAQI = places[0] ? places[0].aqi : 500

    const getColor = (aqiLevel) => {
        let verdict = ''

        if (aqiLevel <= 50)
            verdict = '--green'
        else if (aqiLevel <= 100)
            verdict = '--yellow'
        else if (aqiLevel <= 150)
            verdict = '--orange'
        else
            verdict = '--red'

        return verdict
    }

    return (
        <div className="aqi-chart grid">
            {places.slice(0, 10).map(place =>
                <div
                    key={place.uid}
                    className="aqi-chart__item flex align-center"
                >
                    <div
                        className="aqi-chart__bar flex align-center"
                        style={{
                            width: `${90 * place.aqi / highestAQI}%`,
                            backgroundColor: `var(${getColor(place.aqi)})`,
                        }}
                    >
                        {place.station.name}
                    </div>
                    <p className="aqi-chart__value">{place.aqi}</p>
                </div>
            )}
        </div>
    )
}

const HomeInfoWorstAQI = ({ mapData }) => {
    const sortedPlaces = useMemo(() => {
        return [...mapData].sort((a, b) => b.aqi - a.aqi)
    }, [mapData])

    return (
        <Section id="worst-aqi" className="home-info-worst-aqi">
            <Intro
                smallText="Выше нормы"
                bigText="Худшие индексы AQI"
                infoSign="?"
            />
            <div className="home-info-worst-aqi__content flex column justify-between">
                <ShadowBox>
                    <hgroup className="home-info-pollution__description">
                        <h3>Индекс качества воздуха (AQI)</h3>
                        <p>
                            Согласно ВОЗ, индекс AQI выше 36.6 означает незначительные
                            риски для здоровья людей, чувствительных к качеству воздуха,
                            когда как при любом AQI выше 55.5 под риск подпадают все.
                        </p>
                    </hgroup>
                </ShadowBox>
                <Top10Chart places={sortedPlaces} />
            </div>
        </Section>
    )
}

export default HomeInfoWorstAQI