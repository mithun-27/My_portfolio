import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
    Github,
    Linkedin,
    Globe,
    Code2,
    ExternalLink,
    Users
} from "lucide-react";

const profiles = [
    {
        name: "GitHub",
        description: "Check out my repositories and open source contributions",
        icon: Github,
        url: "https://github.com/mithun-27",
        color: "from-gray-600 to-gray-800",
        stats: "15+ Repos",
    },
    {
        name: "LinkedIn",
        description: "Connect with me professionally",
        icon: Linkedin,
        url: "https://www.linkedin.com/in/mithun-s-732939280/",
        color: "from-blue-600 to-blue-800",
        stats: "500+ Connections",
    },
    {
        name: "LeetCode",
        description: "View my problem-solving skills",
        icon: Code2,
        url: "https://leetcode.com/u/mithun_27/",
        color: "from-orange-500 to-orange-700",
        stats: "100+ Problems",
    },
    {
        name: "Portfolio",
        description: "You're already here! Explore more",
        icon: Globe,
        url: "https://curiolabs.in",
        color: "from-emerald-500 to-emerald-700",
        stats: "25+ Projects",
    },
];

export const MinecraftProfiles = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="profiles" className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
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
                        <Users className="w-5 h-5 text-blue-400" />
                        <span className="font-minecraft text-blue-300">Player Profiles</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        Find Me <span className="minecraft-text-gradient">Online</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Connect with me across different platforms
                    </p>
                </motion.div>

                {/* Profiles Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {profiles.map((profile, index) => (
                        <motion.a
                            key={profile.name}
                            href={profile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="minecraft-card p-6 rounded-lg group relative overflow-hidden"
                        >
                            {/* Gradient background on hover */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${profile.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                            />

                            {/* Content */}
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-lg bg-gradient-to-br ${profile.color}`}>
                                        <profile.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <motion.div
                                        whileHover={{ rotate: 45, scale: 1.2 }}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                                    </motion.div>
                                </div>

                                <h3 className="font-semibold text-foreground mb-2 group-hover:text-emerald-400 transition-colors">
                                    {profile.name}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                    {profile.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-minecraft text-emerald-400">
                                        {profile.stats}
                                    </span>
                                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                                        Visit →
                                    </span>
                                </div>
                            </div>

                            {/* Corner decoration */}
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-emerald-400/20 to-transparent rotate-45 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};
