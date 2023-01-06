import { useEffect, useRef, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { getAqiColor } from '@/utils/helpers'
import pointDataCap from '@/assets/img/prism-matcap2.jpg'

const getDataWidth = (aqiLevel) => {
    let width = 0

    if (aqiLevel <= 50)
        width = 0.013
    else if (aqiLevel <= 100)
        width = 0.014
    else if (aqiLevel <= 200)
        width = 0.015
    else
        width = 0.016

    return width
}

const PointData = ({ element, radius, setTooltipData, isMouseDown }) => {
    const pointDataRef = useRef()
    const matcapTexture = useLoader(TextureLoader, pointDataCap)

    const properties = {
        height: element.aqi > 350 ? 0.14 : element.aqi / 1500,
        width: getDataWidth(element.aqi),
        color: getAqiColor(element.aqi),
        x: Math.cos((element.lat / 180) * Math.PI) * Math.sin((element.lon / 180) * Math.PI),
        y: Math.sin((element.lat / 180) * Math.PI),
        z: Math.cos((element.lat / 180) * Math.PI) * Math.cos((element.lon / 180) * Math.PI),
    }

    const onPointerEnter = (event) => {
        if (isMouseDown) return

        setTooltipData({
            name: element.station.name,
            aqi: element.aqi,
            styles: {
                visibility: 'visible',
                top: event.layerY + 25,
                left: event.layerX - 125
            }
        })
    }

    const onPointerLeave = () => {
        if (isMouseDown) return

        setTooltipData({
            name: element.station.name,
            aqi: element.aqi,
            styles: {
                visibility: 'hidden',
                top: 0,
                left: 0
            }
        })
    }

    useEffect(() => {
        pointDataRef.current.lookAt(0, 0, 0)
    }, [])

    return (
        <mesh
            position={[
                radius * properties.x,
                radius * properties.y,
                radius * properties.z,
            ]}
            ref={pointDataRef}
            onPointerOver={onPointerEnter}
            onPointerOut={onPointerLeave}
        >
            <boxGeometry
                args={[
                    radius * properties.width,
                    radius * properties.width,
                    radius * properties.height,
                ]}
            />
            <meshMatcapMaterial matcap={matcapTexture} color={properties.color} />
        </mesh>
    )
}

export default PointData