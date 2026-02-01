import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, Calendar, Code2 } from "lucide-react";

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-20 overflow-hidden">
      {/* Background accent */}
      <div className="orb orb-purple w-72 h-72 top-20 -right-36 opacity-20" />

      <div ref={ref} className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="section-title mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I am a <span className="text-foreground font-medium">B.Tech Artificial Intelligence & Data Science</span> student 
              in my pre-final year with hands-on experience in{" "}
              <span className="text-primary">machine learning</span>,{" "}
              <span className="text-secondary">frontend development</span>, and{" "}
              <span className="text-accent">embedded systems</span>.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I am passionate about building real-world AI solutions that create measurable impact. 
              From developing intelligent automation systems to crafting beautiful user interfaces, 
              I bring a unique blend of technical depth and creative problem-solving to every project.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-card p-4 text-center"
              >
                <div className="text-3xl font-bold gradient-text">6+</div>
                <div className="text-sm text-muted-foreground">Projects Built</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-card p-4 text-center"
              >
                <div className="text-3xl font-bold gradient-text">7.9</div>
                <div className="text-sm text-muted-foreground">CGPA</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="glass-card p-6 gradient-border hover-lift">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    B.Tech in AI & Data Science
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Knowledge Institute of Technology, Salem
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>2022 - 2026 (Pre-final Year)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-secondary" />
                      <span>Salem, Tamil Nadu, India</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Code2 className="w-4 h-4 text-accent" />
                      <span>CGPA: 7.9</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
