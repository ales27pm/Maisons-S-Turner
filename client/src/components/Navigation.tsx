import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Top-level navigation bar with responsive desktop and mobile menus, scroll-aware styling, and active-link highlighting.
 *
 * Renders a brand/logo, desktop navigation links with an active state and underline, a CTA button, and a mobile menu that animates open/closed and closes when a navigation item is selected.
 *
 * @returns The JSX element representing the navigation bar component.
 */
export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/projects", label: "Réalisations" },
    { href: "/services", label: "Nos services" },
    { href: "/contact", label: "Nous joindre" },
    { href: "/rendez-vous", label: "Rendez-vous" },
  ];

  const handleNavClick = () => setIsOpen(false);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-12 w-12 overflow-hidden rounded-md shadow-lg border-2 border-primary/20 bg-white">
              <img
                src="/images/logo.svg"
                alt="Maisons S. Turner Logo"
                className="object-contain w-full h-full p-1 transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div
              className={cn(
                "flex flex-col",
                scrolled ? "text-primary" : "text-white drop-shadow-md",
              )}
            >
              <span className="font-display font-bold text-xl leading-none tracking-wide">
                MAISONS
              </span>
              <span className="font-sans text-xs font-medium tracking-[0.2em] text-accent">
                S. TURNER
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 hover:text-accent relative group",
                  location === link.href
                    ? "text-accent font-semibold"
                    : scrolled
                      ? "text-slate-600"
                      : "text-slate-100",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full",
                    location === link.href ? "w-full" : "",
                  )}
                />
              </Link>
            ))}
            <Link href="/rendez-vous">
              <Button
                size="sm"
                className="bg-accent hover:bg-accent/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                <Phone className="mr-2 h-4 w-4" />
                Obtenir une soumission
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "md:hidden p-2 rounded-md transition-colors",
              scrolled
                ? "text-primary hover:bg-slate-100"
                : "text-white hover:bg-white/10",
            )}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b shadow-xl overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-lg font-medium px-4 py-2 rounded-md transition-colors",
                    location === link.href
                      ? "bg-accent/10 text-accent"
                      : "text-slate-600 hover:bg-slate-50 hover:text-primary",
                  )}
                  onClick={handleNavClick}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t px-4">
                <Link href="/rendez-vous" onClick={handleNavClick}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-md">
                    Prendre rendez-vous
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
