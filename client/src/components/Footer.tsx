import { Link } from "wouter";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

/**
 * Renders the site footer containing brand information, quick navigation links, listed services, contact details, social icons, and legal links with a dynamic current year.
 *
 * @returns The footer JSX element including brand, quick links, services, contact info, social icons, and legal links.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded bg-white p-0.5">
                <img
                  src="/images/logo.svg"
                  alt="MST Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">
                  MAISONS S. TURNER
                </h3>
                <p className="text-xs text-accent font-medium tracking-widest uppercase">
                  Building Excellence
                </p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-xs">
              Premium construction and renovation services tailored to your
              unique vision. We build homes that last for generations.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-accent">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm hover:text-accent transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/realisations"
                  className="text-sm hover:text-accent transition-colors"
                >
                  Our Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm hover:text-accent transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm hover:text-accent transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-accent">
              Services
            </h4>
            <ul className="space-y-3">
              <li className="text-sm text-primary-foreground/80">
                Custom Home Building
              </li>
              <li className="text-sm text-primary-foreground/80">
                Major Renovations
              </li>
              <li className="text-sm text-primary-foreground/80">
                Kitchen & Bath Remodeling
              </li>
              <li className="text-sm text-primary-foreground/80">
                Project Management
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-accent">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/80">
                  123 Construction Blvd,
                  <br />
                  Montreal, QC H2X 3Y7
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <span className="text-sm text-primary-foreground/80">
                  (514) 555-0123
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <span className="text-sm text-primary-foreground/80">
                  info@maisonsturner.ca
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/60">
          <p>
            &copy; {currentYear} Maisons S. Turner. RBQ License: 5555-5555-55.
            All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
