import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";

export const MinecraftJumpGame = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAME_OVER'>('START');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    // Game Constants (LOCKED)
    const PLAYER_WIDTH = 30;
    const PLAYER_HEIGHT = 50;
    const GROUND_Y = 160;
    const GRAVITY = 0.6;
    const JUMP_POWER = -12;
    const SPEED = 5;

    // Game Refs
    const requestRef = useRef<number>();
    const frameRef = useRef(0);
    const scoreRef = useRef(0);

    // Player State
    const playerRef = useRef({
        x: 50,
        y: GROUND_Y - PLAYER_HEIGHT, // Start exactly on ground
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
        dy: 0,
        grounded: true
    });

    // Obstacles
    const obstaclesRef = useRef<{ x: number, y: number, width: number, height: number, type: 'CACTUS' | 'CREEPER' }[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const handleJump = () => {
            if (gameState === 'PLAYING' && playerRef.current.grounded) {
                playerRef.current.dy = JUMP_POWER;
                playerRef.current.grounded = false;
            } else if (gameState !== 'PLAYING') {
                startGame();
            }
        };

        const startGame = () => {
            setGameState('PLAYING');
            setScore(0);
            scoreRef.current = 0;
            frameRef.current = 0;
            // Reset player to exact starting position
            playerRef.current = {
                x: 50,
                y: GROUND_Y - PLAYER_HEIGHT,
                width: PLAYER_WIDTH,
                height: PLAYER_HEIGHT,
                dy: 0,
                grounded: true
            };
            obstaclesRef.current = [];
        };

        const update = () => {
            if (gameState !== 'PLAYING') return;

            frameRef.current++;
            scoreRef.current = Math.floor(frameRef.current / 10);
            setScore(scoreRef.current);

            // Spawn Obstacles
            if (frameRef.current % 100 === 0) {
                if (Math.random() > 0.3) {
                    const isCreeper = Math.random() > 0.7;
                    const height = 40; // Standard obstacle height
                    obstaclesRef.current.push({
                        x: canvas.width,
                        y: GROUND_Y - height, // Aligned to ground
                        width: 30,
                        height: height,
                        type: isCreeper ? 'CREEPER' : 'CACTUS'
                    });
                }
            }

            // Player Physics
            playerRef.current.dy += GRAVITY;
            playerRef.current.y += playerRef.current.dy;

            // Ground Collision
            if (playerRef.current.y > GROUND_Y - PLAYER_HEIGHT) {
                playerRef.current.y = GROUND_Y - PLAYER_HEIGHT;
                playerRef.current.dy = 0;
                playerRef.current.grounded = true;
            }

            // Obstacle Logic
            for (let i = obstaclesRef.current.length - 1; i >= 0; i--) {
                const obs = obstaclesRef.current[i];
                obs.x -= SPEED;

                // Collision Detection
                if (
                    playerRef.current.x < obs.x + obs.width &&
                    playerRef.current.x + PLAYER_WIDTH > obs.x &&
                    playerRef.current.y < obs.y + obs.height &&
                    playerRef.current.y + PLAYER_HEIGHT > obs.y
                ) {
                    setGameState('GAME_OVER');
                    setHighScore(prev => Math.max(prev, scoreRef.current));
                    return;
                }

                if (obs.x + obs.width < 0) {
                    obstaclesRef.current.splice(i, 1);
                }
            }
        };

        const drawPlayer = (x: number, y: number) => {
            // Head (20px)
            ctx.fillStyle = '#F5C19F';
            ctx.fillRect(x + 4, y, 22, 20);

            // Body (20px) - Shirt
            ctx.fillStyle = '#00AAAA';
            ctx.fillRect(x, y + 20, 30, 20);

            // Legs (10px) - Pants
            // Total height = 20 + 20 + 10 = 50px
            ctx.fillStyle = '#2d2d2d';
            ctx.fillRect(x, y + 40, 30, 10);
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // NO GROUND DRAWING - Runs on footer border

            // Draw Player
            drawPlayer(playerRef.current.x, playerRef.current.y);

            // Draw Obstacles
            obstaclesRef.current.forEach(obs => {
                if (obs.type === 'CACTUS') {
                    ctx.fillStyle = '#166534';
                    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
                    ctx.fillStyle = '#000';
                    ctx.fillRect(obs.x + 5, obs.y + 10, 5, 2);
                    ctx.fillRect(obs.x + 20, obs.y + 20, 5, 2);
                } else {
                    ctx.fillStyle = '#4ade80';
                    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
                    ctx.fillStyle = '#000';
                    ctx.fillRect(obs.x + 5, obs.y + 10, 5, 5);
                    ctx.fillRect(obs.x + 20, obs.y + 10, 5, 5);
                    ctx.fillRect(obs.x + 10, obs.y + 20, 10, 10);
                }
            });
        };

        const loop = () => {
            if (gameState === 'PLAYING') {
                update();
                draw();
                requestRef.current = requestAnimationFrame(loop);
            } else if (gameState === 'START' || gameState === 'GAME_OVER') {
                // Ensure we draw the frame even when not playing
                draw();
            }
        };

        const onKeyDown = (e: KeyboardEvent) => {
            // Ignore if user is typing in an input or textarea
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            if (e.code === 'Space' || e.code === 'ArrowUp') {
                handleJump();
                if (e.code === 'Space') e.preventDefault();
            }
        };
        const onTouch = () => handleJump();

        window.addEventListener('keydown', onKeyDown);
        canvas.addEventListener('touchstart', onTouch);

        // Initial Draw Logic
        // Manually draw the initial state if in START mode to ensure visibility
        if (gameState === 'START') {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw Idle Player
            drawPlayer(50, GROUND_Y - PLAYER_HEIGHT);
        } else {
            // Start Loop if already playing (or game over)
            requestRef.current = requestAnimationFrame(loop);
        }

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            canvas.removeEventListener('touchstart', onTouch);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [gameState]);


    return (
        <div className="w-full relative h-[200px]">
            <canvas
                ref={canvasRef}
                width={800}
                height={200}
                className="w-full h-full cursor-pointer block mx-auto max-w-4xl hover:opacity-100 transition-opacity"
                onClick={() => {
                    if (gameState !== 'PLAYING') setGameState('PLAYING');
                }}
            />

            {/* Minimal UI Overlay */}
            {gameState !== 'PLAYING' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-10">
                    {gameState === 'GAME_OVER' && (
                        <div className="mb-4 text-center animate-bounce">
                            <h3 className="text-red-500 font-minecraft text-xl mb-1 shadow-black drop-shadow-md">GAME OVER!</h3>
                            <p className="text-white font-minecraft shadow-black drop-shadow-md">Score: {scoreRef.current}</p>
                        </div>
                    )}
                    <div className="pointer-events-auto">
                        <Button
                            onClick={() => setGameState('PLAYING')}
                            variant="ghost"
                            className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 font-minecraft border border-emerald-500/50 bg-black/50 backdrop-blur-sm"
                        >
                            {gameState === 'START' ? '> PRESS START <' : '> TRY AGAIN <'}
                        </Button>
                    </div>
                </div>
            )}

            {/* Simple HUD */}
            {gameState !== 'START' && (
                <div className="absolute top-4 right-4 md:right-32 text-right pointer-events-none text-xs md:text-sm">
                    <p className="font-minecraft text-emerald-500/60">HI: {highScore}</p>
                    <p className="font-minecraft text-emerald-400">{score.toString().padStart(5, '0')}</p>
                </div>
            )}
        </div>
    );
};
