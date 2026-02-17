import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loadingTips = [
    "Building terrain...",
    "Spawning mobs...",
    "Loading textures...",
    "Generating structures...",
    "Planting trees...",
    "Filling oceans...",
    "Creating biomes...",
    "Adding finishing touches...",
];

export const MinecraftLoading = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [currentTip, setCurrentTip] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 200);

        // Rotate tips
        const tipInterval = setInterval(() => {
            setCurrentTip((prev) => (prev + 1) % loadingTips.length);
        }, 1500);

        return () => {
            clearInterval(progressInterval);
            clearInterval(tipInterval);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="minecraft-loading"
        >
            {/* Background blocks */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
                <div className="absolute inset-0 grid grid-cols-12 gap-1">
                    {Array.from({ length: 144 }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{
                                duration: 2,
                                delay: Math.random() * 2,
                                repeat: Infinity,
                            }}
                            className="aspect-square bg-gray-700"
                        />
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Logo/Title */}
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-4xl md:text-6xl font-minecraft text-emerald-400 mb-8"
                    style={{
                        textShadow: "3px 3px 0 #0a5a2a, 6px 6px 0 rgba(0,0,0,0.3)"
                    }}
                >
                    MITHUN
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-muted-foreground font-minecraft mb-8"
                >
                    AI Developer & Fullstack Developer Portfolio
                </motion.p>

                {/* Loading bar container */}
                <div className="w-80 max-w-full px-4">
                    <div className="minecraft-loading-bar">
                        <motion.div
                            className="minecraft-loading-bar-fill"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                    </div>

                    {/* Progress text */}
                    <div className="flex justify-between mt-2 text-sm font-minecraft">
                        <span className="text-muted-foreground">Loading world...</span>
                        <span className="text-emerald-400">{Math.round(Math.min(progress, 100))}%</span>
                    </div>
                </div>

                {/* Loading tips */}
                <div className="h-8 mt-6">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={currentTip}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-muted-foreground text-sm font-minecraft"
                        >
                            {loadingTips[currentTip]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* Animated blocks */}
                <div className="flex gap-2 mt-8">
                    {["#4ade80", "#22c55e", "#16a34a", "#15803d", "#166534"].map((color, i) => (
                        <motion.div
                            key={i}
                            className="w-4 h-4 rounded-sm"
                            style={{ backgroundColor: color }}
                            animate={{
                                y: [0, -10, 0],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 0.6,
                                delay: i * 0.1,
                                repeat: Infinity,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Footer hint */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 text-xs text-muted-foreground font-minecraft"
            >
                Press any key or wait...
            </motion.p>
        </motion.div>
    );
};
