import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, Calendar, Heart, Shield, Swords } from "lucide-react";

// Minecraft heart component
const HealthBar = ({ current, max }: { current: number; max: number }) => {
    return (
        <div className="flex gap-1">
            {Array.from({ length: max }).map((_, i) => (
                <div key={i} className="relative">
                    <Heart
                        className={`w-5 h-5 ${i < current ? 'text-red-500 fill-red-500' : 'text-gray-600 fill-gray-600/30'}`}
                    />
                    {i < current && (
                        <motion.div
                            className="absolute inset-0"
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                        >
                            <Heart className="w-5 h-5 text-red-400 fill-red-400 opacity-50" />
                        </motion.div>
                    )}
                </div>
            ))}
        </div>
    );
};

// Minecraft armor bar
const ArmorBar = ({ level }: { level: number }) => {
    return (
        <div className="flex gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
                <Shield
                    key={i}
                    className={`w-4 h-4 ${i < level ? 'text-cyan-400 fill-cyan-400/50' : 'text-gray-600'}`}
                />
            ))}
        </div>
    );
};

// Stats display
const StatItem = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05, x: 5 }}
            className="flex items-center gap-3 p-3 minecraft-card rounded-lg"
        >
            <div className="p-2 bg-emerald-500/20 rounded">
                {icon}
            </div>
            <div>
                <p className="text-xs text-muted-foreground font-minecraft">{label}</p>
                <p className="text-lg font-bold text-foreground">{value}</p>
            </div>
        </motion.div>
    );
};

export const MinecraftAbout = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div ref={ref} className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 minecraft-card rounded-lg mb-6">
                        <Swords className="w-5 h-5 text-emerald-400" />
                        <span className="font-minecraft text-emerald-300">Player Stats</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        About <span className="minecraft-text-gradient">Me</span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left side - Player card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="minecraft-card p-6 rounded-lg">
                            {/* Player name plate */}
                            <div className="flex items-center gap-4 mb-6">
                                {/* Voxel avatar placeholder */}
                                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-emerald-500 rounded-lg flex items-center justify-center overflow-hidden">
                                    <div className="grid grid-cols-3 grid-rows-3 gap-0.5 w-12 h-12">
                                        {/* Simple voxel face */}
                                        <div className="bg-amber-200" />
                                        <div className="bg-amber-200" />
                                        <div className="bg-amber-200" />
                                        <div className="bg-amber-200" />
                                        <div className="bg-amber-200" />
                                        <div className="bg-amber-200" />
                                        <div className="bg-amber-200" />
                                        <div className="bg-amber-200" />
                                        <div className="bg-amber-200" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-minecraft text-emerald-400">Mithun</h3>
                                    <p className="text-muted-foreground font-minecraft text-sm">AI & ML Engineer</p>
                                    <div className="flex gap-1 mt-1">
                                        <span className="px-2 py-0.5 text-xs bg-emerald-500/20 text-emerald-400 rounded font-minecraft">
                                            LVL 42
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Health and armor */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-muted-foreground w-16 font-minecraft">Health</span>
                                    <HealthBar current={10} max={10} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-muted-foreground w-16 font-minecraft">Armor</span>
                                    <ArmorBar level={8} />
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="space-y-4 text-muted-foreground">
                                <p className="leading-relaxed">
                                    I am a <span className="text-foreground font-medium">B.Tech Artificial Intelligence & Data Science</span> student
                                    in my pre-final year with hands-on experience in{" "}
                                    <span className="text-cyan-400">machine learning</span>,{" "}
                                    <span className="text-purple-400">frontend development</span>, and{" "}
                                    <span className="text-emerald-400">embedded systems</span>.
                                </p>
                                <p className="leading-relaxed">
                                    I am passionate about building real-world AI solutions that create measurable impact.
                                    From developing intelligent automation systems to crafting beautiful user interfaces,
                                    I bring a unique blend of technical depth and creative problem-solving to every project.
                                </p>
                            </div>
                        </div>

                        {/* Stats grid */}
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <StatItem
                                label="Projects Built"
                                value="25+"
                                icon={<Swords className="w-4 h-4 text-emerald-400" />}
                            />
                            <StatItem
                                label="CGPA"
                                value="7.9"
                                icon={<GraduationCap className="w-4 h-4 text-cyan-400" />}
                            />
                        </div>
                    </motion.div>

                    {/* Right side - Education and achievements */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="space-y-6"
                    >
                        {/* Education Card */}
                        <div className="minecraft-card p-6 rounded-lg enchantment-glow">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-cyan-500/20 rounded-lg">
                                    <GraduationCap className="w-6 h-6 text-cyan-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-foreground mb-1 font-minecraft">
                                        B.Tech in AI & Data Science
                                    </h3>
                                    <p className="text-muted-foreground mb-4">
                                        Knowledge Institute of Technology, Salem
                                    </p>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="w-4 h-4 text-cyan-400" />
                                            <span>2022 - 2026 (Pre-final Year)</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <MapPin className="w-4 h-4 text-purple-400" />
                                            <span>Salem, Tamil Nadu, India</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* XP progress to graduation */}
                            <div className="mt-6">
                                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                                    <span className="font-minecraft">Progress to Graduation</span>
                                    <span className="text-emerald-400 font-minecraft">75%</span>
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
                        </div>

                        {/* Skills overview */}
                        <div className="minecraft-card p-6 rounded-lg">
                            <h4 className="font-minecraft text-lg text-emerald-400 mb-4">Equipped Skills</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {["AI/ML", "Python", "React", "Robotics", "IoT", "NLP"].map((skill, i) => (
                                    <motion.div
                                        key={skill}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                        className="flex items-center gap-2 p-2 bg-muted/30 rounded"
                                    >
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                                        <span className="text-sm text-foreground">{skill}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
