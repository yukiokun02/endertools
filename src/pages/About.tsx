import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">About EnderTools</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground mb-6">
              EnderTools is a premium service provided and maintained by EnderHOST, 
              offering essential tools for Minecraft server administrators to manage their resource packs efficiently. 
              Our goal is to simplify the process of working with resource packs, making server administration 
              easier and more enjoyable with top-tier support from the EnderHOST team.
            </p>
            
            <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4">Our Tools</h2>
            
            <h3 className="text-lg font-medium mt-6 mb-2 text-accent">Resource Pack Merger</h3>
            <p className="text-muted-foreground mb-4">
              Combine multiple resource packs into a single pack, maintaining the override priority. 
              This tool resolves conflicts and creates a unified pack that can be easily distributed to your players.
            </p>
            
            <h3 className="text-lg font-medium mt-6 mb-2 text-accent">Direct Download Link Generator</h3>
            <p className="text-muted-foreground mb-4">
              Generate direct download links for your resource packs that can be used in your server.properties file. 
              These links ensure that players automatically download the resource pack when they join your server.
            </p>
            
            <h3 className="text-lg font-medium mt-6 mb-2 text-accent">SHA-1 Hash Generator</h3>
            <p className="text-muted-foreground mb-4">
              Create SHA-1 hashes for your resource packs, which are required for the server.properties file 
              to verify integrity. This ensures that players download the correct and unmodified resource pack.
            </p>
            
            <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              We believe that Minecraft server administration should be accessible to everyone. 
              By providing free, high-quality tools, we aim to help server owners focus on building communities 
              rather than dealing with technical hurdles.
            </p>
            
            <p className="text-muted-foreground">
              All our tools are designed with performance and ease of use in mind. 
              They run entirely in your browser, ensuring your resource packs never leave your computer unless you choose to share them.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
