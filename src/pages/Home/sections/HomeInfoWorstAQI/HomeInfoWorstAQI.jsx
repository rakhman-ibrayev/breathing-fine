import { useMemo } from 'react'
import Section from '@/components/Section'
import Intro from '@/components/Intro/Intro'
import ShadowBox from '@/components/ShadowBox/ShadowBox'
import './HomeInfoWorstAQI.css'

const ChartItem = ({ entry, highestAQI, bgColor }) => {
    const stationName = useMemo(
        () => entry.station.name.slice(0, entry.station.name.indexOf(',')),
        [entry.station.name]
    )

    return (
        <div className={`aqi-chart__item flex align-center`}>
            <a
                href={`https://aqicn.org/search/#q=${stationName}`}
                alt={`Ссылка на поиск станции ${stationName} на оф. сайте aqicn`}
                target="_blank" rel="noreferrer"
                className="aqi-chart__bar flex align-center"
                style={{
                    width: `${100 * entry.aqi / highestAQI}%`,
                    backgroundColor: bgColor
                }}
            >
                {stationName}
            </a>
            <p className="aqi-chart__value">{entry.aqi}</p>
        </div>
    )
}

const Top10Chart = ({ places }) => {
    const highestAQI = places[0] ? places[0].aqi : 500

    const getColor = (aqiLevel) => {
        let verdict = ''

        if (aqiLevel <= 50)
            verdict = '--green'
        else if (aqiLevel <= 200)
            verdict = '--yellow'
        else if (aqiLevel <= 250)
            verdict = '--orange'
        else
            verdict = '--red'

        return verdict
    }

    return (
        <div className="aqi-chart grid">
            <div className="aqi-chart__title flex align-center center-margin">
                <p>
                    Ссылки на <a
                        href="https://aqicn.org/sources/"
                        alt="ссылка на оф. сайт aqicn - источник данных"
                        target="_blank" rel="noreferrer"
                    >
                        мониторы станций AQICN
                    </a> с худшими индексами AQI в мире.
                </p>
            </div>
            {places.slice(0, 10).map(place =>
                <ChartItem 
                    key={place.uid}
                    entry={place}
                    highestAQI={highestAQI}
                    bgColor={`var(${getColor(place.aqi)})`}
                />
            )}
        </div>
    )
}

const HomeInfoWorstAQI = ({ mapData }) => {
    const sortedPlaces = useMemo(() => {
        return [...mapData].sort((a, b) => {
            if (a.aqi === '-' || b.aqi === '-') return
            return b.aqi - a.aqi
        })
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