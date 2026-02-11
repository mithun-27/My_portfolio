import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
    Code2,
    Globe,
    Brain,
    Wrench,
    Zap,
    Cpu,
    Sparkles
} from "lucide-react";

const skillCategories = [
    {
        title: "Programming",
        icon: Code2,
        ore: "diamond",
        enchantLevel: "III",
        skills: ["Python", "Java (Basics)", "C++", "Embedded C", "SQL"],
    },
    {
        title: "Web Development",
        icon: Globe,
        ore: "emerald",
        enchantLevel: "IV",
        skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Next.js"],
    },
    {
        title: "AI / ML",
        icon: Brain,
        ore: "diamond",
        enchantLevel: "V",
        skills: ["Machine Learning", "NLP", "Computer Vision", "TensorFlow"],
    },
    {
        title: "Tools & Platforms",
        icon: Wrench,
        ore: "gold",
        enchantLevel: "II",
        skills: ["Git", "VS Code", "Jupyter", "Anaconda", "Arduino IDE", "Power BI"],
    },
    {
        title: "Automation",
        icon: Zap,
        ore: "redstone",
        enchantLevel: "III",
        skills: ["n8n", "Zapier", "Power Automate", "MCP"],
    },
    {
        title: "Hardware",
        icon: Cpu,
        ore: "iron",
        enchantLevel: "II",
        skills: ["Arduino", "ESP32", "Raspberry Pi", "Sensors", "IoT"],
    },
];

// Enchantment table symbols
const enchantmentSymbols = ["ᔑ", "ʖ", "ᓵ", "↸", "ᒷ", "⎓", "⊣", "⍑", "╎", "⋮", "ꖌ", "ꖎ", "ᒲ", "リ", "𝙹", "!¡", "ᑑ", "∷", "ᓭ", "ℸ", "⚍", "⊐", "∴", "̇/", "||", "⨅"];

const FloatingRunes = () => {
    const runes = Array.from({ length: 15 }, (_, i) => ({
        symbol: enchantmentSymbols[Math.floor(Math.random() * enchantmentSymbols.length)],
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 4}s`,
        duration: `${3 + Math.random() * 2}s`,
    }));

    return (
        <div className="enchantment-runes">
            {runes.map((rune, i) => (
                <span
                    key={i}
                    className="rune"
                    style={{
                        left: rune.left,
                        top: `${Math.random() * 100}%`,
                        animationDelay: rune.animationDelay,
                        animationDuration: rune.duration,
                    }}
                >
                    {rune.symbol}
                </span>
            ))}
        </div>
    );
};

export const MinecraftSkills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, rotateX: -15 },
        visible: { opacity: 1, y: 0, rotateX: 0 },
    };

    return (
        <section id="skills" className="relative py-24 overflow-hidden">
            {/* Background enchantment particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />
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
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        <span className="font-minecraft text-purple-300">Enchantment Table</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        My <span className="minecraft-text-gradient">Skills</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Enchanted abilities spanning from low-level hardware to cutting-edge AI
                    </p>

                    {/* XP Bar */}
                    <div className="max-w-md mx-auto mt-8">
                        <div className="flex justify-between text-sm text-muted-foreground mb-2">
                            <span className="font-minecraft">Experience Level</span>
                            <span className="text-emerald-400 font-minecraft">42</span>
                        </div>
                        <div className="minecraft-xp-bar">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={isInView ? { width: "75%" } : { width: 0 }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                className="minecraft-xp-bar-fill"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {skillCategories.map((category) => (
                        <motion.div
                            key={category.title}
                            variants={cardVariants}
                            whileHover={{ scale: 1.02, y: -5 }}
                            onHoverStart={() => setHoveredCard(category.title)}
                            onHoverEnd={() => setHoveredCard(null)}
                            className={`minecraft-skill-card p-6 rounded-lg enchantment-glow relative group`}
                        >
                            {/* Floating runes on hover */}
                            {hoveredCard === category.title && <FloatingRunes />}

                            {/* Header */}
                            <div className="flex items-center justify-between mb-4 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className={`p-3 rounded-lg ore-${category.ore}`}>
                                        <category.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground font-minecraft">
                                            {category.title}
                                        </h3>
                                        <span className="text-xs text-purple-400">
                                            Enchantment Level {category.enchantLevel}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Skills as enchanted books */}
                            <div className="flex flex-wrap gap-2 relative z-10">
                                {category.skills.map((skill, i) => (
                                    <motion.span
                                        key={skill}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        whileHover={{
                                            scale: 1.1,
                                            boxShadow: "0 0 15px rgba(168, 85, 247, 0.4)"
                                        }}
                                        className="px-3 py-1 text-sm bg-purple-900/30 border border-purple-500/30 rounded text-purple-200 cursor-default transition-all"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>

                            {/* Decorative corner */}
                            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                                <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-transparent rotate-45" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
