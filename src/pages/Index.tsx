
import { useEffect } from "react";
import { PackagePlus, Link as LinkIcon, Hash } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
          <div className="container mx-auto px-4 my-12">
            <h2 className="text-3xl font-bold text-center mb-16">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Minecraft Server Tools
              </span>
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="tool-card transition-all duration-500 delay-100">
                <ToolCard
                  id="merger"
                  title={(
                    <>
                      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Resource</span>{" "}
                      Pack Merger
                    </>
                  )}
                  description="Combine multiple Minecraft resource packs into one effortlessly."
                  icon={PackagePlus}
                  buttonText="Generate Merged Resource Pack"
                  uploadSections={2}
                />
              </div>
              
              <div className="tool-card transition-all duration-500 delay-200">
                <ToolCard
                  id="link-generator"
                  title={(
                    <>
                      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Download</span>{" "}
                      Link Generator
                    </>
                  )}
                  description="Upload and get an instant direct download URL for your server."
                  icon={LinkIcon}
                  buttonText="Generate Link"
                />
              </div>
              
              <div className="tool-card transition-all duration-500 delay-300">
                <ToolCard
                  id="hash-generator"
                  title={(
                    <>
                      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">SHA-1</span>{" "}
                      Hash Generator
                    </>
                  )}
                  description="Instantly generate the SHA-1 hash required for your Minecraft resource pack."
                  icon={Hash}
                  buttonText="Generate SHA-1"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gradient-to-b from-background via-primary/5 to-background/95">
          <div className="container mx-auto px-4">
            <Card className="overflow-hidden backdrop-blur-xl bg-black/30 border border-white/10 shadow-[0_8px_32px_rgba(139,92,246,0.1)]
                           transition-all duration-300 hover:shadow-[0_8px_32px_rgba(139,92,246,0.2)]">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Premium Minecraft Hosting Solution
                  </span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                  Experience lag-free Minecraft hosting with EnderHOST. 
                  Get 24/7 support, instant setup, and competitive prices.
                </p>
                <a 
                  href="https://enderhost.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-md transition-all duration-300 
                           hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                >
                  Try EnderHOST
                </a>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
