import { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, GizmoHelper } from '@react-three/drei'
import { getAqiColor } from '@/utils/helpers'
import { getAqiVerdict } from '@/utils/helpers'
import Globe from './Globe'
import PointData from './PointData'
import Atmosphere from './Atmosphere'
import './Earth.css'

const Model = ({ data, setTooltipData, parentRef }) => {
    const modelRef = useRef()
    const [radius, setRadius] = useState(0)
    const [isMouseDown, setIsMouseDown] = useState(false)

    useEffect(() => {
        const handleWindowResize = () => {
            setRadius(parentRef?.current?.offsetWidth / 555)
        }

        handleWindowResize()

        window.addEventListener('resize', handleWindowResize)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [parentRef.current])

    useFrame(() => {
        modelRef.current.rotation.y += 0.00025
    })

    return (
        <group
            ref={modelRef}
            onPointerOver={event => event.stopPropagation()}
            onPointerDown={() => setIsMouseDown(true)}
            onPointerUp={() => setIsMouseDown(false)}
        >
            <Globe radius={radius} />
            <Atmosphere radius={radius} />
            {data
                ? data.map(place =>
                    place.aqi > 50 && place.aqi !== '-'
                        ? <PointData
                            key={place.uid}
                            element={place}
                            radius={radius}
                            setTooltipData={setTooltipData}
                            isMouseDown={isMouseDown}
                        />
                        : null
                )
                : null
            }
        </group>
    )
}

const ToolTip = ({ data }) => {
    return (
        <div className="earth-tooltip" style={data?.styles}>
            <p className="earth-tooltip__title">{data?.name}</p>
            <div className="flex justify-between align-start">
                <p className="earth-tooltip__aqi">{data?.aqi} <span>aqi</span></p>
                <p className="earth-tooltip__verdict" style={{ color: getAqiColor(data?.aqi) }}>
                    {getAqiVerdict(data?.aqi)}
                </p>
            </div>
        </div>
    )
}

const Earth = ({ data }) => {
    const earthRef = useRef()
    const [frameloop, setFrameloop] = useState('always')
    const [tooltipData, setTooltipData] = useState({})

    useEffect(() => {
        const observer = new window.IntersectionObserver(([ entry ]) => {
            if (entry.isIntersecting) {
                setFrameloop('always')
            } else {
                setFrameloop('demand')
            }
        }, {
            root: null,
            threshold: 0,
        })

        observer.observe(earthRef.current)
        return (() => { if (earthRef.current) observer.unobserve(earthRef.current) })
    }, [])

    return (
        <div ref={earthRef} className="earth">
            <Canvas
                frameloop={frameloop}
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
                    <Model
                        data={data}
                        setTooltipData={setTooltipData}
                        parentRef={earthRef}
                    />
                </Suspense>
            </Canvas>
            <ToolTip data={tooltipData} />
        </div>
    )
}

export default Earth