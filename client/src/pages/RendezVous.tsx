import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Phone, Mail } from "lucide-react";

export default function RendezVous() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <Navigation />

      <div className="bg-primary text-white pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Prendre rendez-vous
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Planifiez une rencontre pour discuter de votre projet et obtenir une
            soumission personnalisée.
          </p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-10">
          <div className="flex items-center gap-3 text-primary mb-6">
            <CalendarCheck className="h-8 w-8 text-accent" />
            <h2 className="font-display text-2xl md:text-3xl font-bold">
              Une consultation simple et rapide
            </h2>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Dites-nous en quelques mots vos besoins et nous vous proposerons des
            créneaux disponibles. Nous pouvons nous déplacer sur place ou
            planifier une rencontre virtuelle selon vos préférences.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-accent mt-1" />
              <div>
                <p className="text-sm font-semibold text-primary">
                  Par téléphone
                </p>
                <p className="text-sm text-muted-foreground">(514) 555-0123</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-accent mt-1" />
              <div>
                <p className="text-sm font-semibold text-primary">
                  Par courriel
                </p>
                <p className="text-sm text-muted-foreground">
                  info@maisonsturner.ca
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button className="bg-accent hover:bg-accent/90 text-white">
                Demander une soumission
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" className="border-slate-200">
                Voir les services
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
