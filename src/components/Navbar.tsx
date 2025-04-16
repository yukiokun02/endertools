import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Home, 
  Wrench, 
  Info, 
  Mail, 
  Menu, 
  X, 
  ChevronDown, 
  PackagePlus, 
  Link as LinkIcon, 
  Hash 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and name */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              EnderTools
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors flex items-center gap-1.5">
              <Home size={16} />
              <span>Home</span>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1.5 -mr-4">
                  <Wrench size={16} />
                  <span>Tools</span>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-card border-border/50">
                <DropdownMenuItem asChild className="flex items-center gap-2">
                  <Link to="/#merger" className="cursor-pointer">
                    <PackagePlus size={16} />
                    <span>Resource Pack Merger</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="flex items-center gap-2">
                  <Link to="/#link-generator" className="cursor-pointer">
                    <LinkIcon size={16} />
                    <span>Link Generator</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="flex items-center gap-2">
                  <Link to="/#hash-generator" className="cursor-pointer">
                    <Hash size={16} />
                    <span>SHA-1 Generator</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/about" className="text-foreground hover:text-primary transition-colors flex items-center gap-1.5">
              <Info size={16} />
              <span>About</span>
            </Link>
            
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors flex items-center gap-1.5">
              <Mail size={16} />
              <span>Contact</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu} className="p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
            isMenuOpen ? "max-h-60 py-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 px-2 py-2 text-foreground hover:text-primary hover:bg-secondary/30 rounded-md transition-colors"
              onClick={toggleMenu}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            
            <div className="px-2 py-2 text-foreground">
              <div className="flex items-center gap-2 mb-2">
                <Wrench size={18} />
                <span className="font-medium">Tools</span>
              </div>
              <div className="flex flex-col space-y-2 ml-6 mt-1">
                <Link 
                  to="/#merger" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  <PackagePlus size={14} />
                  <span>Resource Pack Merger</span>
                </Link>
                <Link 
                  to="/#link-generator" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  <LinkIcon size={14} />
                  <span>Link Generator</span>
                </Link>
                <Link 
                  to="/#hash-generator" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  <Hash size={14} />
                  <span>SHA-1 Generator</span>
                </Link>
              </div>
            </div>
            
            <Link 
              to="/about" 
              className="flex items-center gap-2 px-2 py-2 text-foreground hover:text-primary hover:bg-secondary/30 rounded-md transition-colors"
              onClick={toggleMenu}
            >
              <Info size={18} />
              <span>About</span>
            </Link>
            
            <Link 
              to="/contact" 
              className="flex items-center gap-2 px-2 py-2 text-foreground hover:text-primary hover:bg-secondary/30 rounded-md transition-colors"
              onClick={toggleMenu}
            >
              <Mail size={18} />
              <span>Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
