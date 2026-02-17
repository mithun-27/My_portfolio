import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, MapPin, ExternalLink, Calendar, CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Experience {
    company: string;
    role: string;
    location: string;
    date: string;
    description: string;
    skills: string[];
    link: string;
    type: "Internship" | "Full-time";
    achievements: string[];
}

const experiences: Experience[] = [
    {
        company: "Quadrobay Technology",
        role: "AI Developer & Fullstack Developer",
        location: "Chennai, India (Onsite)",
        date: "2025 - Present",
        type: "Internship",
        description: "Worked as a stipend-based intern contributing to core product development. Developed and deployed 3+ major projects leveraging Fullstack technologies, AI capabilities, and modern UI design principles.",
        skills: ["React", "Node.js", "AI/ML", "UI Design", "Figma"],
        link: "https://quadrobay.com/",
        achievements: [
            "Developed 3+ Production-grade Projects",
            "Implemented AI-driven features",
            "Designed Modern UI interfaces",
            "Earned Performance-based Stipend"
        ]
    }
];

export const MinecraftExperience = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="experience" className="relative py-24 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl transform -translate-y-1/2" />
            </div>

            <div ref={ref} className="section-container relative z-10 max-w-4xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 minecraft-card rounded-lg mb-6">
                        <Briefcase className="w-5 h-5 text-yellow-400" />
                        <span className="font-minecraft text-yellow-300">Quest Log</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        Experience <span className="minecraft-text-gradient">Points</span>
                    </h2>
                    <p className="text-muted-foreground">
                        Completed quests and earned achievements
                    </p>
                </motion.div>

                {/* Experience Cards */}
                <div className="space-y-8">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="minecraft-card p-0 rounded-lg overflow-hidden group border-2 border-yellow-900/20 hover:border-yellow-500/50 transition-colors"
                        >
                            {/* Header Bar */}
                            <div className="bg-black/40 p-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-yellow-500/20 rounded-lg">
                                        <Briefcase className="w-6 h-6 text-yellow-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground font-minecraft">{exp.role}</h3>
                                        <a
                                            href={exp.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 text-sm"
                                        >
                                            @{exp.company} <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end text-sm text-muted-foreground font-minecraft text-right w-full md:w-auto ml-auto">
                                    <div className="flex items-center gap-2 flex-row-reverse">
                                        <Calendar className="w-4 h-4 text-yellow-500/50" />
                                        <span>{exp.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs opacity-70 flex-row-reverse">
                                        <MapPin className="w-3 h-3 text-emerald-500/50" />
                                        <span>{exp.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs opacity-70 flex-row-reverse">
                                        <Mail className="w-3 h-3 text-cyan-500/50" />
                                        <span>mithun.saravanan@quadrobay.com</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content Body */}
                            <div className="p-6 grid md:grid-cols-[1.5fr,1fr] gap-8">
                                <div className="space-y-6">
                                    <p className="text-gray-300 leading-relaxed">
                                        {exp.description}
                                    </p>

                                    <div>
                                        <h4 className="text-sm font-minecraft text-yellow-400 mb-3 uppercase tracking-wider">Quest Rewards</h4>
                                        <ul className="space-y-2">
                                            {exp.achievements.map((achievement, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                                                    {achievement}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-minecraft text-cyan-400 mb-3 uppercase tracking-wider">Tools Equipped</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {exp.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-xs text-cyan-300 font-minecraft"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-xs font-minecraft text-emerald-400">Status: Completed</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Successfully delivered 3+ full-stack projects during tenure.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Locked Next Quest */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 0.5 } : {}}
                        transition={{ delay: 0.5 }}
                        className="minecraft-card p-6 rounded-lg border-2 border-dashed border-gray-700 flex items-center justify-center gap-4 group hover:opacity-80 transition-opacity cursor-not-allowed"
                    >
                        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                            <span className="text-gray-500 text-xl font-minecraft">?</span>
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="font-minecraft text-gray-500">Next Quest Locked</h3>
                            <p className="text-xs text-gray-600">Open to new opportunities...</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
