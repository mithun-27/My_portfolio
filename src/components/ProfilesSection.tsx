import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const profiles = [
  {
    name: "GitHub",
    username: "mithun-27",
    url: "https://github.com/mithun-27",
    description: "Open source projects & contributions",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: "hover:text-foreground hover:border-foreground",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]",
  },
  {
    name: "LeetCode",
    username: "mithun_27",
    url: "https://leetcode.com/u/mithun_27/",
    description: "Problem solving & DSA practice",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
    color: "hover:text-[#FFA116] hover:border-[#FFA116]",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(255,161,22,0.3)]",
  },
  {
    name: "HackerRank",
    username: "2k23aids36",
    url: "https://www.hackerrank.com/profile/2k23aids36",
    description: "Certifications & skill badges",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.115.645 10.885 0 12S13.287 24 12 24s-9.75-4.885-10.395-6c-.641-1.115-.641-10.885 0-12C2.25 4.886 10.715 0 12 0zm2.295 6.799c-.141 0-.258.115-.258.258v3.875H9.963V6.908h.701a.257.257 0 0 0 .183-.076.261.261 0 0 0 .076-.182V6.65a.261.261 0 0 0-.258-.26H7.963a.26.26 0 0 0-.258.26v.147c0 .142.115.258.258.258h.701v10.29h-.701a.257.257 0 0 0-.258.258v.148a.26.26 0 0 0 .258.258h2.702a.26.26 0 0 0 .258-.258v-.148a.257.257 0 0 0-.258-.258h-.701v-4.856h4.074v4.856h-.701a.257.257 0 0 0-.258.258v.148a.26.26 0 0 0 .258.258h2.702a.26.26 0 0 0 .258-.258v-.148a.257.257 0 0 0-.258-.258h-.7V7.057h.7a.257.257 0 0 0 .183-.075.261.261 0 0 0 .076-.183V6.65a.261.261 0 0 0-.258-.26h-2.702a.265.265 0 0 0-.109.009z" />
      </svg>
    ),
    color: "hover:text-[#00EA64] hover:border-[#00EA64]",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(0,234,100,0.3)]",
  },
  {
    name: "LinkedIn",
    username: "mithun-s",
    url: "https://www.linkedin.com/in/mithun-s-732939280/",
    description: "Professional network & updates",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "hover:text-[#0A66C2] hover:border-[#0A66C2]",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(10,102,194,0.3)]",
  },
];

export const ProfilesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="profiles" className="relative py-20 overflow-hidden">
      {/* Background accents */}
      <div className="orb orb-cyan w-72 h-72 -left-36 top-1/2 opacity-20" />

      <div ref={ref} className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-title mb-4">
            Coding <span className="gradient-text">Profiles</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with me on various platforms and explore my coding journey
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profiles.map((profile, index) => (
            <motion.a
              key={profile.name}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group glass-card p-6 text-center transition-all duration-300 ${profile.glowColor}`}
            >
              {/* Icon */}
              <div
                className={`inline-flex text-muted-foreground transition-colors duration-300 ${profile.color}`}
              >
                {profile.icon}
              </div>

              {/* Name */}
              <h3 className="text-lg font-semibold text-foreground mt-4 mb-1">
                {profile.name}
              </h3>

              {/* Username */}
              <p className="text-sm text-primary mb-2">@{profile.username}</p>

              {/* Description */}
              <p className="text-xs text-muted-foreground mb-4">
                {profile.description}
              </p>

              {/* Link indicator */}
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Visit</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
