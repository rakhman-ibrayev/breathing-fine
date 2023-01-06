import * as THREE from 'three'
import atmosphereVertexShader from '@/components/Earth/shaders/atmosphere/vertex'
import atmosphereFragmentShader from '@/components/Earth/shaders/atmosphere/fragment'

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

export default Atmosphere