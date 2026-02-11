import React, { useEffect, useRef, useState } from 'react';
import { Css3DCube } from './Css3DCube';
import '@/styles/css3d.css';

// The URL to the Steve Skin
const SKIN_URL = "https://raw.githubusercontent.com/inventivetalentDev/minecraft-assets/1.19/assets/minecraft/textures/entity/steve.png";

// Helper to create texture-mapped faces
const TexturedCube = ({ width, height, depth, x = 0, y = 0, z = 0, u, v }: any) => {
    // scale factor: visual size vs texture size (8px -> 64px = 8x)
    const scale = 8;
    const texW = width / scale;
    const texH = height / scale;
    const texD = depth / scale;

    // Total texture size (64px original -> 512px scaled)
    const bgSize = `${64 * scale}px ${64 * scale}px`;

    const getFaceStyle = (uOff: number, vOff: number) => ({
        backgroundImage: `url(${SKIN_URL})`,
        backgroundSize: bgSize,
        backgroundPosition: `-${uOff * scale}px -${vOff * scale}px`,
        imageRendering: 'pixelated' as const,
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
    });

    // Make default faces transparent so only our textured faces show
    const transparent = 'transparent';
    const clearColors = {
        front: transparent, back: transparent, left: transparent,
        right: transparent, top: transparent, bottom: transparent
    };

    return (
        <Css3DCube
            width={width} height={height} depth={depth} x={x} y={y} z={z}
            colors={clearColors}
            className="textured-cube"
        >
            {/* Custom Textured Faces overlaying the transparent default ones */}
            <div className="face-3d face-front" style={getFaceStyle(u + texD, v + texD)} />
            <div className="face-3d face-back" style={getFaceStyle(u + texD + texW + texD, v + texD)} />
            <div className="face-3d face-right" style={getFaceStyle(u, v + texD)} />
            <div className="face-3d face-left" style={getFaceStyle(u + texD + texW, v + texD)} />
            <div className="face-3d face-top" style={getFaceStyle(u + texD, v)} />
            <div className="face-3d face-bottom" style={getFaceStyle(u + texD + texW, v)} />
        </Css3DCube>
    );
};

export const Css3DAvatar = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const x = (clientX / innerWidth - 0.5) * 40;
            const y = (clientY / innerHeight - 0.5) * 30;
            containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
        };

        const handleOrientation = (e: DeviceOrientationEvent) => {
            if (!containerRef.current) return;
            if (e.beta !== null && e.gamma !== null) {
                // beta: front-back tilt [-180, 180] (rotateX)
                // gamma: left-right tilt [-90, 90] (rotateY)

                // Limit the tilt range to avoid extreme rotations
                const x = Math.min(Math.max(e.gamma, -45), 45);
                const y = Math.min(Math.max(e.beta - 45, -45), 45); // Subtract 45 to account for holding phone at angle

                containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('deviceorientation', handleOrientation);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, []);

    // Visual Dimensions (8x Multiplier)
    // Head: 8x8x8 -> 64x64x64
    // Body: 8x12x4 -> 64x96x32
    // Arm: 4x12x4 -> 32x96x32
    // Leg: 4x12x4 -> 32x96x32

    return (
        <div className="scene-3d w-64 h-96 flex items-center justify-center">
            <div
                ref={containerRef}
                className="object-3d transition-transform duration-100 ease-out"
                style={{ transform: 'rotateY(-20deg) rotateX(10deg)' }}
            >
                <div className="animate-float-3d object-3d">

                    {/* HEAD (UV: 0, 0) */}
                    <div className="object-3d" style={{ transform: 'translateY(-100px)' }}>
                        <TexturedCube width={64} height={64} depth={64} u={0} v={0} />
                        {/* Hat Layer (Scale 1.1) */}
                        <div style={{ transform: 'scale(1.125)' }}>
                            <TexturedCube width={64} height={64} depth={64} u={32} v={0} />
                        </div>
                    </div>

                    {/* BODY (UV: 16, 16) */}
                    <div className="object-3d" style={{ transform: 'translateY(0px)' }}>
                        <TexturedCube width={64} height={96} depth={32} u={16} v={16} />
                    </div>

                    {/* ARMS */}
                    {/* Right Arm (Screen Right = Avatar Left Arm: UV 32, 48) */}
                    <div className="avatar-arm-right object-3d" style={{ transform: 'translate(48px, -32px, 0)' }}>
                        <div style={{ transform: 'translateY(48px)' }}>
                            <TexturedCube width={32} height={96} depth={32} u={32} v={48} />
                        </div>
                    </div>

                    {/* Left Arm (Screen Left = Avatar Right Arm: UV 40, 16) */}
                    <div className="avatar-arm-left object-3d" style={{ transform: 'translate(-48px, -32px, 0)' }}>
                        <div style={{ transform: 'translateY(48px)' }}>
                            <TexturedCube width={32} height={96} depth={32} u={40} v={16} />
                        </div>
                    </div>

                    {/* LEGS */}
                    {/* Right Leg (UV: 0, 16) */}
                    <div className="avatar-leg-right object-3d" style={{ transform: 'translate(16px, 48px, 0)' }}>
                        <div style={{ transform: 'translateY(48px)' }}>
                            <TexturedCube width={32} height={96} depth={32} u={0} v={16} />
                        </div>
                    </div>

                    {/* Left Leg (UV: 16, 48) */}
                    <div className="avatar-leg-left object-3d" style={{ transform: 'translate(-16px, 48px, 0)' }}>
                        <div style={{ transform: 'translateY(48px)' }}>
                            <TexturedCube width={32} height={96} depth={32} u={16} v={48} />
                        </div>
                    </div>

                </div>

                {/* Shadow */}
                <div
                    className="absolute"
                    style={{
                        width: '140px',
                        height: '140px',
                        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 70%)',
                        transform: 'rotateX(90deg) translateZ(-160px)',
                        filter: 'blur(5px)'
                    }}
                />
            </div>
        </div>
    );
};
