import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { useServices } from "@/hooks/use-content";
import { Home, Hammer, Ruler, PenTool, Truck, ShieldCheck } from "lucide-react";

export default function Services() {
  const { data: services, isLoading } = useServices();

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case "Home": return Home;
      case "Hammer": return Hammer;
      case "Ruler": return Ruler;
      case "PenTool": return PenTool;
      case "Truck": return Truck;
      case "ShieldCheck": return ShieldCheck;
      default: return Home;
    }
  };

  // Fallback data
  const staticServices = [
    { 
      id: 1, 
      title: "New Home Construction", 
      description: "We manage the entire construction process of your custom home, ensuring every detail meets our rigorous standards for quality and durability.", 
      icon: "Home" 
    },
    { 
      id: 2, 
      title: "Complete Renovations", 
      description: "Breathe new life into your existing property. We specialize in structural changes, layout optimization, and modernizing older homes.", 
      icon: "Hammer" 
    },
    { 
      id: 3, 
      title: "Design-Build", 
      description: "An integrated approach where design and construction teams work together from day one, streamlining communication and budgeting.", 
      icon: "PenTool" 
    },
    { 
      id: 4, 
      title: "Project Management", 
      description: "Expert oversight of timelines, trades, and budgets to ensure your project stays on track and strictly adheres to specifications.", 
      icon: "Ruler" 
    },
    { 
      id: 5, 
      title: "Commercial Contracting", 
      description: "Office fit-outs, retail spaces, and commercial renovations delivered with minimal disruption to your business operations.", 
      icon: "Truck" 
    },
    { 
      id: 6, 
      title: "Heritage Restoration", 
      description: "Specialized care for historic properties, preserving architectural integrity while upgrading systems for modern comfort.", 
      icon: "ShieldCheck" 
    },
  ];

  const displayServices = services?.length ? services : staticServices;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <Navigation />
      
      {/* Header */}
      <div className="bg-primary text-white pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Comprehensive construction solutions delivered with expertise and integrity.
          </p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={getIcon(service.icon)}
              className="bg-white"
            />
          ))}
        </div>

        {/* Process Section */}
        <div className="mt-24">
          <h2 className="font-display text-3xl font-bold text-center text-primary mb-16">Our Process</h2>
          
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Consultation", desc: "We meet to discuss your vision, budget, and feasibility." },
                { step: "02", title: "Planning", desc: "Detailed designs, permits, and schedules are finalized." },
                { step: "03", title: "Construction", desc: "Our skilled team brings the plan to life with regular updates." },
                { step: "04", title: "Delivery", desc: "Final walkthrough and handover of your new space." }
              ].map((item, index) => (
                <div key={index} className="relative bg-white p-8 rounded-xl shadow-lg md:bg-transparent md:shadow-none md:p-0 text-center z-10">
                  <div className="w-16 h-16 rounded-full bg-accent text-white font-display font-bold text-2xl flex items-center justify-center mx-auto mb-6 shadow-lg md:border-4 border-white">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-xl text-primary mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
