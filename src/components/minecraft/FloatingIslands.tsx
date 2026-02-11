import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface IslandProps {
    position: [number, number, number];
    scale?: number;
    rotationSpeed?: number;
}

const VoxelIsland = ({ position, scale = 1, rotationSpeed = 0.1 }: IslandProps) => {
    const groupRef = useRef<THREE.Group>(null);
    const initialY = position[1];

    useFrame((state) => {
        if (groupRef.current) {
            // Gentle floating motion
            groupRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
            // Slow rotation
            groupRef.current.rotation.y += rotationSpeed * 0.01;
        }
    });

    // Generate island blocks procedurally
    const blocks = useMemo(() => {
        const result: { pos: [number, number, number]; type: string }[] = [];
        const size = 3;

        // Create base layer
        for (let x = -size; x <= size; x++) {
            for (let z = -size; z <= size; z++) {
                const distance = Math.sqrt(x * x + z * z);
                if (distance <= size) {
                    // Top grass layer
                    result.push({ pos: [x, 0, z], type: 'grass' });

                    // Stone layers below
                    const depth = Math.floor(Math.random() * 3) + 1;
                    for (let y = -1; y >= -depth; y--) {
                        if (Math.random() > 0.3) {
                            result.push({ pos: [x, y, z], type: y === -depth ? 'stone-dark' : 'stone' });
                        }
                    }
                }
            }
        }

        // Add some trees
        const treePositions = [
            [1, 1, 0],
            [-1, 1, 1],
            [0, 1, -1],
        ];

        treePositions.forEach(([tx, ty, tz]) => {
            if (Math.random() > 0.5) {
                // Trunk
                for (let i = 0; i < 3; i++) {
                    result.push({ pos: [tx, ty + i, tz], type: 'wood' });
                }
                // Leaves
                for (let lx = -1; lx <= 1; lx++) {
                    for (let lz = -1; lz <= 1; lz++) {
                        for (let ly = 0; ly <= 1; ly++) {
                            if (Math.random() > 0.2) {
                                result.push({ pos: [tx + lx, ty + 3 + ly, tz + lz], type: 'leaves' });
                            }
                        }
                    }
                }
            }
        });

        return result;
    }, []);

    const getColor = (type: string) => {
        const colors: Record<string, string> = {
            grass: '#4CAF50',
            'grass-top': '#66BB6A',
            stone: '#757575',
            'stone-dark': '#424242',
            wood: '#8D6E63',
            leaves: '#2E7D32',
        };
        return colors[type] || '#888888';
    };

    return (
        <group ref={groupRef} position={position} scale={scale}>
            {blocks.map((block, i) => (
                <mesh key={i} position={block.pos} castShadow receiveShadow>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color={getColor(block.type)} />
                </mesh>
            ))}
        </group>
    );
};

export const FloatingIslands = () => {
    const islands = useMemo(() => [
        { position: [-8, 2, -10] as [number, number, number], scale: 0.8, rotationSpeed: 0.05 },
        { position: [10, -1, -8] as [number, number, number], scale: 0.6, rotationSpeed: -0.03 },
        { position: [-12, 0, 5] as [number, number, number], scale: 0.5, rotationSpeed: 0.04 },
        { position: [8, 3, 8] as [number, number, number], scale: 0.7, rotationSpeed: -0.06 },
        { position: [0, -3, -15] as [number, number, number], scale: 1, rotationSpeed: 0.02 },
    ], []);

    return (
        <group>
            {islands.map((island, i) => (
                <VoxelIsland key={i} {...island} />
            ))}
        </group>
    );
};
