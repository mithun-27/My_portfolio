import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface VoxelParticlesProps {
    count?: number;
    color?: string;
    size?: number;
    spread?: number;
    speed?: number;
}

export const VoxelParticles = ({
    count = 100,
    color = '#00E5FF',
    size = 0.05,
    spread = 20,
    speed = 0.5,
}: VoxelParticlesProps) => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * spread;
            const y = (Math.random() - 0.5) * spread;
            const z = (Math.random() - 0.5) * spread;
            const speedMod = Math.random() * speed + 0.1;
            const phase = Math.random() * Math.PI * 2;
            temp.push({ x, y, z, speedMod, phase, originalY: y });
        }
        return temp;
    }, [count, spread, speed]);

    useFrame((state) => {
        if (!meshRef.current) return;

        particles.forEach((particle, i) => {
            const t = state.clock.elapsedTime * particle.speedMod;

            // Float up and down
            dummy.position.set(
                particle.x + Math.sin(t + particle.phase) * 0.5,
                particle.originalY + Math.sin(t * 2 + particle.phase) * 2,
                particle.z + Math.cos(t + particle.phase) * 0.5
            );

            // Slight rotation
            dummy.rotation.x = t;
            dummy.rotation.y = t * 0.5;

            // Pulsing scale
            const scale = 0.8 + Math.sin(t * 3) * 0.2;
            dummy.scale.setScalar(scale);

            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <boxGeometry args={[size, size, size]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
                transparent
                opacity={0.8}
            />
        </instancedMesh>
    );
};

// Torch flame particles
export const TorchParticles = ({ position }: { position: [number, number, number] }) => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const count = 15;

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                offset: Math.random() * Math.PI * 2,
                speed: Math.random() * 2 + 1,
                radius: Math.random() * 0.1,
            });
        }
        return temp;
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        particles.forEach((particle, i) => {
            const t = state.clock.elapsedTime * particle.speed + particle.offset;

            dummy.position.set(
                position[0] + Math.sin(t) * particle.radius,
                position[1] + (t % 1) * 0.5,
                position[2] + Math.cos(t) * particle.radius
            );

            const scale = Math.max(0, 1 - (t % 1)) * 0.1;
            dummy.scale.setScalar(scale);

            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <boxGeometry args={[0.05, 0.05, 0.05]} />
            <meshStandardMaterial
                color="#FF6B00"
                emissive="#FF6B00"
                emissiveIntensity={2}
                transparent
                opacity={0.9}
            />
        </instancedMesh>
    );
};
