import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Github, Linkedin, Code, Globe, Send, MessageSquare, MapPin } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/mithun-27", color: "hover:text-gray-400" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/mithun-s-732939280/", color: "hover:text-blue-400" },
    { icon: Code, label: "LeetCode", href: "https://leetcode.com/u/mithun_27/", color: "hover:text-yellow-400" },
    { icon: Globe, label: "Curiolabs", href: "https://curiolabs.in", color: "hover:text-emerald-400" },
];

export const MinecraftContact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // 1. Save to Firestore (Database Backup)
            await addDoc(collection(db, "messages"), {
                ...formData,
                timestamp: new Date()
            });

            // 2. Send Email via EmailJS
            // REPLACE THESE WITH YOUR ACTUAL KEYS FROM https://www.emailjs.com/
            const SERVICE_ID = "service_t0v19g6"; // ✅ You created this!
            const TEMPLATE_ID = "template_9aolzn5"; // 🔍 Go to "Email Templates" tab on the left -> Create New Template -> ID is at the top
            const PUBLIC_KEY = "Y9BMLWRMQIxl3qSPV"; // 🔑 Click your Name (top right) -> "Account" -> Copy "Public Key"

            try {
                await emailjs.send(
                    SERVICE_ID,
                    TEMPLATE_ID,
                    {
                        to_name: "Mithun",
                        from_name: formData.name,
                        from_email: formData.email,
                        message: formData.message,
                        reply_to: formData.email,
                    },
                    PUBLIC_KEY
                );
                console.log("Email sent successfully!");
            } catch (emailError) {
                console.error("Failed to send email:", emailError);
                // We don't block success if only email fails, as DB saved it.
            }

            setIsSubmitting(false);
            setSubmitted(true);
            setFormData({ name: "", email: "", message: "" }); // Reset form
        } catch (error) {
            console.error("Error sending message: ", error);
            setIsSubmitting(false);
            // Optionally handle error state here
        }
    };

    return (
        <section id="contact" className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
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
                        <MessageSquare className="w-5 h-5 text-emerald-400" />
                        <span className="font-minecraft text-emerald-300">Send Message</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        Get in <span className="minecraft-text-gradient">Touch</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Ready to craft something amazing together? Drop me a message!
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="minecraft-card p-6 rounded-lg">
                            <h3 className="font-minecraft text-lg text-emerald-400 mb-6 flex items-center gap-2">
                                <Send className="w-5 h-5" />
                                Send Message
                            </h3>

                            {submitted ? (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-16 h-16 bg-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h4 className="font-minecraft text-emerald-400 text-lg mb-2">Message Sent!</h4>
                                    <p className="text-muted-foreground">Thanks for reaching out. I'll get back to you soon!</p>
                                    <Button
                                        onClick={() => setSubmitted(false)}
                                        className="minecraft-btn-secondary mt-4"
                                    >
                                        Send Another
                                    </Button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-minecraft text-muted-foreground mb-2">
                                            Player Name
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="Enter your name"
                                            className="minecraft-card border-2 border-gray-600 focus:border-emerald-400"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-minecraft text-muted-foreground mb-2">
                                            Email Address
                                        </label>
                                        <Input
                                            type="email"
                                            placeholder="your@email.com"
                                            className="minecraft-card border-2 border-gray-600 focus:border-emerald-400"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-minecraft text-muted-foreground mb-2">
                                            Your Message
                                        </label>
                                        <Textarea
                                            placeholder="Write your message here..."
                                            rows={4}
                                            className="minecraft-card border-2 border-gray-600 focus:border-emerald-400 resize-none"
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="minecraft-btn-primary w-full"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 mr-2" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="space-y-6"
                    >
                        {/* Info Card */}
                        <div className="minecraft-card p-6 rounded-lg">
                            <h3 className="font-minecraft text-lg text-cyan-400 mb-6">Contact Info</h3>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                                    <div className="p-2 bg-cyan-500/20 rounded">
                                        <Mail className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-minecraft">Email</p>
                                        <p className="text-foreground">kvl202014@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                                    <div className="p-2 bg-emerald-500/20 rounded">
                                        <MapPin className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-minecraft">Location</p>
                                        <p className="text-foreground">Salem, Tamil Nadu, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="minecraft-card p-6 rounded-lg">
                            <h3 className="font-minecraft text-lg text-purple-400 mb-6">Connect With Me</h3>

                            <div className="grid grid-cols-2 gap-3">
                                {socialLinks.map((social, i) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className={`flex items-center gap-3 p-3 bg-muted/30 rounded-lg text-muted-foreground ${social.color} transition-colors`}
                                    >
                                        <social.icon className="w-5 h-5" />
                                        <span className="font-minecraft text-sm">{social.label}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>


                    </motion.div>
                </div>

                {/* Fun fact - Centered Below */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="max-w-3xl mx-auto mt-12"
                >
                    <div className="minecraft-card p-6 rounded-lg border-l-4 border-yellow-500 flex items-start gap-4">
                        <div className="p-2 bg-yellow-500/20 rounded-lg shrink-0">
                            <span className="text-2xl">💡</span>
                        </div>
                        <div>
                            <h4 className="font-minecraft text-yellow-400 mb-1">Did you know?</h4>
                            <p className="text-muted-foreground">
                                I'm always open to collaborating on innovative AI/ML projects. Let's build something amazing together!
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
