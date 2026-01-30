import { z } from "zod";
import {
  insertContactMessageSchema,
  insertRendezVousRequestInputSchema,
  insertRendezVousRequestSchema,
  projects,
  services,
  contactMessages,
  rendezVousRequests,
} from "./schema";

export {
  insertContactMessageSchema,
  insertRendezVousRequestInputSchema,
  insertRendezVousRequestSchema,
};
export type {
  InsertContactMessage,
  InsertRendezVousRequest,
  InsertRendezVousRequestInput,
} from "./schema";

export const api = {
  projects: {
    list: {
      method: "GET" as const,
      path: "/api/projects",
      responses: {
        200: z.array(z.custom<typeof projects.$inferSelect>()),
      },
    },
    get: {
      method: "GET" as const,
      path: "/api/projects/:id",
      responses: {
        200: z.custom<typeof projects.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
  },
  services: {
    list: {
      method: "GET" as const,
      path: "/api/services",
      responses: {
        200: z.array(z.custom<typeof services.$inferSelect>()),
      },
    },
  },
  contact: {
    submit: {
      method: "POST" as const,
      path: "/api/contact",
      input: insertContactMessageSchema.strict(),
      responses: {
        200: z.custom<typeof contactMessages.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
  },
  rendezVous: {
    submit: {
      method: "POST" as const,
      path: "/api/rendez-vous",
      input: insertRendezVousRequestSchema.strict(),
      responses: {
        200: z.custom<typeof rendezVousRequests.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
  },
};

export function buildUrl(
  path: string,
  params?: Record<string, string | number>,
): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
