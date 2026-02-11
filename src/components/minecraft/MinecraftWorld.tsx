import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FloatingIslands } from './FloatingIslands';
import { VoxelParticles, TorchParticles } from './VoxelParticles';
import { VoxelAvatar } from './VoxelAvatar';

// Simple Stars component (replacement for drei Stars)
const SimpleStars = ({ count = 1000 }) => {
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 200;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 200;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 200;
        }
        return pos;
    }, [count]);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.5} color="#ffffff" sizeAttenuation transparent opacity={0.8} />
        </points>
    );
};

// Animated sky gradient
const Sky = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current && meshRef.current.material instanceof THREE.ShaderMaterial) {
            meshRef.current.material.uniforms.time.value = state.clock.elapsedTime;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -50]} scale={[100, 60, 1]}>
            <planeGeometry />
            <shaderMaterial
                uniforms={{
                    time: { value: 0 },
                    topColor: { value: new THREE.Color('#0a0a1a') },
                    bottomColor: { value: new THREE.Color('#1a1a3a') },
                }}
                vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
                fragmentShader={`
          uniform float time;
          uniform vec3 topColor;
          uniform vec3 bottomColor;
          varying vec2 vUv;
          void main() {
            float gradient = vUv.y + sin(time * 0.1) * 0.05;
            vec3 color = mix(bottomColor, topColor, gradient);
            gl_FragColor = vec4(color, 1.0);
          }
        `}
            />
        </mesh>
    );
};

// Torch light component
const Torch = ({ position }: { position: [number, number, number] }) => {
    return (
        <group position={position}>
            {/* Torch stick */}
            <mesh position={[0, -0.3, 0]}>
                <boxGeometry args={[0.15, 0.6, 0.15]} />
                <meshStandardMaterial color="#8D6E63" />
            </mesh>
            {/* Torch top */}
            <mesh position={[0, 0.1, 0]}>
                <boxGeometry args={[0.2, 0.2, 0.2]} />
                <meshStandardMaterial color="#FF6B00" emissive="#FF6B00" emissiveIntensity={2} />
            </mesh>
            {/* Point light */}
            <pointLight color="#FF6B00" intensity={2} distance={5} decay={2} />
            {/* Particles */}
            <TorchParticles position={[0, 0.2, 0]} />
        </group>
    );
};

// Simple Float animation wrapper
const FloatWrapper = ({ children, speed = 2, intensity = 0.5 }: { children: React.ReactNode; speed?: number; intensity?: number }) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * speed) * intensity * 0.1;
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
        }
    });

    return <group ref={groupRef}>{children}</group>;
};

// Main 3D scene
const MinecraftScene = () => {
    return (
        <>
            {/* Camera - using default */}
            <perspectiveCamera position={[0, 0, 10]} fov={60} />

            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight
                position={[10, 10, 5]}
                intensity={0.5}
                castShadow
            />

            {/* Sky and stars */}
            <Sky />
            <SimpleStars count={2000} />

            {/* Floating islands in background */}
            <FloatingIslands />

            {/* Ambient particles */}
            <VoxelParticles count={50} color="#00E5FF" spread={30} speed={0.3} />
            <VoxelParticles count={30} color="#A855F7" spread={25} speed={0.2} />

            {/* Avatar */}
            <FloatWrapper speed={2} intensity={0.5}>
                <VoxelAvatar position={[4, -1, 0]} scale={1.5} />
            </FloatWrapper>

            {/* Torches */}
            <Torch position={[-6, 0, -2]} />
            <Torch position={[6, -2, -3]} />
        </>
    );
};

export const MinecraftWorld = () => {
    return (
        <div className="absolute inset-0 w-full h-full">
            <Canvas
                shadows
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                camera={{ position: [0, 0, 10], fov: 60 }}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <MinecraftScene />
                </Suspense>
            </Canvas>
        </div>
    );
};
