import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowDown, Download, Mail, Pickaxe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Css3DAvatar } from "./minecraft/Css3DAvatar";

// Animated floating blocks (CSS 3D style)
const FloatingBlock = ({ x, y, delay, color, size = 40 }: { x: number; y: number; delay: number; color: string; size?: number }) => (
    <motion.div
        className="absolute rounded-sm opacity-50 blur-[1px]"
        style={{
            left: `${x}%`,
            top: `${y}%`,
            width: size,
            height: size,
            background: color,
            boxShadow: `0 0 20px ${color}`,
        }}
        animate={{
            y: [0, -30, 0],
            rotate: [0, 45, 0],
            opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
            duration: 5 + Math.random() * 3,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    />
);

const Particle = ({ delay }: { delay: number }) => (
    <motion.div
        className="absolute w-1 h-1 bg-white rounded-full"
        style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
        }}
        animate={{
            y: [-20, -100],
            opacity: [0, 0.8, 0],
        }}
        transition={{
            duration: 3 + Math.random() * 2,
            delay: delay,
            repeat: Infinity,
            ease: "linear"
        }}
    />
);

export const MinecraftHero = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const blocks = [
        { x: 10, y: 20, color: "#4ade80", size: 60 },
        { x: 85, y: 15, color: "#a78bfa", size: 40 },
        { x: 5, y: 70, color: "#22d3ee", size: 50 },
        { x: 92, y: 65, color: "#f59e0b", size: 45 },
        { x: 20, y: 45, color: "#60a5fa", size: 30 },
        { x: 75, y: 85, color: "#ef4444", size: 55 },
    ];

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a]" />
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundSize: '50px 50px',
                    backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
                    transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
                    transformOrigin: 'top center',
                }}
            />

            {mounted && blocks.map((block, i) => (
                <FloatingBlock key={i} {...block} delay={i * 0.5} />
            ))}

            {mounted && Array.from({ length: 30 }).map((_, i) => (
                <Particle key={i} delay={i * 0.2} />
            ))}

            <div className="section-container relative z-10 w-full max-w-6xl mx-auto px-4">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">

                    {/* Left - Text Content */}
                    <div className="flex-1 text-center lg:text-left space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-block"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full backdrop-blur-sm">
                                <Pickaxe className="w-4 h-4 text-emerald-400 animate-pulse" />
                                <span className="text-sm font-minecraft text-emerald-300 tracking-wide">
                                    Building the Future
                                </span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-4">
                                <span className="text-white drop-shadow-md">Hi, I'm</span>
                                <br />
                                <span
                                    className="font-minecraft text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"
                                    style={{
                                        filter: "drop-shadow(0 0 10px rgba(52, 211, 153, 0.4))"
                                    }}
                                >
                                    MITHUN
                                </span>
                            </h1>
                            <h2 className="text-2xl sm:text-3xl text-gray-300 font-light">
                                <span className="text-emerald-400 font-semibold">Freelancing Portfolio</span> | AI Engineer
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                        >
                            Crafting intelligent systems and immersive web experiences.
                            Always exploring new biomes of technology.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-4 justify-center lg:justify-start"
                        >
                            <Button
                                size="lg"
                                className="minecraft-btn-primary h-14 px-8 text-lg hover:scale-105 transition-transform duration-200 bg-[#25D366] hover:bg-[#128C7E] border-green-800 text-white"
                                onClick={() => window.open("https://wa.me/919944725531", "_blank")}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-5 h-5 mr-2 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                WhatsApp Me
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="minecraft-btn-secondary h-14 px-8 text-lg border-2 hover:scale-105 transition-transform duration-200"
                                onClick={() => window.open("/MITHUN_RESUME.pdf", "_blank")}
                            >
                                <Download className="w-5 h-5 mr-2" />
                                Resume
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right - High-Fidelity CSS 3D Avatar (Stable) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="flex-1 flex justify-center items-center relative h-[500px]"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse -z-10" />

                        <div className="transform scale-125 hover:scale-150 transition-transform duration-500 cursor-move">
                            <Css3DAvatar />
                        </div>

                        <motion.div
                            className="absolute bottom-10 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 border border-white/10 backdrop-blur-md rounded-lg pointer-events-none"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-white text-xs font-minecraft tracking-wider">ONLINE</span>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>

                <motion.div
                    className="relative mt-12 lg:absolute lg:bottom-10 lg:mt-0 lg:left-1/2 lg:-translate-x-1/2 flex flex-col items-center gap-3 text-white/50 cursor-pointer hover:text-white transition-colors"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <span className="text-xs font-minecraft tracking-widest uppercase">Start Journey</span>
                    <ArrowDown className="w-5 h-5" />
                </motion.div>
            </div>
        </section>
    );
};
