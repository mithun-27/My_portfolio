import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { MinecraftHero } from "@/components/MinecraftHero";
import { MinecraftAbout } from "@/components/MinecraftAbout";
import { MinecraftSkills } from "@/components/MinecraftSkills";
import { MinecraftExperience } from "@/components/MinecraftExperience";
import { MinecraftProjects } from "@/components/MinecraftProjects";
import { MinecraftProfiles } from "@/components/MinecraftProfiles";
import { MinecraftAchievements } from "@/components/MinecraftAchievements";
import { MinecraftContact } from "@/components/MinecraftContact";
import { MinecraftFooter } from "@/components/MinecraftFooter";
import { MinecraftWorkshops } from "@/components/MinecraftWorkshops";
import { Hotbar } from "@/components/minecraft/Hotbar";
import { MinecraftLoading } from "@/components/minecraft/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Skip loading on key press
  useEffect(() => {
    const handleKeyPress = () => {
      setIsLoading(false);
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <MinecraftLoading onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className={`min-h-screen relative z-10 overflow-x-hidden minecraft-cursor ${isLoading ? 'hidden' : ''}`}>
        <Hotbar />
        <main>
          <MinecraftHero />
          <MinecraftAbout />
          <MinecraftSkills />
          <MinecraftExperience />
          <MinecraftProjects />
          <MinecraftProfiles />
          <MinecraftAchievements />
          <MinecraftWorkshops />
          <MinecraftContact />
        </main>
        <MinecraftFooter />
      </div>
    </>
  );
};

export default Index;
