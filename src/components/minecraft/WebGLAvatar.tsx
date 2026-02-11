import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useFrame, useLoader, useGraph } from '@react-three/fiber';
import * as THREE from 'three';

// --- TEXTURE GENERATION ---
const generateFallbackSkin = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Transparent Background
    ctx.clearRect(0, 0, 64, 64);

    const draw = (x: number, y: number, w: number, h: number, color: string) => {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    };

    // Colors (Steve)
    const c = {
        hair: '#382618',
        skin: '#F6C09D',
        shirt: '#00B4D8',
        pants: '#4B3F72',
        eyes: '#FFFFFF',
        pupil: '#3B27BA'
    };

    // Head (8x8x8) -> UV Area: 0,0 to 32,16
    // Top (8x8) at 8,0
    draw(8, 0, 8, 8, c.hair);
    // Bottom (8x8) at 16,0
    draw(16, 0, 8, 8, c.skin);
    // Right (8x8) at 0,8
    draw(0, 8, 8, 8, c.hair);
    // Front (8x8) at 8,8
    draw(8, 8, 8, 8, c.skin);
    // Left (8x8) at 16,8
    draw(16, 8, 8, 8, c.hair);
    // Back (8x8) at 24,8
    draw(24, 8, 8, 8, c.hair);

    // Eyes on Front Face (8,8)
    draw(9, 11, 2, 2, c.eyes); // Right Eye
    draw(10, 11, 1, 1, c.pupil);
    draw(13, 11, 2, 2, c.eyes); // Left Eye
    draw(13, 11, 1, 1, c.pupil);

    // Body (8x12x4) -> UV Area: 16,16 to 40,32
    // Top (8x4) at 20,16
    draw(20, 16, 8, 4, c.shirt);
    // Bottom (8x4) at 28,16
    draw(28, 16, 8, 4, c.shirt);
    // Right (4x12) at 16,20
    draw(16, 20, 4, 12, c.shirt);
    // Front (8x12) at 20,20
    draw(20, 20, 8, 12, c.shirt);
    // Left (4x12) at 28,20
    draw(28, 20, 4, 12, c.shirt);
    // Back (8x12) at 32,20
    draw(32, 20, 8, 12, c.shirt);

    // Arms & Legs follow similar patterns... simplified for fallback
    // Right Arm (4x12x4) -> UV Area: 40,16
    draw(44, 16, 4, 4, c.skin); // Top
    draw(40, 20, 4, 12, c.skin); // Right
    draw(44, 20, 4, 12, c.skin); // Front

    // Left Arm -> UV Area: 32,48
    draw(36, 48, 4, 4, c.skin); // Top
    draw(36, 52, 4, 12, c.skin); // Front

    // Right Leg -> UV Area: 0,16
    draw(4, 16, 4, 4, c.pants); // Top
    draw(4, 20, 4, 12, c.pants); // Front

    // Left Leg -> UV Area: 16,48
    draw(20, 48, 4, 4, c.pants); // Top
    draw(20, 52, 4, 12, c.pants); // Front

    return canvas.toDataURL();
};

// --- MESH CONFIG ---

const configureSkinUVs = (geometry: THREE.BoxGeometry, u: number, v: number, w: number, h: number, d: number) => {
    const texWidth = 64;
    const texHeight = 64;
    const x = u;
    const y = v;

    const toUV = (px: number, py: number, pw: number, ph: number) => {
        return [
            new THREE.Vector2(px / texWidth, (texHeight - py - ph) / texHeight),
            new THREE.Vector2((px + pw) / texWidth, (texHeight - py - ph) / texHeight),
            new THREE.Vector2((px + pw) / texWidth, (texHeight - py) / texHeight),
            new THREE.Vector2(px / texWidth, (texHeight - py) / texHeight),
        ];
    };

    const uvRight = toUV(x, y + d, d, h);
    const uvLeft = toUV(x + d + w, y + d, d, h);
    const uvTop = toUV(x + d, y, w, d);
    const uvBottom = toUV(x + d + w, y, w, d);
    const uvFront = toUV(x + d, y + d, w, h);
    const uvBack = toUV(x + d + w + d, y + d, w, h);

    const uvAttribute = geometry.attributes.uv;
    if (uvAttribute) {
        const faceUVs = [uvRight, uvLeft, uvTop, uvBottom, uvFront, uvBack];
        for (let i = 0; i < 6; i++) {
            const v = faceUVs[i];
            uvAttribute.setXY(i * 4 + 0, v[3].x, v[3].y);
            uvAttribute.setXY(i * 4 + 1, v[0].x, v[0].y);
            uvAttribute.setXY(i * 4 + 2, v[2].x, v[2].y);
            uvAttribute.setXY(i * 4 + 3, v[1].x, v[1].y);
        }
        uvAttribute.needsUpdate = true;
    }
};

