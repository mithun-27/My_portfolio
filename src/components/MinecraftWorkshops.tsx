import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { BookOpen, Users, GraduationCap, Trophy } from "lucide-react";

// Image paths from public/images
const galleryImages = [
    "/images/workshop_1.jpg",
    "/images/workshop_2.jpg",
    "/images/workshop_3.jpg",
    "/images/workshop_4.jpg",
    "/images/workshop_5.jpg",
    "/images/workshop_6.jpg",
    "/images/workshop_7.jpg",
    "/images/workshop_8.jpg",
    "/images/workshop_9.png",
];

const StatCard = ({ icon: Icon, value, label, color, delay }: any) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            const duration = 2000; // 2 seconds
            const steps = 60;
            const stepTime = duration / steps;
            const inc = value / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += inc;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, stepTime);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay, duration: 0.5, type: "spring" }}
            className="flex flex-col items-center p-6 bg-black/40 border-2 border-white/10 rounded-xl backdrop-blur-sm hover:bg-black/60 hover:border-white/30 transition-all group"
            style={{ borderColor: color }}
        >
            <div className={`p-4 rounded-full bg-opacity-20 mb-4 group-hover:scale-110 transition-transform`} style={{ backgroundColor: color }}>
                <Icon className="w-8 h-8" style={{ color }} />
            </div>
            <div className="text-4xl font-bold font-minecraft mb-2 text-white">
                {count}+
            </div>
            <div className="text-gray-400 font-minecraft text-sm tracking-wide text-center">
                {label}
            </div>
        </motion.div>
    );
};

export const MinecraftWorkshops = () => {
    return (
        <section id="workshops" className="py-20 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1e293b]/50 to-[#0f172a]/50 pointer-events-none" />

            <div className="section-container relative z-10 max-w-7xl mx-auto px-4">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
                        <BookOpen className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-minecraft text-purple-300">Training Grounds</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Awareness</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Empowering the next generation with the tools of the future.
                        Spreading knowledge across schools and colleges.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 max-w-2xl mx-auto">
                    <StatCard
                        icon={Users}
                        value={1000}
                        label="Students Trained"
                        color="#4ade80"
                        delay={0.1}
                    />
                    <StatCard
                        icon={GraduationCap}
                        value={100}
                        label="Teachers Empowered"
                        color="#f472b6"
                        delay={0.2}
                    />
                </div>

                {/* Gallery */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                            className="relative group cursor-pointer"
                        >
                            {/* Minecraft Painting Frame */}
                            <div className="absolute -inset-2 bg-[#5d4037] rounded-lg transform translate-y-1 translate-x-1" />
                            <div className="absolute -inset-2 bg-[#8d6e63] rounded-lg" />

                            <div className="relative aspect-video overflow-hidden rounded border-4 border-[#3e2723] bg-[#2d1e18]">
                                <img
                                    src={src}
                                    alt={`Workshop ${index + 1}`}
                                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};
