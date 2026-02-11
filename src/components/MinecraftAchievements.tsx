import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Trophy, Star, Award, Medal, Target, Zap } from "lucide-react";

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    type: "goal" | "task" | "challenge";
    rarity: "common" | "uncommon" | "rare" | "epic";
    unlocked: boolean;
}

const achievements: Achievement[] = [
    {
        id: "1",
        title: "First Blood",
        description: "Completed first AI/ML project",
        icon: <Target className="w-5 h-5" />,
        type: "goal",
        rarity: "common",
        unlocked: true,
    },
    {
        id: "2",
        title: "Stone Miner",
        description: "Built 5+ projects using Python",
        icon: <Zap className="w-5 h-5" />,
        type: "task",
        rarity: "uncommon",
        unlocked: true,
    },
    {
        id: "3",
        title: "Iron Will",
        description: "Completed internship program",
        icon: <Medal className="w-5 h-5" />,
        type: "challenge",
        rarity: "rare",
        unlocked: true,
    },
    {
        id: "4",
        title: "Diamond Hands",
        description: "Maintained 7.9+ CGPA throughout",
        icon: <Star className="w-5 h-5" />,
        type: "goal",
        rarity: "epic",
        unlocked: true,
    },
    {
        id: "5",
        title: "Redstone Engineer",
        description: "Built autonomous rover systems",
        icon: <Zap className="w-5 h-5" />,
        type: "challenge",
        rarity: "epic",
        unlocked: true,
    },
    {
        id: "6",
        title: "Enchanter",
        description: "Mastered 3+ programming languages",
        icon: <Award className="w-5 h-5" />,
        type: "task",
        rarity: "rare",
        unlocked: true,
    },
];

const rarityStyles = {
    common: {
        border: "border-gray-500",
        bg: "bg-gray-500/10",
        text: "text-gray-400",
        glow: "",
    },
    uncommon: {
        border: "border-green-500",
        bg: "bg-green-500/10",
        text: "text-green-400",
        glow: "shadow-[0_0_15px_rgba(34,197,94,0.3)]",
    },
    rare: {
        border: "border-blue-500",
        bg: "bg-blue-500/10",
        text: "text-blue-400",
        glow: "shadow-[0_0_20px_rgba(59,130,246,0.4)]",
    },
    epic: {
        border: "border-purple-500",
        bg: "bg-purple-500/10",
        text: "text-purple-400",
        glow: "shadow-[0_0_25px_rgba(168,85,247,0.5)]",
    },
};

// Achievement toast notification
const AchievementToast = ({ achievement, onClose }: { achievement: Achievement; onClose: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const style = rarityStyles[achievement.rarity];

    return (
        <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className={`minecraft-achievement flex items-center gap-4 p-4 rounded-lg ${style.glow}`}
        >
            <div className={`p-3 rounded-lg ${style.bg} ${style.text}`}>
                {achievement.icon}
            </div>
            <div>
                <p className="text-xs text-yellow-500 font-minecraft mb-1">Achievement Unlocked!</p>
                <p className="font-semibold text-foreground">{achievement.title}</p>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
            </div>
        </motion.div>
    );
};

const AchievementCard = ({ achievement, index, onHover }: {
    achievement: Achievement;
    index: number;
    onHover: () => void;
}) => {
    const style = rarityStyles[achievement.rarity];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            onHoverStart={onHover}
            className={`minecraft-card p-4 rounded-lg border-2 ${style.border} ${style.glow} cursor-pointer group relative overflow-hidden`}
        >
            {/* Shimmer effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>

            <div className="flex items-start gap-3 relative z-10">
                <div className={`p-2 rounded-lg ${style.bg}`}>
                    <div className={style.text}>{achievement.icon}</div>
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                        <span className={`text-xs font-minecraft ${style.text} capitalize`}>
                            [{achievement.rarity}]
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                </div>
            </div>

            {/* Checkmark for unlocked */}
            {achievement.unlocked && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            )}
        </motion.div>
    );
};

export const MinecraftAchievements = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [showToast, setShowToast] = useState<Achievement | null>(null);
    const [hasShownInitialToast, setHasShownInitialToast] = useState(false);

    // Show initial achievement toast when section comes into view
    useEffect(() => {
        if (isInView && !hasShownInitialToast) {
            const timer = setTimeout(() => {
                setShowToast(achievements[3]); // Show epic achievement
                setHasShownInitialToast(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isInView, hasShownInitialToast]);

    const handleHover = (achievement: Achievement) => {
        if (!showToast) {
            setShowToast(achievement);
        }
    };

    return (
        <section id="achievements" className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            {/* Toast notifications */}
            <div className="fixed top-24 right-4 z-50">
                <AnimatePresence>
                    {showToast && (
                        <AchievementToast
                            achievement={showToast}
                            onClose={() => setShowToast(null)}
                        />
                    )}
                </AnimatePresence>
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
                        <Trophy className="w-5 h-5 text-yellow-400" />
                        <span className="font-minecraft text-yellow-300">Advancements</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        My <span className="minecraft-text-gradient">Achievements</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Milestones and accomplishments unlocked throughout my journey
                    </p>

                    {/* Achievement progress */}
                    <div className="max-w-md mx-auto mt-8">
                        <div className="flex justify-between text-sm text-muted-foreground mb-2">
                            <span className="font-minecraft">Achievements Unlocked</span>
                            <span className="text-yellow-400 font-minecraft">{achievements.filter(a => a.unlocked).length}/{achievements.length}</span>
                        </div>
                        <div className="minecraft-xp-bar">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={isInView ? { width: `${(achievements.filter(a => a.unlocked).length / achievements.length) * 100}%` } : { width: 0 }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500"
                                style={{ boxShadow: "0 0 10px rgba(253, 224, 71, 0.5)" }}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Achievements Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {achievements.map((achievement, index) => (
                        <AchievementCard
                            key={achievement.id}
                            achievement={achievement}
                            index={index}
                            onHover={() => handleHover(achievement)}
                        />
                    ))}
                </div>

                {/* Hint text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.5 }}
                    className="text-center text-muted-foreground text-sm mt-8 font-minecraft"
                >
                    Hover over achievements to see toast notifications
                </motion.p>
            </div>
        </section>
    );
};
