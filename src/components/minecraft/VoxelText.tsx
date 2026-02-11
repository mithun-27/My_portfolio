import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface VoxelTextProps {
    text: string;
    position?: [number, number, number];
    color?: string;
    size?: number;
}

// Simple voxel-style 3D text using boxes
const letterMap: Record<string, number[][]> = {
    'A': [[0, 1, 1, 0], [1, 0, 0, 1], [1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1]],
    'B': [[1, 1, 1, 0], [1, 0, 0, 1], [1, 1, 1, 0], [1, 0, 0, 1], [1, 1, 1, 0]],
    'C': [[0, 1, 1, 1], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [0, 1, 1, 1]],
    'D': [[1, 1, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 0]],
    'E': [[1, 1, 1, 1], [1, 0, 0, 0], [1, 1, 1, 0], [1, 0, 0, 0], [1, 1, 1, 1]],
    'F': [[1, 1, 1, 1], [1, 0, 0, 0], [1, 1, 1, 0], [1, 0, 0, 0], [1, 0, 0, 0]],
    'G': [[0, 1, 1, 1], [1, 0, 0, 0], [1, 0, 1, 1], [1, 0, 0, 1], [0, 1, 1, 0]],
    'H': [[1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1]],
    'I': [[1, 1, 1], [0, 1, 0], [0, 1, 0], [0, 1, 0], [1, 1, 1]],
    'J': [[0, 0, 1], [0, 0, 1], [0, 0, 1], [1, 0, 1], [0, 1, 0]],
    'K': [[1, 0, 0, 1], [1, 0, 1, 0], [1, 1, 0, 0], [1, 0, 1, 0], [1, 0, 0, 1]],
    'L': [[1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 1]],
    'M': [[1, 0, 0, 0, 1], [1, 1, 0, 1, 1], [1, 0, 1, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1]],
    'N': [[1, 0, 0, 1], [1, 1, 0, 1], [1, 0, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1]],
    'O': [[0, 1, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [0, 1, 1, 0]],
    'P': [[1, 1, 1, 0], [1, 0, 0, 1], [1, 1, 1, 0], [1, 0, 0, 0], [1, 0, 0, 0]],
    'Q': [[0, 1, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 1, 0], [0, 1, 0, 1]],
    'R': [[1, 1, 1, 0], [1, 0, 0, 1], [1, 1, 1, 0], [1, 0, 1, 0], [1, 0, 0, 1]],
    'S': [[0, 1, 1, 1], [1, 0, 0, 0], [0, 1, 1, 0], [0, 0, 0, 1], [1, 1, 1, 0]],
    'T': [[1, 1, 1, 1, 1], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]],
    'U': [[1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [0, 1, 1, 0]],
    'V': [[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0]],
    'W': [[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 1, 0, 1], [1, 1, 0, 1, 1], [1, 0, 0, 0, 1]],
    'X': [[1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0], [0, 1, 0, 1, 0], [1, 0, 0, 0, 1]],
    'Y': [[1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]],
    'Z': [[1, 1, 1, 1], [0, 0, 1, 0], [0, 1, 0, 0], [1, 0, 0, 0], [1, 1, 1, 1]],
    ' ': [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
    '&': [[0, 1, 0], [1, 0, 1], [0, 1, 0], [1, 0, 1], [0, 1, 1]],
};

export const VoxelText = ({ text, position = [0, 0, 0], color = '#00E5FF', size = 0.1 }: VoxelTextProps) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Subtle floating animation
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.05;
        }
    });

    const renderLetter = (char: string, offsetX: number) => {
        const matrix = letterMap[char.toUpperCase()];
        if (!matrix) return null;

        const blocks: JSX.Element[] = [];
        matrix.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === 1) {
                    blocks.push(
                        <mesh
                            key={`${char}-${x}-${y}`}
                            position={[offsetX + x * size, (4 - y) * size, 0]}
                        >
                            <boxGeometry args={[size * 0.9, size * 0.9, size * 0.5]} />
                            <meshStandardMaterial
                                color={color}
                                emissive={color}
                                emissiveIntensity={0.3}
                            />
                        </mesh>
                    );
                }
            });
        });

        return blocks;
    };

    let currentX = 0;
    const letters = text.split('').map((char, i) => {
        const letterWidth = (letterMap[char.toUpperCase()]?.[0]?.length || 2) * size + size;
        const letter = (
            <group key={i}>
                {renderLetter(char, currentX)}
            </group>
        );
        currentX += letterWidth;
        return letter;
    });

    return (
        <group ref={groupRef} position={position}>
            {letters}
        </group>
    );
};
