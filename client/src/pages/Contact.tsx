import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  insertContactMessageSchema,
  type InsertContactMessage,
} from "@shared/routes";
import { useContactForm } from "@/hooks/use-content";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const mutation = useContactForm();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      typeDemande: "",
      typeMaison: "",
      budget: "",
      region: "",
      echeancier: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navigation />

      {/* Header */}
      <div className="bg-primary text-white pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Contactez‑nous
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Discutons de votre projet. Nous sommes là pour répondre à toutes vos
            questions.
          </p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl font-bold text-primary mb-8">
              Restons en contact
            </h2>

            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary mb-1">
                    Notre bureau
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    123 Construction Blvd
                    <br />
                    Montreal, QC H2X 3Y7
                    <br />
                    Canada
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary mb-1">
                    Téléphone
                  </h3>
                  <p className="text-muted-foreground">
                    <span className="block mb-1">
                      Principal : (514) 555-0123
                    </span>
                    <span className="block">Télécopieur : (514) 555-0124</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary mb-1">
                    Courriel
                  </h3>
                  <p className="text-muted-foreground">info@maisonsturner.ca</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary mb-1">
                    Heures d’ouverture
                  </h3>
                  <p className="text-muted-foreground">
                    Lun - Ven : 8 h 00 - 17 h 00
                    <br />
                    Sam - Dim : Fermé
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100"
          >
            <h2 className="font-display text-2xl font-bold text-primary mb-6">
              Envoyez-nous un message
            </h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Jean Dupont"
                            {...field}
                            className="h-12 bg-slate-50 border-slate-200 focus:border-accent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(514) 555-0000"
                            {...field}
                            value={field.value || ""}
                            className="h-12 bg-slate-50 border-slate-200 focus:border-accent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Courriel</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="jean@example.com"
                          type="email"
                          {...field}
                          className="h-12 bg-slate-50 border-slate-200 focus:border-accent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="typeDemande"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de demande</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || undefined}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:border-accent">
                              <SelectValue placeholder="Sélectionnez une option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Informations sur les modèles">
                              Informations sur les modèles
                            </SelectItem>
                            <SelectItem value="Demande de prix">
                              Demande de prix
                            </SelectItem>
                            <SelectItem value="Service après‑vente">
                              Service après‑vente
                            </SelectItem>
                            <SelectItem value="Autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="typeMaison"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de maison</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || undefined}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:border-accent">
                              <SelectValue placeholder="Sélectionnez une option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Maison modulaire">
                              Maison modulaire
                            </SelectItem>
                            <SelectItem value="Maison jumelée">
                              Maison jumelée
                            </SelectItem>
                            <SelectItem value="Chalet">Chalet</SelectItem>
                            <SelectItem value="Mini‑maison">
                              Mini‑maison
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex. 300 000 $"
                            {...field}
                            value={field.value || ""}
                            className="h-12 bg-slate-50 border-slate-200 focus:border-accent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Région</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex. Montérégie"
                            {...field}
                            value={field.value || ""}
                            className="h-12 bg-slate-50 border-slate-200 focus:border-accent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="echeancier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Échéancier</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:border-accent">
                            <SelectValue placeholder="Sélectionnez une période" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0–3 mois">0–3 mois</SelectItem>
                          <SelectItem value="3–6 mois">3–6 mois</SelectItem>
                          <SelectItem value="6–12 mois">6–12 mois</SelectItem>
                          <SelectItem value="12 mois et plus">
                            12 mois et plus
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Parlez-nous de votre projet..."
                          className="min-h-[150px] resize-none bg-slate-50 border-slate-200 focus:border-accent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 text-lg bg-accent hover:bg-accent/90 text-white shadow-lg"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Envoi..." : "Envoyer"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
