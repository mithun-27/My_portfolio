import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Sentiment Analysis Engine",
    description:
      "Advanced NLP system for analyzing text sentiment using machine learning algorithms and natural language processing techniques.",
    tags: ["Python", "NLP", "Machine Learning", "NLTK"],
    gradient: "from-primary/20 to-secondary/20",
  },
  {
    title: "Image Classifier",
    description:
      "Deep learning image classification system built with transfer learning for accurate visual recognition tasks.",
    tags: ["Python", "TensorFlow", "Transfer Learning", "CNN"],
    gradient: "from-secondary/20 to-accent/20",
  },
  {
    title: "Spam Detection System",
    description:
      "Multi-modal spam detection for SMS, Email, OCR text extraction, and PDF documents with high accuracy.",
    tags: ["Python", "ML", "OCR", "PDF Processing"],
    gradient: "from-accent/20 to-primary/20",
  },
  {
    title: "AI Stock Price Predictor",
    description:
      "Machine learning web application for predicting stock market trends using historical data analysis.",
    tags: ["Python", "ML", "Web App", "Data Science"],
    gradient: "from-primary/20 to-neon-pink/20",
  },
  {
    title: "Landslide Detection Rover",
    description:
      "Autonomous rover system equipped with sensors for early landslide detection and terrain monitoring.",
    tags: ["Arduino", "ESP32", "Sensors", "IoT"],
    gradient: "from-neon-pink/20 to-secondary/20",
  },
  {
    title: "AI Water Cleaning Rover",
    description:
      "Autonomous AI-powered rover for water body cleaning with intelligent navigation and debris collection.",
    tags: ["AI", "Robotics", "Arduino", "Computer Vision"],
    gradient: "from-secondary/20 to-primary/20",
  },
];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="projects" className="relative py-20 overflow-hidden">
      {/* Background accents */}
      <div className="orb orb-purple w-96 h-96 -right-48 top-1/4 opacity-20" />

      <div ref={ref} className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-title mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of AI, ML, and robotics projects showcasing practical 
            applications of cutting-edge technology
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="glass-card h-full p-6 flex flex-col">
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-muted">
                      <Github className="w-5 h-5 text-foreground" />
                    </div>
                    <motion.div
                      whileHover={{ rotate: 45 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowUpRight className="w-5 h-5 text-primary" />
                    </motion.div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-border hover:border-primary hover:text-primary group/btn"
                  >
                    <Github className="mr-2 w-4 h-4" />
                    View on GitHub
                    <ExternalLink className="ml-auto w-3 h-3 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
