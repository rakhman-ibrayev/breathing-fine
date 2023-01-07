import * as THREE from 'three'
import atmosphereVertexShader from './shaders/atmosphere/vertex'
import atmosphereFragmentShader from './shaders/atmosphere/fragment'

const Atmosphere = ({ radius }) => {
    return (
        <mesh>
            <sphereGeometry args={[radius, 35, 35]} />
            <shaderMaterial
                attach="material"
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

export default Atmosphere