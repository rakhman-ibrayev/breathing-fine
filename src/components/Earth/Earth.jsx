import { useEffect, useRef, useState } from 'react'
import { getAqiVerdict } from '@/utils/helpers'
import Globe from 'react-globe.gl'
import landData from '@/datasets/land-data.json'
import earthBG from '@/assets/img/earthBG.svg'
import './Earth.css'

const Earth = ({ mapData, widthPercentage }) => {
    const parentRef = useRef()
    const globeRef = useRef()
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        if (globeRef.current) {
            globeRef.current.controls().enableZoom = false
            globeRef.current.controls().autoRotate = true
            globeRef.current.controls().autoRotateSpeed = 0.2
            globeRef.current.pointOfView({ lat: 37.6, lng: -16.6, altitude: 2 }, 4000)
        }

        const handleWindowResize = () => {
            const newWidth = parentRef.current.offsetWidth / 100 * widthPercentage
            const newHeight = newWidth
            setWidth(newWidth)
            setHeight(newHeight > 700 ? 700 : newHeight)
        }

        handleWindowResize()

        window.addEventListener('resize', handleWindowResize)

        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])

    const getDataColor = (aqiLevel) => {
        let color = ''

        if (aqiLevel <= 50)
            color = '#38d6beB3'
        else if (aqiLevel <= 100)
            color = '#4c3bd1B3'
        else if (aqiLevel <= 200)
            color = '#6e2ea6B3'
        else
            color = '#9704c4B3'

        return color
    }

    const getToolTip = (data) => {
        const verdictColor = getDataColor(data.aqi)

        return `
            <div class="earth-tooltip">
                <p class="earth-tooltip__title">${data.station.name}</p>
                <div class="flex justify-between align-start">
                    <p class="earth-tooltip__aqi">${data.aqi} <span>aqi</span></p>
                    <p class="earth-tooltip__verdict" style="color: ${verdictColor}">
                        ${getAqiVerdict(data.aqi)}
                    </p>
                </div>
            </div>
        `
    }

    return (
        <div className="canvas-animation" ref={parentRef}>
            <Globe
                ref={globeRef}
                width={width}
                height={height}
                backgroundColor="#090909"
                globeImageUrl={earthBG}
                animateIn={false}

                hexPolygonsData={landData.features}
                hexPolygonMargin={0.55}
                hexPolygonColor={() => '#cc69f0'}
                hexPolygonCurvatureResolution={1}

                pointsData={mapData}
                pointLat={place => { if (place.aqi !== '-') return place.lat }}
                pointLng={place => { if (place.aqi !== '-') return place.lon }}
                pointRadius={0.6}
                pointAltitude={place => (place.aqi < 275 ? place.aqi : 275) / 2500}
                pointColor={place => getDataColor(place.aqi)}
                pointsTransitionDuration={4000}
                pointLabel={place => getToolTip(place)}
                onPointHover={place => globeRef.current.controls().autoRotate = !place}

                atmosphereColor="#5f2fed"
                atmosphereAltitude={0.2}
            />
        </div>
    )
}

export default Earth