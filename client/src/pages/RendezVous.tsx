import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  insertRendezVousRequestInputSchema,
  type InsertRendezVousRequestInput,
} from "@shared/routes";
import { useRendezVousForm } from "@/hooks/use-content";
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
import { CalendarCheck, Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function RendezVous() {
  const mutation = useRendezVousForm();

  const form = useForm<InsertRendezVousRequestInput>({
    resolver: zodResolver(insertRendezVousRequestInputSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      requestedAt: "",
      appointmentType: "telephone",
      message: "",
    },
  });

  const onSubmit = (data: InsertRendezVousRequestInput) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset({
          name: "",
          phone: "",
          email: "",
          requestedAt: "",
          appointmentType: "telephone",
          message: "",
        });
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <Navigation />

      <div className="bg-primary text-white pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Prendre rendez-vous
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Choisissez le moment qui vous convient pour discuter de votre projet
            et obtenir une soumission personnalisée.
          </p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 text-primary mb-6">
              <CalendarCheck className="h-8 w-8 text-accent" />
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                Une consultation simple et rapide
              </h2>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Partagez vos disponibilités et vos besoins. Nous confirmerons un
              créneau et le mode de rencontre qui vous conviennent le mieux.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">
                    Appel direct
                  </p>
                  <p className="text-sm text-muted-foreground">
                    (514) 555-0123
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">Courriel</p>
                  <p className="text-sm text-muted-foreground">
                    info@maisonsturner.ca
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">
                    Rencontres sur place
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Disponibles partout dans le Grand Montréal.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100"
          >
            <h2 className="font-display text-2xl font-bold text-primary mb-6">
              Planifiez votre rendez-vous
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
                            className="h-12 bg-slate-50 border-slate-200 focus:border-accent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Courriel</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="jean.dupont@email.com"
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
                    name="requestedAt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date et heure souhaitées</FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            {...field}
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
                  name="appointmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de rendez-vous</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:border-accent">
                            <SelectValue placeholder="Choisissez une option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="telephone">
                            Téléphonique
                          </SelectItem>
                          <SelectItem value="virtuel">Virtuel</SelectItem>
                          <SelectItem value="en-personne">
                            En personne
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
                      <FormLabel>Message facultatif</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Décrivez votre projet ou vos attentes."
                          {...field}
                          value={field.value || ""}
                          className="min-h-[140px] bg-slate-50 border-slate-200 focus:border-accent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full h-12 bg-accent hover:bg-accent/90 text-white"
                  disabled={mutation.isPending}
                >
                  Planifier mon rendez-vous
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
