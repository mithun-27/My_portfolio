import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface VoxelAvatarProps {
    position?: [number, number, number];
    scale?: number;
}

export const VoxelAvatar = ({ position = [0, 0, 0], scale = 1 }: VoxelAvatarProps) => {
    const groupRef = useRef<THREE.Group>(null);
    const headRef = useRef<THREE.Group>(null);
    const leftArmRef = useRef<THREE.Mesh>(null);
    const rightArmRef = useRef<THREE.Mesh>(null);
    const leftLegRef = useRef<THREE.Mesh>(null);
    const rightLegRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!groupRef.current) return;

        const t = state.clock.elapsedTime;

        // Idle breathing animation
        groupRef.current.position.y = position[1] + Math.sin(t * 2) * 0.05;

        // Head follows mouse slightly
        if (headRef.current) {
            const mouseX = (state.mouse.x * 0.3);
            const mouseY = (state.mouse.y * 0.2);
            headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, mouseX, 0.05);
            headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -mouseY, 0.05);
        }

        // Arm waving animation
        if (rightArmRef.current) {
            rightArmRef.current.rotation.x = Math.sin(t * 3) * 0.3;
            rightArmRef.current.rotation.z = -0.2 + Math.sin(t * 2) * 0.1;
        }

        if (leftArmRef.current) {
            leftArmRef.current.rotation.x = Math.sin(t * 3 + Math.PI) * 0.1;
        }

        // Subtle leg movement
        if (leftLegRef.current && rightLegRef.current) {
            leftLegRef.current.rotation.x = Math.sin(t * 2) * 0.05;
            rightLegRef.current.rotation.x = Math.sin(t * 2 + Math.PI) * 0.05;
        }
    });

    // Minecraft-style colors
    const skinColor = '#C69C6D';
    const hairColor = '#3E2723';
    const shirtColor = '#00BCD4';
    const pantsColor = '#1A237E';
    const shoeColor = '#424242';

    return (
        <group ref={groupRef} position={position} scale={scale}>
            {/* Head */}
            <group ref={headRef} position={[0, 1.5, 0]}>
                {/* Main head */}
                <mesh castShadow>
                    <boxGeometry args={[0.8, 0.8, 0.8]} />
                    <meshStandardMaterial color={skinColor} />
                </mesh>

                {/* Hair */}
                <mesh position={[0, 0.35, 0]} castShadow>
                    <boxGeometry args={[0.85, 0.15, 0.85]} />
                    <meshStandardMaterial color={hairColor} />
                </mesh>

                {/* Eyes */}
                <mesh position={[-0.15, 0.1, 0.41]}>
                    <boxGeometry args={[0.12, 0.08, 0.02]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>
                <mesh position={[0.15, 0.1, 0.41]}>
                    <boxGeometry args={[0.12, 0.08, 0.02]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>

                {/* Pupils */}
                <mesh position={[-0.15, 0.1, 0.42]}>
                    <boxGeometry args={[0.06, 0.06, 0.02]} />
                    <meshStandardMaterial color="#1A1A1A" />
                </mesh>
                <mesh position={[0.15, 0.1, 0.42]}>
                    <boxGeometry args={[0.06, 0.06, 0.02]} />
                    <meshStandardMaterial color="#1A1A1A" />
                </mesh>

                {/* Smile */}
                <mesh position={[0, -0.1, 0.41]}>
                    <boxGeometry args={[0.25, 0.05, 0.02]} />
                    <meshStandardMaterial color="#8D6E63" />
                </mesh>
            </group>

            {/* Body */}
            <mesh position={[0, 0.6, 0]} castShadow>
                <boxGeometry args={[0.6, 0.9, 0.4]} />
                <meshStandardMaterial color={shirtColor} />
            </mesh>

            {/* Shirt design - gradient effect */}
            <mesh position={[0, 0.6, 0.21]}>
                <boxGeometry args={[0.4, 0.3, 0.02]} />
                <meshStandardMaterial color="#00ACC1" />
            </mesh>

            {/* Left Arm */}
            <group position={[-0.45, 0.75, 0]}>
                <mesh ref={leftArmRef} castShadow>
                    <boxGeometry args={[0.25, 0.9, 0.25]} />
                    <meshStandardMaterial color={shirtColor} />
                </mesh>
                {/* Hand */}
                <mesh position={[0, -0.5, 0]}>
                    <boxGeometry args={[0.2, 0.15, 0.2]} />
                    <meshStandardMaterial color={skinColor} />
                </mesh>
            </group>

            {/* Right Arm - waving */}
            <group position={[0.45, 0.75, 0]}>
                <mesh ref={rightArmRef} castShadow>
                    <boxGeometry args={[0.25, 0.9, 0.25]} />
                    <meshStandardMaterial color={shirtColor} />
                </mesh>
                {/* Hand */}
                <mesh position={[0, -0.5, 0]}>
                    <boxGeometry args={[0.2, 0.15, 0.2]} />
                    <meshStandardMaterial color={skinColor} />
                </mesh>
            </group>

            {/* Left Leg */}
            <group position={[-0.15, -0.3, 0]}>
                <mesh ref={leftLegRef} castShadow>
                    <boxGeometry args={[0.25, 0.7, 0.3]} />
                    <meshStandardMaterial color={pantsColor} />
                </mesh>
                {/* Shoe */}
                <mesh position={[0, -0.4, 0.05]}>
                    <boxGeometry args={[0.25, 0.15, 0.35]} />
                    <meshStandardMaterial color={shoeColor} />
                </mesh>
            </group>

            {/* Right Leg */}
            <group position={[0.15, -0.3, 0]}>
                <mesh ref={rightLegRef} castShadow>
                    <boxGeometry args={[0.25, 0.7, 0.3]} />
                    <meshStandardMaterial color={pantsColor} />
                </mesh>
                {/* Shoe */}
                <mesh position={[0, -0.4, 0.05]}>
                    <boxGeometry args={[0.25, 0.15, 0.35]} />
                    <meshStandardMaterial color={shoeColor} />
                </mesh>
            </group>
        </group>
    );
};
