import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Package, Pickaxe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
    title: string;
    description: string;
    tags: string[];
    ore: "diamond" | "emerald" | "gold" | "iron" | "redstone" | "lapis";
    rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";
    link: string;
}

const projects: Project[] = [
    {
        title: "Sentiment Analysis Engine",
        description: "Advanced NLP system for analyzing text sentiment using machine learning algorithms and natural language processing techniques.",
        tags: ["Python", "NLP", "Machine Learning", "NLTK"],
        ore: "diamond",
        rarity: "Legendary",
        link: "https://github.com/mithun-27/sentiment_analysis",
    },
    {
        title: "Image Classifier",
        description: "Deep learning image classification system built with transfer learning for accurate visual recognition tasks.",
        tags: ["Python", "TensorFlow", "Transfer Learning", "CNN"],
        ore: "emerald",
        rarity: "Epic",
        link: "https://github.com/mithun-27/Image_classifier",
    },
    {
        title: "Spam Detection System",
        description: "Multi-modal spam detection for SMS, Email, OCR text extraction, and PDF documents with high accuracy.",
        tags: ["Python", "ML", "OCR", "PDF Processing"],
        ore: "gold",
        rarity: "Rare",
        link: "https://github.com/mithun-27/Spam_Detection_System",
    },
    {
        title: "AI Stock Price Predictor",
        description: "Machine learning web application for predicting stock market trends using historical data analysis.",
        tags: ["Python", "ML", "Web App", "Data Science"],
        ore: "diamond",
        rarity: "Epic",
        link: "https://github.com/mithun-27/AI_Stock_Predictor",
    },
    {
        title: "Landslide Detection Rover",
        description: "Autonomous rover system equipped with sensors for early landslide detection and terrain monitoring.",
        tags: ["Arduino", "ESP32", "Sensors", "IoT"],
        ore: "redstone",
        rarity: "Legendary",
        link: "https://github.com/mithun-27", // Repo not found, linking to profile
    },
    {
        title: "AI Water Cleaning Rover",
        description: "Autonomous AI-powered rover for water body cleaning with intelligent navigation and debris collection.",
        tags: ["AI", "Robotics", "Arduino", "Computer Vision"],
        ore: "emerald",
        rarity: "Legendary",
        link: "https://github.com/mithun-27", // Repo not found, linking to profile
    },
];

const rarityColors = {
    Common: "text-gray-400",
    Uncommon: "text-green-400",
    Rare: "text-blue-400",
    Epic: "text-purple-400",
    Legendary: "text-orange-400",
};

const oreGradients = {
    diamond: "from-cyan-400 via-cyan-500 to-cyan-600",
    emerald: "from-emerald-400 via-emerald-500 to-emerald-600",
    gold: "from-yellow-400 via-yellow-500 to-amber-500",
    iron: "from-gray-300 via-gray-400 to-gray-500",
    redstone: "from-red-400 via-red-500 to-red-600",
    lapis: "from-blue-400 via-blue-500 to-indigo-500",
};

// Mining crack overlay
const MiningCracks = ({ progress }: { progress: number }) => {
    if (progress === 0) return null;

    return (
        <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 L30 25 L20 50 L40 45 L35 70 L50 60 L45 90' stroke='%23000' stroke-width='2' fill='none' opacity='${progress}'/%3E%3Cpath d='M90 20 L70 35 L80 55 L60 50 L65 75 L50 85' stroke='%23000' stroke-width='2' fill='none' opacity='${progress}'/%3E%3C/svg%3E")`,
                opacity: progress,
            }}
        />
    );
};

