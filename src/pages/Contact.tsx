
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, MessageCircle, Mail } from "lucide-react";

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would typically connect to a backend service
    // For now, we'll just simulate a successful submission
    setFormSubmitted(true);
    
    // Reset the form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center p-6 bg-card rounded-lg border border-border/50 
                          transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]">
              <Mail className="h-10 w-10 text-primary mb-4" />
              <h2 className="text-lg font-semibold mb-2">Email</h2>
              <p className="text-muted-foreground text-center">
                contact@minepack.example
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-card rounded-lg border border-border/50 
                          transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]">
              <Github className="h-10 w-10 text-primary mb-4" />
              <h2 className="text-lg font-semibold mb-2">GitHub</h2>
              <p className="text-muted-foreground text-center">
                Follow our open source projects
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-card rounded-lg border border-border/50 
                          transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]">
              <MessageCircle className="h-10 w-10 text-primary mb-4" />
              <h2 className="text-lg font-semibold mb-2">Discord</h2>
              <p className="text-muted-foreground text-center">
                Join our community server
              </p>
            </div>
          </div>
          
          <div className="bg-card rounded-lg border border-border/50 p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-6">Send Us a Message</h2>
            
            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="inline-block p-3 rounded-full bg-primary/20 text-primary mb-4">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">
                  Thank you for contacting us. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      required
                      className="bg-secondary/30 border-border/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      required
                      className="bg-secondary/30 border-border/50"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="What is your message about?"
                    required
                    className="bg-secondary/30 border-border/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    rows={6}
                    required
                    className="bg-secondary/30 border-border/50"
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full py-6 bg-primary hover:bg-primary/90 text-white transition-all duration-300
                          hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
