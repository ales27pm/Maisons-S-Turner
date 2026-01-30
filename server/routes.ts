import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { insertContactMessageSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  });

  // Services
  app.get(api.services.list.path, async (req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  // Contact
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = insertContactMessageSchema.strict().parse(req.body);
      const savedMessage = await storage.createContactMessage(input);
      res.json(savedMessage);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input" });
      }
      throw err;
    }
  });

  // Seed data if empty
  const servicesList = await storage.getServices();
  if (servicesList.length === 0) {
    await seedDatabase();
  }

  return httpServer;
}

async function seedDatabase() {
  await storage.createService({
    title: "General Contracting",
    description: "Full-service project management from concept to completion.",
    icon: "Hammer",
  });
  await storage.createService({
    title: "Renovations",
    description:
      "Transforming existing spaces into modern, functional environments.",
    icon: "Home",
  });
  await storage.createService({
    title: "Custom Homes",
    description:
      "Building bespoke homes tailored to your lifestyle and vision.",
    icon: "Ruler",
  });

  await storage.createProject({
    title: "Modern Kitchen Remodel",
    description:
      "Complete renovation of a dated kitchen into a modern chef's paradise with custom cabinetry and quartz countertops.",
    imageUrl:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80&w=2768&ixlib=rb-4.0.3",
    category: "Renovation",
    location: "Downtown",
    completionDate: "2023",
  });
  await storage.createProject({
    title: "Lakeside Custom Home",
    description:
      "Design and build of a 3,500 sq ft luxury home with panoramic lake views and sustainable features.",
    imageUrl:
      "https://images.unsplash.com/photo-1600596542815-e32c530480b7?auto=format&fit=crop&q=80&w=2600&ixlib=rb-4.0.3",
    category: "New Build",
    location: "Lakeview",
    completionDate: "2024",
  });
  await storage.createProject({
    title: "Heritage Restoration",
    description:
      "Careful restoration of a century-old property, preserving original details while updating systems.",
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2600&ixlib=rb-4.0.3",
    category: "Restoration",
    location: "Old Town",
    completionDate: "2023",
  });
}