const SteveLimb = ({ position, size, uvOffset, texture, anim = {} }: any) => {
    const mesh = useRef<THREE.Mesh>(null);
    const geometry = useMemo(() => {
        const geo = new THREE.BoxGeometry(size[0], size[1], size[2]);
        configureSkinUVs(geo, uvOffset[0], uvOffset[1], size[0], size[1], size[2]);
        return geo;
    }, [size, uvOffset]);

    useFrame((state) => {
        if (!mesh.current) return;
        if (anim.rotateX) {
            mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * anim.speed) * anim.intensity;
        }
    });

    return (
        <mesh ref={mesh} position={position} geometry={geometry} castShadow receiveShadow>
            <meshStandardMaterial map={texture} transparent alphaTest={0.5} roughness={0.6} />
        </mesh>
    );
};

// --- COMPONENTS ---

// Avatar Rig that works with ANY texture (loaded or generated)
const AvatarRig = ({ texture }: { texture: THREE.Texture }) => {
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    const s = 0.125;

    return (
        <group position={[0, -1, 0]}>
            {/* Head */}
            <SteveLimb position={[0, 24 * s + 4 * s, 0]} size={[8, 8, 8]} uvOffset={[0, 0]} texture={texture} />
            {/* Body */}
            <SteveLimb position={[0, 12 * s + 6 * s, 0]} size={[8, 12, 4]} uvOffset={[16, 16]} texture={texture} />
            {/* Arms & Legs */}
            <SteveLimb position={[6 * s, 12 * s + 6 * s, 0]} size={[4, 12, 4]} uvOffset={[40, 16]} texture={texture} anim={{ rotateX: true, speed: 3, intensity: 0.5 }} />
            <SteveLimb position={[-6 * s, 12 * s + 6 * s, 0]} size={[4, 12, 4]} uvOffset={[32, 48]} texture={texture} anim={{ rotateX: true, speed: 3, intensity: -0.5 }} />
            <SteveLimb position={[2 * s, 6 * s, 0]} size={[4, 12, 4]} uvOffset={[0, 16]} texture={texture} anim={{ rotateX: true, speed: 3, intensity: -0.5 }} />
            <SteveLimb position={[-2 * s, 6 * s, 0]} size={[4, 12, 4]} uvOffset={[16, 48]} texture={texture} anim={{ rotateX: true, speed: 3, intensity: 0.5 }} />
        </group>
    );
};

// Component that TRYs to load remote texture
const RemoteAvatar = () => {
    const remoteUrl = 'https://raw.githubusercontent.com/inventivetalentDev/minecraft-assets/1.19/assets/minecraft/textures/entity/steve.png';
    const texture = useLoader(THREE.TextureLoader, remoteUrl);
    return <AvatarRig texture={texture} />;
};

// Fallback component using generated texture
const FallbackAvatar = () => {
    const texture = useMemo(() => {
        const url = generateFallbackSkin();
        return new THREE.TextureLoader().load(url);
    }, []);
    return <AvatarRig texture={texture} />;
};

// Error Boundary
class AvatarErrorBoundary extends React.Component<{ fallback: React.ReactNode, children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error: any) {
        console.error("Avatar Texture Load Error:", error);
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

export const WebGLAvatar = () => {
    return (
        <AvatarErrorBoundary fallback={<FallbackAvatar />}>
            <RemoteAvatar />
        </AvatarErrorBoundary>
    );
};
