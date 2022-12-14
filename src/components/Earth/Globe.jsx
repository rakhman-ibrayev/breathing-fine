import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import globeVertexShader from './shaders/globe/vertex'
import globeFragmentShader from './shaders/globe/fragment'
import globeBackground from '@/assets/img/globe2.jpg'

const Globe = ({ radius }) => {
    const globeTexture = useLoader(TextureLoader, globeBackground)
    return (
        <mesh rotation={[0, -Math.PI / 2, 0]}>
            <sphereGeometry args={[radius, 64, 64]} />
            <shaderMaterial
                receiveShadow
                attach="material"
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

export default Globe