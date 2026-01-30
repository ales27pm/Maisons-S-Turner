import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Hammer,
  Home as HomeIcon,
  Ruler,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { useProjects, useServices } from "@/hooks/use-content";

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: services, isLoading: servicesLoading } = useServices();

  const featuredProjects = projects?.slice(0, 3) || [];

  // Fallback services if API fails or returns empty (for demo/development)
  const displayServices = services?.length
    ? services
    : [
        {
          id: 1,
          title: "Custom Home Building",
          description:
            "From foundation to finish, we bring your dream home to life with precision engineering and expert craftsmanship.",
          icon: "Home",
        },
        {
          id: 2,
          title: "Major Renovations",
          description:
            "Transform your existing space. We handle complex structural changes, additions, and complete home makeovers.",
          icon: "Hammer",
        },
        {
          id: 3,
          title: "Project Management",
          description:
            "Comprehensive oversight of your construction project, ensuring timelines, budgets, and quality standards are met.",
          icon: "Ruler",
        },
      ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Home":
        return HomeIcon;
      case "Hammer":
        return Hammer;
      case "Ruler":
        return Ruler;
      default:
        return HomeIcon;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Unsplash image: Modern luxury home construction */}
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
            alt="Modern Home Construction"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div
              variants={fadeIn}
              className="mb-4 inline-flex items-center px-3 py-1 rounded-full bg-accent/20 border border-accent/40 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-accent mr-2 animate-pulse" />
              <span className="text-sm font-medium text-white tracking-wide uppercase">
                Premier Construction Services
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-lg"
            >
              Building Your Vision, <br />
              <span className="text-accent">Creating Your Home</span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-lg sm:text-xl text-slate-200 mb-8 max-w-xl leading-relaxed drop-shadow-md"
            >
              Maisons S. Turner combines architectural precision with master
              craftsmanship to deliver renovation and construction projects that
              stand the test of time.
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/projects">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white font-semibold text-lg px-8 py-6 shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  View Our Portfolio
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-primary hover:bg-white hover:text-primary font-semibold text-lg px-8 py-6 shadow-lg bg-white/10 backdrop-blur-sm hover:-translate-y-1 transition-all duration-300"
                >
                  Request a Quote
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Expertise
            </h2>
            <div className="h-1 w-20 bg-accent mx-auto mb-6" />
            <p className="text-muted-foreground text-lg">
              We offer comprehensive construction services tailored to your
              specific needs, maintaining the highest standards of quality and
              safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayServices.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={getIcon(service.icon)}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/services">
              <Button
                variant="ghost"
                className="text-primary hover:text-accent group font-medium text-lg"
              >
                View All Services{" "}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us / About Brief */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />

              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                {/* Unsplash image: Architect reviewing plans */}
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1931&auto=format&fit=crop"
                  alt="Architectural Plans"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Floating Stat Card */}
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-xl border border-slate-100 max-w-xs hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="bg-accent/10 p-3 rounded-full text-accent">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">15+</p>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                      Years of Excellence
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6">
                Constructing With Integrity, <br />
                <span className="text-accent">Delivering With Pride</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                At Maisons S. Turner, we believe that a home is more than just
                bricks and mortar—it's the foundation of your family's memories.
                Our approach combines traditional craftsmanship with modern
                building techniques.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Licensed and Insured Professionals",
                  "Transparent Pricing & Timelines",
                  "Quality Materials & Superior Finish",
                  "Dedicated Project Management",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg px-8 h-12">
                  Schedule a Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Recent Projects
              </h2>
              <div className="h-1 w-20 bg-accent mb-6" />
              <p className="text-slate-400 text-lg">
                Explore a selection of our recent work, showcasing our
                versatility and commitment to quality across various project
                types.
              </p>
            </div>
            <Link href="/projects">
              <Button
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-white hover:text-slate-900"
              >
                View Full Portfolio
              </Button>
            </Link>
          </div>

          {projectsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-[400px] bg-slate-800 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.length > 0 ? (
                featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
              ) : (
                // Fallback content if no projects in DB
                <>
                  <div className="group overflow-hidden border-0 shadow-lg bg-slate-800 rounded-xl h-full flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt="Modern Villa"
                      />
                      <Badge className="absolute top-4 right-4 bg-accent">
                        New Build
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-white mb-2">
                        Lakeside Modern Villa
                      </h3>
                      <p className="text-slate-400 text-sm">
                        A contemporary 4-bedroom home featuring floor-to-ceiling
                        windows and sustainable materials.
                      </p>
                    </div>
                  </div>
                  <div className="group overflow-hidden border-0 shadow-lg bg-slate-800 rounded-xl h-full flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src="https://pixabay.com/get/g1067e537db777ce1c0c21f3cfba578a2847b3fe0be2ddf9f28b768e1473eac8291a604e92f0ca42a9a8d62b5c634f2af57529350bbf56a0a07b75e495cee2854_1280.jpg"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt="Kitchen Reno"
                      />
                      <Badge className="absolute top-4 right-4 bg-accent">
                        Renovation
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-white mb-2">
                        Heritage Kitchen Remodel
                      </h3>
                      <p className="text-slate-400 text-sm">
                        Complete restoration of a 1920s kitchen, blending
                        original charm with modern amenities.
                      </p>
                    </div>
                  </div>
                  <div className="group overflow-hidden border-0 shadow-lg bg-slate-800 rounded-xl h-full flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt="Office Space"
                      />
                      <Badge className="absolute top-4 right-4 bg-accent">
                        Commercial
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-white mb-2">
                        Downtown Office Fit-out
                      </h3>
                      <p className="text-slate-400 text-sm">
                        Open-concept workspace design for a tech startup in the
                        heart of the city.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 pattern-grid-lg opacity-20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/90 text-xl max-w-2xl mx-auto mb-10 font-medium">
            Contact us today for a free consultation and quote. Let's build
            something extraordinary together.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-slate-100 font-bold text-lg px-10 py-7 shadow-2xl"
            >
              Get Your Free Quote
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
