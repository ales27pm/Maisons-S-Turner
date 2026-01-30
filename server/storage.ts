import {
  projects,
  services,
  contactMessages,
  rendezVousRequests,
  type InsertProject,
  type InsertService,
  type InsertContactMessage,
  type InsertRendezVousRequest,
  type Project,
  type Service,
  type ContactMessage,
  type RendezVousRequest,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;

  getServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;

  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  createRendezVousRequest(
    request: InsertRendezVousRequest,
  ): Promise<RendezVousRequest>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id));
    return project;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return project;
  }

  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const [service] = await db
      .insert(services)
      .values(insertService)
      .returning();
    return service;
  }

  async createContactMessage(
    insertMessage: InsertContactMessage,
  ): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async createRendezVousRequest(
    insertRequest: InsertRendezVousRequest,
  ): Promise<RendezVousRequest> {
    const [request] = await db
      .insert(rendezVousRequests)
      .values(insertRequest)
      .returning();
    return request;
  }
}

export const storage = new DatabaseStorage();
