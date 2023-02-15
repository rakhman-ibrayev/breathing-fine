import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getCityDataByGeo, getCityDataByName } from '@/utils/aqiService'
import { getImageByKeyword } from '@/utils/unspashService'
import { getAqiColor, getAqiVerdict, getAqiVerdictDetails, getWeekDay } from '@/utils/helpers'
import PageLoader from '@/components/PageLoader/PageLoader'
import './Search.css'

const ChemicalStat = (props) => {
    const chemicalScalePercentage = 100 * props.value / props.maxValue

    return (
        <div className="chemical flex justify-between">
            <div className="flex column justify-between">
                <p className="chemical__value">{props.value || '-'}</p>
                <p className="chemical__name">{props.chemical}</p>
            </div>
            <div aria-hidden="true" className="chemical__scale">
                <div
                    className="chemical__scale-value"
                    style={{
                        height: `${chemicalScalePercentage}%`,
                        backgroundColor: getAqiColor(300 * chemicalScalePercentage / 100)
                    }}
                />
            </div>
        </div>
    )
}

const Chemicals = ({ iaqi }) => {
    const targetChemicals = [
        {
            id: 'pm25',
            renderTitle: 'PM2.5',
            maxValue: 500
        },
        {
            id: 'pm10',
            renderTitle: 'PM10',
            maxValue: 600
        },
        {
            id: 'so2',
            renderTitle: 'SO2',
            maxValue: 1.004
        },
        {
            id: 'no2',
            renderTitle: 'NO2',
            maxValue: 2.04
        },
        {
            id: 'co',
            renderTitle: 'CO',
            maxValue: 50
        },
        {
            id: 'o3',
            renderTitle: 'O3',
            maxValue: 0.374
        }
    ]
    const chemicals = useMemo(() => {
        return targetChemicals.map(chemical => {
            const value = iaqi[chemical.id] ? iaqi[chemical.id].v : 0
            return { ...chemical, value }
        })
    }, [iaqi])

    return (
        <>
            {chemicals.map(chemical =>
                <ChemicalStat
                    key={`chemical-stat-${chemical.id}`}
                    value={chemical.value}
                    chemical={chemical.renderTitle}
                    maxValue={chemical.maxValue}
                />
            )}
        </>
    )
}

const Search = () => {
    const [locationData, setLocationData] = useState(null)
    const [locationImage, setLocationImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const city = searchParams.get('city')

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchData = async () => {
            let location, image
            setIsLoading(true)

            if (lat && lng && city) {
                [location, image] = await Promise.all([
                    getCityDataByGeo(lat, lng),
                    getImageByKeyword(city)
                ])
            } else if (city) {
                [location, image] = await Promise.all([
                    getCityDataByName(city),
                    getImageByKeyword(city)
                ])
            }

            setLocationData(location)
            setLocationImage(image[0] || 0)
            setIsLoading(false)
        }

        fetchData().catch(error => {
            console.error(error)
            navigate('/error')
        })
    }, [lat, lng, city])

    if (!locationData || isLoading) {
        return (
            <main className="search-page">
                <PageLoader />
            </main>
        )
    }

    if (locationData === 'Unknown station') {
        return (
            <main className="search-page">
                <div className="container">
                    По вашему запросу не нашлось ни одной станции.
                </div>
            </main>
        )
    }

    return (
        <main className="search-page">
            <section>
                <div className="container flex column align-center justify-center">
                    <p className="city-heading">{city}</p>

                    <figure className="aqi-scale" style={{ backgroundColor: getAqiColor(locationData.aqi) }}>
                        <div className="aqi-scale__contents flex column align-center justify-center">
                            <h1>AQI</h1>
                            <h2 style={{ color: getAqiColor(locationData.aqi) }}>{locationData.aqi}</h2>
                            <h3>{getAqiVerdict(locationData.aqi)}</h3>
                        </div>
                    </figure>

                    <p className="aqi-level-description">{getAqiVerdictDetails(locationData.aqi)}</p>
                </div>
            </section>

            <section>
                <div className="widgets container grid">
                    <figure
                        className="widget location-image"
                        style={{ backgroundColor: getAqiColor(locationData.aqi) }}

                    >
                        {locationImage
                            ? <>
                                <img
                                    src={locationImage.urls.regular}
                                    alt={locationImage.alt_description}
                                    width="200px"
                                    height="200px"
                                />
                                <figcaption className="flex align-center">
                                    Фото от
                                    <a
                                        href={`https://unsplash.com/@${locationImage.user.username}`}
                                        alt={`ссылка на автора фотографии: ${locationImage.user.name}`}
                                        target="_blank" rel="noreferrer"
                                    >
                                        {` ${locationImage.user.name}`}
                                    </a>
                                </figcaption>
                            </>
                            : null
                        }
                    </figure>

                    <div className="widget chemicals grid">
                        <div className="calendar flex column align-center">
                            <p className="calendar__weekday">{getWeekDay(new Date(locationData.time.iso).getDay())}</p>
                            <p className="calendar__date">{new Date(locationData.time.iso).getDate()}</p>
                        </div>
                        <Chemicals iaqi={locationData.iaqi} />
                    </div>

                    <figure className="widget forecast flex column">
                        <figcaption className="forecast__heading">Прогноз среднего PM2.5</figcaption>
                        <div className="forecast__data flex">
                            {locationData.forecast.daily.pm25.map(dayForecast =>
                                <div key={dayForecast.day} className="forecast__item flex column align-center">
                                    <p
                                        className="forecast__value"
                                        style={{
                                            color: getAqiColor(dayForecast.avg)
                                        }}
                                    >
                                        {dayForecast.avg}
                                    </p>
                                    <div
                                        aria-hidden="true"
                                        className="forecast__graphical"
                                        style={{
                                            flexBasis: `${100 * dayForecast.avg / 500}%`,
                                            backgroundColor: getAqiColor(dayForecast.avg)
                                        }}
                                    />
                                    <p className="forecast__weekday">
                                        {getWeekDay(new Date(dayForecast.day).getDay())}
                                    </p>
                                </div>
                            )}
                        </div>
                    </figure>
                </div>
            </section>
        </main>
    )
}

export default Search