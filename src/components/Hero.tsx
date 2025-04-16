
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const scrollToTools = () => {
    const toolsSection = document.getElementById("tools-section");
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative overflow-hidden bg-background py-16 sm:py-24 lg:py-32">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block text-white">Minecraft Server</span>
            <span className="block text-primary">Resource Tools</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Professional tools to manage, merge and deploy Minecraft resource packs 
            for your server. Fast, reliable, and completely free.
          </p>
          <div className="mx-auto mt-10 max-w-sm">
            <Button 
              onClick={scrollToTools} 
              className="w-full py-6 text-lg bg-primary hover:bg-primary/90 text-white transition-all duration-300
                      hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            >
              View Tools
            </Button>
          </div>
          
          <div className="mt-12 animate-bounce">
            <ChevronDown className="mx-auto h-8 w-8 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
