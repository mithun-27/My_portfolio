import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Code2, 
  Globe, 
  Brain, 
  Wrench, 
  Zap,
  Cpu
} from "lucide-react";

const skillCategories = [
  {
    title: "Programming",
    icon: Code2,
    color: "text-primary",
    bgColor: "bg-primary/10",
    skills: ["Python", "Java (Basics)", "C++", "Embedded C", "SQL"],
  },
  {
    title: "Web Development",
    icon: Globe,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Next.js"],
  },
  {
    title: "AI / ML",
    icon: Brain,
    color: "text-accent",
    bgColor: "bg-accent/10",
    skills: ["Machine Learning", "NLP", "Computer Vision", "TensorFlow"],
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    color: "text-neon-pink",
    bgColor: "bg-neon-pink/10",
    skills: ["Git", "VS Code", "Jupyter", "Anaconda", "Arduino IDE", "Power BI"],
  },
  {
    title: "Automation",
    icon: Zap,
    color: "text-primary",
    bgColor: "bg-primary/10",
    skills: ["n8n", "Zapier", "Power Automate", "MCP"],
  },
  {
    title: "Hardware",
    icon: Cpu,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    skills: ["Arduino", "ESP32", "Raspberry Pi", "Sensors", "IoT"],
  },
];

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="skills" className="relative py-20 overflow-hidden">
      {/* Background accents */}
      <div className="orb orb-cyan w-80 h-80 -left-40 top-1/3 opacity-20" />
      <div className="orb orb-blue w-64 h-64 right-0 bottom-20 opacity-20" />

      <div ref={ref} className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-title mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit spanning from low-level hardware programming to 
            cutting-edge AI/ML technologies
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4" />
        </motion.div>

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
              className="glass-card p-6 group"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${category.bgColor}`}>
                  <category.icon className={`w-5 h-5 ${category.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {category.title}
                </h3>
              </div>

              {/* Skills Grid */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className="skill-tag"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-xl border border-primary/30" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
