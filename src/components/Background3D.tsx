import React, { useEffect, useRef } from 'react';

interface Star {
    x: number;
    y: number;
    z: number;
    size: number;
    color: string;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    color: string;
    glow: boolean;
}

export const Background3D = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>();
    const starsRef = useRef<Star[]>([]);
    const particlesRef = useRef<Particle[]>([]);
    const cursorRef = useRef({ x: 0, y: 0 });
    const lastPosRef = useRef({ x: 0, y: 0 });
    const tiltRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Configuration
        const STAR_COUNT = 400;
        const SPEED = 0.2;
        const COLORS = ['#4ade80', '#ffffff', '#22d3ee', '#a78bfa'];

        // Initialize Stars
        const initStars = () => {
            const { width, height } = canvas;
            starsRef.current = [];
            for (let i = 0; i < STAR_COUNT; i++) {
                starsRef.current.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    z: Math.random() * 2 + 0.5,
                    size: Math.random() * 2,
                    color: COLORS[Math.floor(Math.random() * COLORS.length)]
                });
            }
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        const spawnParticles = (x: number, y: number, lastX: number, lastY: number) => {
            const dx = x - lastX;
            const dy = y - lastY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const steps = Math.min(dist, 10);
            for (let i = 0; i < steps; i++) {
                const t = i / steps;
                const px = lastX + dx * t;
                const py = lastY + dy * t;

                if (Math.random() > 0.5) {
                    particlesRef.current.push({
                        x: px + (Math.random() - 0.5) * 4,
                        y: py + (Math.random() - 0.5) * 4,
                        vx: 0,
                        vy: 0,
                        life: 1.0,
                        maxLife: 1.0,
                        size: Math.random() * 2 + 1,
                        color: 'rgba(74, 222, 128, 0.5)',
                        glow: true
                    });
                }
            }
        };



        const handlePointerMove = (e: PointerEvent) => {
            const { clientX, clientY } = e;
            cursorRef.current = { x: clientX, y: clientY };
            spawnParticles(clientX, clientY, lastPosRef.current.x, lastPosRef.current.y);
            lastPosRef.current = { x: clientX, y: clientY };
        };

        const handleOrientation = (e: DeviceOrientationEvent) => {
            if (e.beta !== null && e.gamma !== null) {
                // beta: front-back tilt [-180, 180], gamma: left-right tilt [-90, 90]
                // Normalize and smooth - REDUCED SENSITIVITY from 5 to 0.5
                tiltRef.current = {
                    x: e.gamma * 0.5,
                    y: e.beta * 0.5
                };
            }
        };

        // Use Pointer Events for unified Mouse/Touch handling
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerdown', handlePointerMove);
        window.addEventListener('deviceorientation', handleOrientation);

        const animate = () => {
            ctx.fillStyle = 'rgba(5, 5, 5, 0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            // Combine Cursor and Gyroscope for Parallax
            const targetX = ((cursorRef.current.x - cx) + tiltRef.current.x * 10) * 0.05;
            const targetY = ((cursorRef.current.y - cy) + tiltRef.current.y * 10) * 0.05;

            // Draw Stars
            starsRef.current.forEach(star => {
                let dx = (star.x - cx) * (1 / star.z);
                let dy = (star.y - cy) * (1 / star.z);
                dx -= targetX * star.z;
                dy -= targetY * star.z;
                const screenX = cx + dx;
                const screenY = cy + dy;

                star.x += SPEED * (1 / star.z);
                if (star.x > canvas.width) star.x = 0;

                ctx.beginPath();
                ctx.fillStyle = star.color;
                ctx.globalAlpha = 1;
                ctx.arc(screenX, screenY, star.size / star.z, 0, Math.PI * 2);
                ctx.fill();
            });

            // Update & Draw Particles
            for (let i = particlesRef.current.length - 1; i >= 0; i--) {
                const p = particlesRef.current[i];
                // Add slight gravity influence from tilt
                p.vx += tiltRef.current.x * 0.001;
                p.vy += tiltRef.current.y * 0.001;

                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.02;

                if (p.life <= 0) {
                    particlesRef.current.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                if (p.glow) {
                    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
                    g.addColorStop(0, `rgba(74, 222, 128, ${p.life})`);
                    g.addColorStop(1, 'rgba(0,0,0,0)');
                    ctx.fillStyle = g;
                    ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
                } else {
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = p.life;
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                }
                ctx.fill();
                ctx.globalAlpha = 1;
            }

            // Draw Super Bright Cursor Core - BIGGER (Updated)
            const coreGradient = ctx.createRadialGradient(
                cursorRef.current.x, cursorRef.current.y, 0,
                cursorRef.current.x, cursorRef.current.y, 20
            );
            coreGradient.addColorStop(0, '#ffffff'); // Pure White
            coreGradient.addColorStop(0.5, 'rgba(180, 255, 200, 1)');
            coreGradient.addColorStop(1, 'rgba(74, 222, 128, 0)');
            ctx.fillStyle = coreGradient;
            ctx.beginPath();
            ctx.arc(cursorRef.current.x, cursorRef.current.y, 20, 0, Math.PI * 2);
            ctx.fill();

            // Outer Aura - MASSIVE Soft Glow (Updated)
            const outerGradient = ctx.createRadialGradient(
                cursorRef.current.x, cursorRef.current.y, 0,
                cursorRef.current.x, cursorRef.current.y, 150
            );
            outerGradient.addColorStop(0, 'rgba(74, 222, 128, 0.4)');
            outerGradient.addColorStop(0.5, 'rgba(74, 222, 128, 0.1)');
            outerGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = outerGradient;
            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.arc(cursorRef.current.x, cursorRef.current.y, 150, 0, Math.PI * 2);
            ctx.fill();

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerdown', handlePointerMove);
            window.removeEventListener('deviceorientation', handleOrientation);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 bg-black pointer-events-none"
            style={{ touchAction: 'none' }}
        />
    );
};
