import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { useServices } from "@/hooks/use-content";
import { Home, Hammer, Ruler, PenTool, Truck, ShieldCheck } from "lucide-react";

export default function Services() {
  const { data: services, isLoading } = useServices();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Home":
        return Home;
      case "Hammer":
        return Hammer;
      case "Ruler":
        return Ruler;
      case "PenTool":
        return PenTool;
      case "Truck":
        return Truck;
      case "ShieldCheck":
        return ShieldCheck;
      default:
        return Home;
    }
  };

  // Fallback data
  const staticServices = [
    {
      id: 1,
      title: "Construction de maisons neuves",
      description:
        "Nous gérons l'ensemble du processus de construction de votre maison sur mesure, en veillant à ce que chaque détail respecte nos normes rigoureuses de qualité et de durabilité.",
      icon: "Home",
    },
    {
      id: 2,
      title: "Rénovations complètes",
      description:
        "Redonnez vie à votre propriété existante. Nous sommes spécialisés dans les modifications structurelles, l'optimisation des plans et la modernisation des maisons plus anciennes.",
      icon: "Hammer",
    },
    {
      id: 3,
      title: "Design-construction",
      description:
        "Une approche intégrée où les équipes de conception et de construction collaborent dès le premier jour, simplifiant la communication et les budgets.",
      icon: "PenTool",
    },
    {
      id: 4,
      title: "Gestion de projet",
      description:
        "Supervision experte des échéanciers, des corps de métier et des budgets pour que votre projet respecte les plans et les exigences.",
      icon: "Ruler",
    },
    {
      id: 5,
      title: "Construction commerciale",
      description:
        "Aménagements de bureaux, espaces commerciaux et rénovations livrés avec un minimum d'interruption pour vos opérations.",
      icon: "Truck",
    },
    {
      id: 6,
      title: "Restauration patrimoniale",
      description:
        "Un soin spécialisé pour les propriétés historiques, en préservant l'intégrité architecturale tout en modernisant les systèmes pour un confort actuel.",
      icon: "ShieldCheck",
    },
  ];

  const displayServices = services?.length ? services : staticServices;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <Navigation />

      {/* Header */}
      <div className="bg-primary text-white pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Nos services
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Des solutions de construction complètes livrées avec expertise et
            intégrité.
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
          <h2 className="font-display text-3xl font-bold text-center text-primary mb-16">
            Notre processus
          </h2>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Consultation",
                  desc: "Nous discutons de votre vision, de votre budget et de la faisabilité.",
                },
                {
                  step: "02",
                  title: "Planification",
                  desc: "Les plans détaillés, les permis et les échéanciers sont finalisés.",
                },
                {
                  step: "03",
                  title: "Construction",
                  desc: "Notre équipe qualifiée réalise le plan avec des mises à jour régulières.",
                },
                {
                  step: "04",
                  title: "Livraison",
                  desc: "Visite finale et remise de votre nouvel espace.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative bg-white p-8 rounded-xl shadow-lg md:bg-transparent md:shadow-none md:p-0 text-center z-10"
                >
                  <div className="w-16 h-16 rounded-full bg-accent text-white font-display font-bold text-2xl flex items-center justify-center mx-auto mb-6 shadow-lg md:border-4 border-white">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-xl text-primary mb-3">
                    {item.title}
                  </h3>
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
