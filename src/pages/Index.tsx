
import { useEffect } from "react";
import { PackagePlus, Link as LinkIcon, Hash } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ToolCard from "@/components/ToolCard";

const Index = () => {
  // Animation on scroll effect
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          entry.target.classList.remove("opacity-0");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll(".tool-card").forEach((card) => {
      card.classList.add("opacity-0");
      observer.observe(card);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <section id="tools-section" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Minecraft Server Tools
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="tool-card transition-all duration-500 delay-100">
                <ToolCard
                  id="merger"
                  title="Resource Pack Merger"
                  description="Combine multiple Minecraft resource packs into one effortlessly."
                  icon={PackagePlus}
                  buttonText="Merge Packs"
                />
              </div>
              
              <div className="tool-card transition-all duration-500 delay-200">
                <ToolCard
                  id="link-generator"
                  title="Download Link Generator"
                  description="Upload and get an instant direct download URL for your server."
                  icon={LinkIcon}
                  buttonText="Generate Link"
                />
              </div>
              
              <div className="tool-card transition-all duration-500 delay-300">
                <ToolCard
                  id="hash-generator"
                  title="SHA-1 Hash Generator"
                  description="Instantly generate the SHA-1 hash required for your Minecraft resource pack."
                  icon={Hash}
                  buttonText="Generate SHA-1"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gradient-to-b from-background via-background to-background/95">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Enhance Your Minecraft Server?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Our tools make resource pack management simple, allowing you to focus on creating amazing Minecraft experiences.
            </p>
            <a 
              href="#tools-section"
              className="inline-block px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-md transition-all duration-300 
                       hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            >
              Get Started Now
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
