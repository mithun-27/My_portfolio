import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface VoxelBlockProps {
    position: [number, number, number];
    color?: string;
    size?: number;
    type?: 'grass' | 'stone' | 'diamond' | 'gold' | 'emerald' | 'obsidian' | 'glowstone';
    hoverable?: boolean;
    onClick?: () => void;
    floatSpeed?: number;
    floatHeight?: number;
}

const blockColors: Record<string, { top: string; side: string; bottom: string }> = {
    grass: { top: '#4CAF50', side: '#8B5A2B', bottom: '#795548' },
    stone: { top: '#9E9E9E', side: '#757575', bottom: '#616161' },
    diamond: { top: '#00BCD4', side: '#4DD0E1', bottom: '#00ACC1' },
    gold: { top: '#FFD700', side: '#FFC107', bottom: '#FF8F00' },
    emerald: { top: '#00E676', side: '#00C853', bottom: '#00BFA5' },
    obsidian: { top: '#1A1A2E', side: '#16213E', bottom: '#0F0F1A' },
    glowstone: { top: '#FFE082', side: '#FFCA28', bottom: '#FFB300' },
};

export const VoxelBlock = ({
    position,
    color,
    size = 1,
    type = 'grass',
    hoverable = true,
    onClick,
    floatSpeed = 1,
    floatHeight = 0.1,
}: VoxelBlockProps) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    const initialY = position[1];
    const colors = blockColors[type];

    useFrame((state) => {
        if (meshRef.current) {
            // Floating animation
            meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * floatSpeed) * floatHeight;

            // Hover scale animation
            const targetScale = hovered ? 1.1 : 1;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

            // Slight rotation when hovered
            if (hovered) {
                meshRef.current.rotation.y += 0.02;
            }
        }
    });

    const handleClick = () => {
        setClicked(true);
        onClick?.();
        setTimeout(() => setClicked(false), 200);
    };

    // Create materials for each face (Minecraft-style with different top/side/bottom)
    const materials = [
        new THREE.MeshStandardMaterial({ color: color || colors.side }), // right
        new THREE.MeshStandardMaterial({ color: color || colors.side }), // left
        new THREE.MeshStandardMaterial({ color: color || colors.top }), // top
        new THREE.MeshStandardMaterial({ color: color || colors.bottom }), // bottom
        new THREE.MeshStandardMaterial({ color: color || colors.side }), // front
        new THREE.MeshStandardMaterial({ color: color || colors.side }), // back
    ];

    return (
        <mesh
            ref={meshRef}
            position={position}
            onClick={handleClick}
            onPointerOver={() => hoverable && setHovered(true)}
            onPointerOut={() => setHovered(false)}
            material={materials}
            castShadow
            receiveShadow
        >
            <boxGeometry args={[size, size, size]} />
            {hovered && (
                <lineSegments>
                    <edgesGeometry args={[new THREE.BoxGeometry(size * 1.02, size * 1.02, size * 1.02)]} />
                    <lineBasicMaterial color="#ffffff" linewidth={2} />
                </lineSegments>
            )}
        </mesh>
    );
};
