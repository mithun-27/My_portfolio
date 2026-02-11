import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home,
    User,
    Sparkles,
    FolderGit2,
    Briefcase,
    Trophy,
    Mail,
    Menu,
    X,
    Pickaxe
} from "lucide-react";

interface HotbarItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    section: string;
}

const hotbarItems: HotbarItem[] = [
    { id: "home", label: "Home", icon: <Home className="w-5 h-5" />, section: "home" },
    { id: "about", label: "About", icon: <User className="w-5 h-5" />, section: "about" },
    { id: "skills", label: "Skills", icon: <Sparkles className="w-5 h-5" />, section: "skills" },
    { id: "experience", label: "Experience", icon: <Pickaxe className="w-5 h-5" />, section: "experience" },
    { id: "projects", label: "Projects", icon: <FolderGit2 className="w-5 h-5" />, section: "projects" },
    { id: "profiles", label: "Profiles", icon: <Briefcase className="w-5 h-5" />, section: "profiles" },
    { id: "achievements", label: "Achievements", icon: <Trophy className="w-5 h-5" />, section: "achievements" },
    { id: "contact", label: "Contact", icon: <Mail className="w-5 h-5" />, section: "contact" },
];

export const Hotbar = () => {
    const [activeSlot, setActiveSlot] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Keyboard navigation (1-7 keys)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = parseInt(e.key);
            if (key >= 1 && key <= hotbarItems.length) {
                setActiveSlot(key - 1);
                const item = hotbarItems[key - 1];
                if (item.section === "home") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                    document.getElementById(item.section)?.scrollIntoView({ behavior: "smooth" });
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > lastScrollY && scrollY > 100) {
                setIsVisible(false); // Hide on scroll down
            } else {
                setIsVisible(true); // Show on scroll up
            }
            setLastScrollY(scrollY);

            // Detect active section
            const sections = hotbarItems.map((item) => {
                if (item.section === "home") return { id: item.id, top: 0 };
                const element = document.getElementById(item.section);
                return { id: item.id, top: element?.offsetTop || 0 };
            });

            const currentSection = sections.reduce((prev, curr) => {
                if (scrollY >= curr.top - 200) return curr;
                return prev;
            });

            const index = hotbarItems.findIndex((item) => item.id === currentSection.id);
            if (index !== -1) setActiveSlot(index);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const handleClick = (index: number) => {
        setActiveSlot(index);
        const item = hotbarItems[index];
        if (item.section === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            document.getElementById(item.section)?.scrollIntoView({ behavior: "smooth" });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Desktop Hotbar (Vertical Left Sidebar) */}
            <motion.nav
                initial={{ x: -100, opacity: 0 }}
                animate={{
                    x: isVisible ? 0 : -100,
                    opacity: isVisible ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="fixed top-24 left-6 z-50 hidden md:block"
            >
                <div className="minecraft-hotbar p-2 flex flex-col gap-1 items-center">
                    {hotbarItems.map((item, index) => (
                        <HotbarSlot
                            key={item.id}
                            item={item}
                            index={index}
                            isActive={activeSlot === index}
                            onClick={() => handleClick(index)}
                        />
                    ))}
                </div>

                {/* Hotbar hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-4 w-max pointer-events-none"
                >
                    <div className="bg-black/80 text-white text-[10px] px-2 py-1 rounded font-minecraft rotate-90 origin-left translate-y-20 translate-x-[-10px] opacity-50">
                        1-8 to navigate
                    </div>
                </motion.div>
            </motion.nav>

            {/* Mobile Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 right-0 z-50 md:hidden"
            >
                <div className="minecraft-hotbar m-4 p-3 flex items-center justify-between">
                    <span className="font-minecraft text-emerald-400 text-lg">MITHUN</span>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="minecraft-hotbar-slot !w-10 !h-10"
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="minecraft-hotbar mx-4 mb-4 overflow-hidden"
                        >
                            <div className="p-4 grid grid-cols-3 gap-2">
                                {hotbarItems.map((item, index) => (
                                    <motion.button
                                        key={item.id}
                                        onClick={() => handleClick(index)}
                                        whileTap={{ scale: 0.95 }}
                                        className={`minecraft-hotbar-slot !w-full !h-16 flex-col gap-1 ${activeSlot === index ? "active" : ""}`}
                                    >
                                        {item.icon}
                                        <span className="text-xs font-minecraft">{item.label}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
};

// Sub-component for individual slots with animation logic
const HotbarSlot = ({ item, index, isActive, onClick }: { item: HotbarItem, index: number, isActive: boolean, onClick: () => void }) => {
    // Particle burst state
    const [clickParticles, setClickParticles] = useState<{ id: number, x: number, y: number, color: string, rotate: number }[]>([]);

    const handleClick = () => {
        // Trigger particle effect
        const colors = ['#4ade80', '#ffffff', '#fcd34d', '#38bdf8', '#ef4444', '#a78bfa'];

        const newParticles = Array.from({ length: 12 }).map((_, i) => ({
            id: Date.now() + i,
            x: (Math.random() - 0.5) * 150, // Larger burst radius
            y: (Math.random() - 0.5) * 150,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotate: Math.random() * 360
        }));

        setClickParticles(newParticles);
        setTimeout(() => setClickParticles([]), 1000);

        onClick();
    };

    return (
        <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            className={`minecraft-hotbar-slot relative ${isActive ? "active" : ""}`}
            aria-label={item.label}
        >
            <span className="slot-number absolute top-1 left-1 text-[8px]">{index + 1}</span>

            <motion.div
                animate={{
                    scale: isActive ? 1.2 : 1,
                    color: isActive ? "#4ade80" : "#888",
                    rotate: isActive ? [0, -10, 10, -5, 5, 0] : 0
                }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                {item.icon}
            </motion.div>

            {/* Click Particles (Square Minecraft Style) */}
            <AnimatePresence>
                {clickParticles.map(p => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                        animate={{ opacity: 0, scale: 1.5, x: p.x, y: p.y, rotate: p.rotate }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute top-1/2 left-1/2 w-2 h-2 pointer-events-none rounded-sm"
                        style={{ backgroundColor: p.color, zIndex: 100 }}
                    />
                ))}
            </AnimatePresence>

            {/* Tooltip (Right Side) */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0, x: -20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.8 }}
                        className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/90 text-white text-sm rounded whitespace-nowrap font-minecraft border border-white/20 shadow-xl z-50 pointer-events-none"
                    >
                        {item.label}
                        {/* Little triangle arrow */}
                        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-black/90 rotate-45 border-l border-b border-white/20" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};
