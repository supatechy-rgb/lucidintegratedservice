import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
const navLinks = [{
  name: "Home",
  path: "/"
}, {
  name: "About",
  path: "/about"
}, {
  name: "Services",
  path: "/services"
}, {
  name: "Contact",
  path: "/contact"
}];
interface HeaderProps {
  onBookingClick: () => void;
}
export function Header({
  onBookingClick
}: HeaderProps) {
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
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-card/95 backdrop-blur-md shadow-card py-3" : "bg-transparent py-5"}`}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Lucid Integrated Services" className="h-16 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`font-medium transition-colors ${location.pathname === link.path ? "text-primary" : "text-foreground/80 hover:text-primary"}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Button onClick={onBookingClick} variant="default">
            Book Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-foreground" aria-label="Toggle menu">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: "auto"
      }} exit={{
        opacity: 0,
        height: 0
      }} className="md:hidden bg-card border-t border-border overflow-hidden">
            <nav className="container py-4 flex flex-col gap-2">
              {navLinks.map(link => <Link key={link.path} to={link.path} className={`py-3 px-4 rounded-lg font-medium transition-colors ${location.pathname === link.path ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-muted"}`}>
                  {link.name}
                </Link>)}
              <div className="pt-4 border-t border-border mt-2">
                <Button onClick={onBookingClick} className="w-full" size="lg">
                  Book Now
                </Button>
              </div>
            </nav>
          </motion.div>}
      </AnimatePresence>
    </header>;
}