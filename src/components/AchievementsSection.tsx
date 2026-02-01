import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Award, Medal, Users } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "IEEE Robotics Chapter",
    subtitle: "Runner Up",
    description: "Demonstrated excellence in robotics competition organized by IEEE",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
  },
  {
    icon: Award,
    title: "CMTI Bangalore Hackathon 2025",
    subtitle: "2nd Runner Up",
    description: "Competed among top teams at the prestigious CMTI hackathon",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/30",
  },
  {
    icon: Medal,
    title: "AI Hackathon Wins",
    subtitle: "Multiple Awards",
    description: "Recognized for innovative AI solutions across various hackathons",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/30",
  },
  {
    icon: Users,
    title: "Tech Volunteering & Outreach",
    subtitle: "Community Impact",
    description: "Active contributor to tech communities and educational initiatives",
    color: "text-neon-pink",
    bgColor: "bg-neon-pink/10",
    borderColor: "border-neon-pink/30",
  },
];

export const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="relative py-20 overflow-hidden">
      {/* Background accents */}
      <div className="orb orb-purple w-80 h-80 -right-40 top-1/3 opacity-20" />

      <div ref={ref} className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-title mb-4">
            <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Recognition and milestones from competitions, hackathons, and community involvement
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent transform md:-translate-x-1/2" />

          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative flex items-center mb-8 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary transform -translate-x-1/2 z-10">
                <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25" />
              </div>

              {/* Content */}
              <div
                className={`ml-8 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`glass-card p-6 border ${achievement.borderColor} hover-lift`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${achievement.bgColor} shrink-0`}>
                      <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {achievement.title}
                      </h3>
                      <p className={`text-sm font-medium ${achievement.color} mb-2`}>
                        {achievement.subtitle}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