const ProjectChest = ({ project, index }: { project: Project; index: number }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [miningProgress, setMiningProgress] = useState(0);
    const [isMining, setIsMining] = useState(false);

    const startMining = () => {
        setIsMining(true);
        let progress = 0;
        const interval = setInterval(() => {
            progress += 0.05; // Slightly slower for better feel
            setMiningProgress(prev => {
                const next = prev + 0.05;
                if (next >= 1) {
                    clearInterval(interval);
                    setIsOpen(true);
                    setIsMining(false);
                    return 1;
                }
                return next;
            });
        }, 100);

        const stopMining = () => {
            clearInterval(interval);
            setIsMining(false);
            setMiningProgress(0);
            window.removeEventListener("mouseup", stopMining);
            window.removeEventListener("touchend", stopMining);
            window.removeEventListener("touchcancel", stopMining);
        };

        window.addEventListener("mouseup", stopMining);
        window.addEventListener("touchend", stopMining);
        window.addEventListener("touchcancel", stopMining);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
        >
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    // Ore block (closed state)
                    <motion.div
                        key="ore"
                        initial={{ rotateY: 0 }}
                        exit={{ rotateY: 90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onMouseDown={startMining}
                        onTouchStart={startMining}
                        onContextMenu={(e) => e.preventDefault()}
                        className={`relative h-64 rounded-lg bg-gradient-to-br ${oreGradients[project.ore]} cursor-pointer overflow-hidden touch-none`}
                        style={{
                            boxShadow: isMining
                                ? `0 0 30px rgba(255,255,255,0.5), inset 0 0 20px rgba(0,0,0,0.3)`
                                : `inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -4px 0 rgba(0,0,0,0.3), 0 4px 15px rgba(0,0,0,0.4)`
                        }}
                    >
                        {/* Mining cracks overlay */}
                        <MiningCracks progress={miningProgress} />

                        {/* Ore sparkles */}
                        <div className="absolute inset-0 overflow-hidden">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 bg-white rounded-full"
                                    style={{
                                        left: `${20 + Math.random() * 60}%`,
                                        top: `${20 + Math.random() * 60}%`,
                                    }}
                                    animate={{
                                        opacity: [0.3, 1, 0.3],
                                        scale: [0.8, 1.2, 0.8],
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: i * 0.3,
                                        repeat: Infinity,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Center icon */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.div
                                animate={isMining ? { rotate: [-10, 10, -10], scale: [1, 1.1, 1] } : {}}
                                transition={{ duration: 0.2, repeat: isMining ? Infinity : 0 }}
                            >
                                <Pickaxe className="w-12 h-12 text-white/80 mb-4" />
                            </motion.div>
                            <h3 className="text-lg font-minecraft text-white text-center px-4 drop-shadow-lg">
                                {project.title}
                            </h3>
                            <span className={`text-sm font-minecraft mt-2 ${rarityColors[project.rarity]}`}>
                                [{project.rarity}]
                            </span>
                        </div>

                        {/* Mining progress bar */}
                        {isMining && (
                            <div className="absolute bottom-4 left-4 right-4">
                                <div className="h-2 bg-black/50 rounded overflow-hidden">
                                    <motion.div
                                        className="h-full bg-white"
                                        style={{ width: `${miningProgress * 100}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Hint text */}
                        <div className="absolute bottom-4 left-4 right-4 text-center">
                            {!isMining && (
                                <span className="text-white/60 text-sm font-minecraft">
                                    Hold to mine
                                </span>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    // Open chest (revealed state)
                    <motion.div
                        key="chest"
                        initial={{ rotateY: -90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="minecraft-card p-6 h-64 flex flex-col relative overflow-hidden"
                    >
                        {/* Glowing particles */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className={`absolute w-1 h-1 rounded-full bg-gradient-to-t ${oreGradients[project.ore]}`}
                                    initial={{ y: "100%", x: `${10 + i * 12}%`, opacity: 0 }}
                                    animate={{
                                        y: "-100%",
                                        opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: i * 0.2,
                                        repeat: Infinity,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Content */}
                        <div className="flex items-start justify-between mb-3 relative z-10">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${oreGradients[project.ore]}`}>
                                <Package className="w-5 h-5 text-white" />
                            </div>
                            <span className={`text-xs font-minecraft ${rarityColors[project.rarity]}`}>
                                {project.rarity}
                            </span>
                        </div>

                        <h3 className="text-lg font-semibold text-foreground mb-2 relative z-10">
                            {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 flex-grow relative z-10">
                            {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4 relative z-10">
                            {project.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Button */}
                        <Button
                            variant="outline"
                            size="sm"
                            className="minecraft-btn-secondary w-full relative z-10"
                            onClick={() => window.open(project.link, '_blank')}
                        >
                            <Github className="mr-2 w-4 h-4" />
                            View on GitHub
                            <ExternalLink className="ml-auto w-3 h-3" />
                        </Button>

                        {/* Close button */}
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                setMiningProgress(0);
                            }}
                            className="absolute top-2 right-2 text-muted-foreground hover:text-white text-xs font-minecraft z-10"
                        >
                            [×]
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export const MinecraftProjects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="projects" className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
            </div>

            <div ref={ref} className="section-container relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 minecraft-card rounded-lg mb-6">
                        <Pickaxe className="w-5 h-5 text-cyan-400" />
                        <span className="font-minecraft text-cyan-300">Mining Station</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        Featured <span className="minecraft-text-gradient">Projects</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
                        Mine rare ores to discover my AI, ML, and robotics projects
                    </p>

                    {/* Legend */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                        {Object.entries(rarityColors).map(([rarity, color]) => (
                            <span key={rarity} className={`text-xs font-minecraft ${color}`}>
                                [{rarity}]
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <ProjectChest key={project.title} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};
