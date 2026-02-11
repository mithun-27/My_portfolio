import { motion } from "framer-motion";
import { Heart } from "lucide-react";

import { MinecraftJumpGame } from "./minecraft/MinecraftJumpGame";

export const MinecraftFooter = () => {
    return (
        <footer className="relative py-4">
            {/* Pixelated top border */}
            <div className="absolute top-0 left-0 right-0 h-4 minecraft-border-top z-10" />

            {/* Minigame Overlay - Runs ON the border */}
            <div className="absolute top-[-155px] left-0 right-0 z-20 pointer-events-none flex justify-center">
                <div className="w-full max-w-4xl pointer-events-auto">
                    <MinecraftJumpGame />
                </div>
            </div>

            <div className="section-container relative z-10 pt-4">

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3"
                    >
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded flex items-center justify-center">
                            <span className="font-minecraft text-lg text-white">M</span>
                        </div>
                        <div>
                            <span className="font-minecraft text-base text-emerald-400">MITHUN</span>
                            <p className="text-[10px] text-muted-foreground">AI & ML Engineer</p>
                        </div>
                    </motion.div>

                    {/* Made with love */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-muted-foreground text-xs"
                    >
                        <span>Crafted with</span>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                        </motion.div>
                        <span>by Mithun</span>
                    </motion.div>

                    {/* Copyright */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-[10px] text-muted-foreground font-minecraft"
                    >
                        © 2024 All Rights Reserved
                    </motion.div>
                </div>

                {/* Fun Minecraft reference */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 1 }}
                    className="text-center text-[10px] text-muted-foreground mt-2 font-minecraft"
                >
                    "The only limit is your imagination" - Block by Block
                </motion.p>
            </div>
        </footer>
    );
};
