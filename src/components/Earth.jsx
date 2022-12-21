import { useEffect, useRef, useState } from 'react'
import Globe from 'react-globe.gl'
import landData from '@/datasets/land-data.json'
import earthBG from '@/assets/img/earthBG.svg'

const Earth = ({ widthPercentage }) => {
    const parentRef = useRef()
    const globeRef = useRef()
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        globeRef.current.controls().autoRotate = true
        globeRef.current.controls().autoRotateSpeed = 0.3

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

                atmosphereColor="#5f2fed"
                atmosphereAltitude={0.25}
            />
        </div>
    )
}

export default Earth