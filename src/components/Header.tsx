import { useState, useEffect } from "react";
import { Menu, X, Play } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
const navLinks = [{
  label: "Home",
  href: "/"
}, {
  label: "Features",
  href: "/#features"
}, {
  label: "Pricing",
  href: "/pricing"
}, {
  label: "Channels",
  href: "/channels"
}, {
  label: "Install",
  href: "/install"
}, {
  label: "FAQ",
  href: "/faq"
}, {
  label: "Contact",
  href: "/contact"
}];
export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    // If it's a hash link on the home page
    if (href.startsWith("/#")) {
      if (location.pathname === "/") {
        // We're on home, just scroll
        const element = document.getElementById(href.substring(2));
        element?.scrollIntoView({
          behavior: "smooth"
        });
      } else {
        // Navigate to home then scroll
        window.location.href = `/${href}`;
      }
    } else {
      // Regular navigation
      window.location.href = href;
    }
  };
  const isActiveLink = (href: string) => {
    if (href.startsWith("/#")) {
      return location.pathname === "/" && location.hash === href.substring(1);
    }
    return location.pathname === href;
  };
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/90 backdrop-blur-xl border-b border-border" : "bg-transparent"}`}>
      <nav className="section-container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-110">
            <Play className="w-5 h-5 text-primary-foreground fill-current" />
          </div>
          <span className="text-xl font-bold text-foreground">StreamMax</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a 
              key={link.label} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)} 
              className={`text-sm font-medium transition-colors ${isActiveLink(link.href) ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          
          <Link to="/pricing">
            <Button className="btn-primary py-2 px-6">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg text-foreground hover:bg-accent transition-colors" 
          onClick={(e) => {
            e.preventDefault();
            setIsMobileMenuOpen(!isMobileMenuOpen);
            // Scroll to top when opening menu
            if (!isMobileMenuOpen) {
              window.scrollTo(0, 0);
            }
          }} 
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border animate-fade-in">
          <div className="section-container py-4 flex flex-col gap-4">
            {navLinks.map(link => (
              <a 
                key={link.label} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)} 
                className={`text-base font-medium py-2 ${isActiveLink(link.href) ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Link to="/#pricing">
                <Button className="btn-primary w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>}
    </header>;
};