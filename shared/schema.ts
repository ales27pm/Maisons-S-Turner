import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(), // e.g., "Renovation", "New Build"
  location: text("location"),
  completionDate: text("completion_date"),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(), // Lucide icon name
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  typeDemande: text("type_demande").notNull(),
  typeMaison: text("type_maison").notNull(),
  budget: text("budget").notNull(),
  region: text("region").notNull(),
  echeancier: text("echeancier").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const rendezVousRequests = pgTable("rendez_vous_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  requestedAt: timestamp("requested_at").notNull(),
  appointmentType: text("appointment_type").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});
export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});
export const insertContactMessageSchema = createInsertSchema(contactMessages, {
  typeDemande: z.enum([
    "info-modeles",
    "demande-prix",
    "service-apres-vente",
    "autre",
  ]),
  typeMaison: z.enum([
    "maison-modulaire",
    "maison-jumelee",
    "chalet",
    "mini-maison",
  ]),
  budget: z.string().min(1, "Le budget est requis."),
  region: z.string().min(1, "La région est requise."),
  echeancier: z.enum(["0-3", "3-6", "6-12", "12-plus"]),
}).omit({ id: true, createdAt: true });

export const insertRendezVousRequestSchema = createInsertSchema(
  rendezVousRequests,
  {
    name: z.string().min(1, "Le nom est requis."),
    phone: z.string().min(1, "Le téléphone est requis."),
    email: z.string().email("Le courriel doit être valide."),
    requestedAt: z.coerce.date({
      required_error: "La date et l'heure sont requises.",
      invalid_type_error: "La date et l'heure doivent être valides.",
    }),
    appointmentType: z.enum(["telephone", "virtuel", "en-personne"], {
      required_error: "Le type de rendez-vous est requis.",
    }),
    message: z.string().optional(),
  },
).omit({ id: true, createdAt: true });

export const insertRendezVousRequestInputSchema =
  insertRendezVousRequestSchema.extend({
    requestedAt: z
      .string()
      .min(1, "La date et l'heure sont requises.")
      .refine(
        (value) => !Number.isNaN(Date.parse(value)),
        "La date et l'heure doivent être valides.",
      ),
  });

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type RendezVousRequest = typeof rendezVousRequests.$inferSelect;
export type InsertRendezVousRequest = z.infer<
  typeof insertRendezVousRequestSchema
>;
export type InsertRendezVousRequestInput = z.infer<
  typeof insertRendezVousRequestInputSchema
>;
