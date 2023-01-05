import * as THREE from 'three'
import moment from 'moment'
import { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, GizmoHelper } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import globeVertexShader from '@/components/Earth/shaders/globe/vertex'
import globeFragmentShader from '@/components/Earth/shaders/globe/fragment'
import atmosphereVertexShader from '@/components/Earth/shaders/atmosphere/vertex'
import atmosphereFragmentShader from '@/components/Earth/shaders/atmosphere/fragment'
import globe2 from '@/assets/img/globe2.jpg'
import prismcap from '@/assets/img/prism-matcap2.jpg'
import './Earth.css'

// Prisms color palette
const colors = {
    hazardous: '#E763F9',
    veryUnhealthy: '#B982E1',
    unhealthy: '#B982E1',
    high: '#8BA1CA',
    moderate: '#5CC1B2',
    good: '#00FF83',
}

const Prism = ({ element, radius }) => {
    const prismRef = useRef()
    const matcapTexture = useLoader(TextureLoader, prismcap)
    const aqi = element.aqi

    // default properties
    const [properties, setProperties] = useState({
        height: 0,
        width: 0,
        color: colors.good,
        x: Math.cos((element.lat / 180) * Math.PI) * Math.sin((element.lon / 180) * Math.PI),
        y: Math.sin((element.lat / 180) * Math.PI),
        z: Math.cos((element.lat / 180) * Math.PI) * Math.cos((element.lon / 180) * Math.PI),
    })

    // Parameters of prisms
    const setParameters = () => {
        if (aqi === NaN || aqi === undefined || aqi === '-') return

        // sets width height and color of prism based on aqi
        setProperties((prevState) => ({
            ...prevState,
            height: Math.min(aqi / 1500, 0.13 + Math.random() * 0.1),
            width:
                aqi >= 301
                    ? 0.019
                    : aqi >= 201
                        ? 0.017
                        : aqi >= 151
                            ? 0.015
                            : aqi >= 101
                                ? 0.013
                                : aqi >= 51
                                    ? 0.012
                                    : 0.01,
            color:
                aqi >= 301
                    ? colors.hazardous
                    : aqi >= 201
                        ? colors.veryUnhealthy
                        : aqi >= 151
                            ? colors.unhealthy
                            : aqi >= 101
                                ? colors.high
                                : aqi >= 51
                                    ? colors.moderate
                                    : colors.good,
        }))
        prismRef.current.lookAt(0, 0, 0)

        // Custom properties for tooltip
        prismRef.current.name = element.station.name
        prismRef.current.aqi = aqi
        prismRef.current.time = element.station.time
    }

    // Displays tooltip
    const onPointerEnter = (e) => {
        const { name, aqi, time } = e.object
        document.querySelector('#tooltip-name').innerHTML = `Station: ${name}`
        document.querySelector('#tooltip-aqi').innerHTML = `${aqi} AQI (${aqi >= 301
            ? 'Hazardous'
            : aqi >= 201
                ? 'Very unhealthy'
                : aqi >= 151
                    ? 'Unhealthy'
                    : aqi >= 101
                        ? 'High'
                        : aqi >= 51
                            ? 'Moderate'
                            : 'Good'
            }) `
        document.querySelector('#tooltip-time').innerHTML = `updated at ${moment(
            time
        ).format('hh:mm A')}`
    }

    useEffect(setParameters, [])
    return (
        <mesh
            position={[
                radius * properties.x,
                radius * properties.y,
                radius * properties.z,
            ]}
            ref={prismRef}
            onPointerOver={onPointerEnter}
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

const Globe = ({ radius }) => {
    const globeTexture = useLoader(TextureLoader, globe2)
    return (
        <mesh rotation={[0, -Math.PI / 2, 0]}>
            <sphereGeometry args={[radius, 64, 64]} />
            <shaderMaterial
                receiveShadow
                attach='material'
                args={[
                    {
                        vertexShader: globeVertexShader,
                        fragmentShader: globeFragmentShader,
                        uniforms: {
                            globeTexture: { value: globeTexture },
                        },
                    },
                ]}
            />
        </mesh>
    )
}

const Atmosphere = ({ radius }) => {
    return (
        <mesh>
            <sphereGeometry args={[radius, 64, 64]} />
            <shaderMaterial
                attach='material'
                args={[
                    {
                        vertexShader: atmosphereVertexShader,
                        fragmentShader: atmosphereFragmentShader,
                        side: THREE.BackSide,
                        transparent: true,
                    },
                ]}
            />
        </mesh>
    )
}

const Model = ({ data }) => {
    const earthRef = useRef()
    const [radius, setRadius] = useState(
        window.innerWidth < 640
            ? window.innerWidth / 500
            : window.innerWidth < 768
                ? window.innerWidth / 600
                : Math.min(window.innerWidth / 1300, 1)
    )

    // Resize for responsive
    const onWindowResize = () => {
        const width = window.innerWidth
        setRadius(
            width < 640
                ? width / 500
                : width < 768
                    ? width / 600
                    : Math.min(width / 1300, 1)
        )
    }

    // Listener resize events
    useEffect(() => {
        addEventListener('resize', onWindowResize, false)

        return () => {
            removeEventListener('resize', onWindowResize, false)
        }
    }, [])

    useFrame(() => {
        earthRef.current.rotation.y += 0.0001
    })

    return (
        <group ref={earthRef}>
            <Globe radius={radius} />
            <Atmosphere radius={radius} />
            {data
                ? data.map(place =>
                    place.aqi > 50 && place.aqi !== '-'
                        ? <Prism key={place.uid} element={place} radius={radius} /> 
                        : null
                  ) 
                : null
            }
        </group>
    )
}

const Earth = ({ data }) => {
    return (
        <div className="earth">
            <Canvas
                orthographic
                camera={{
                    zoom: 250,
                    position: [0, 2, 5],
                }}>
                <GizmoHelper alignment="bottom-right" />
                <OrbitControls
                    dampingFactor={0.1}
                    enablePan={false}
                    rotateSpeed={0.5}
                    enableZoom={false}
                />
                <Suspense fallback={null}>
                    <Model data={data} />
                </Suspense>
            </Canvas>
        </div>
    )
}

export default Earth