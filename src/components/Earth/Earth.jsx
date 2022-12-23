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
        globeRef.current.controls().autoRotate = true
        globeRef.current.controls().autoRotateSpeed = 0.2

        const parent = parentRef.current.parentElement

        const handleWindowResize = () => {
            const newWidth = parent.offsetWidth / 100 * widthPercentage
            const newHeight = newWidth * 1.15
            setWidth(newWidth - 10)
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
        else
            color = '#6e2ea6B3'

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

                hexPolygonsData={landData.features}
                hexPolygonMargin={0.55}
                hexPolygonColor={() => '#cc69f0'}

                pointsData={mapData}
                pointLat={place => place.lat}
                pointLng={place => place.lon}
                pointRadius={0.6}
                pointAltitude={place => place.aqi / 2000}
                pointColor={place => getDataColor(place.aqi)}
                pointsTransitionDuration={4000}
                pointLabel={place => getToolTip(place)}
                onPointHover={place => globeRef.current.controls().autoRotate = !place}

                atmosphereColor="#5f2fed"
                atmosphereAltitude={0.3}
            />
        </div>
    )
}

export default Earth