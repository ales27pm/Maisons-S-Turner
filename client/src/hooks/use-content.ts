import { useQuery, useMutation } from "@tanstack/react-query";
import {
  api,
  type InsertContactMessage,
  type InsertRendezVousRequestInput,
} from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

// ============================================
// PROJECTS
// ============================================
export function useProjects() {
  return useQuery({
    queryKey: [api.projects.list.path],
    queryFn: async () => {
      const res = await fetch(api.projects.list.path);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return api.projects.list.responses[200].parse(await res.json());
    },
  });
}

// ============================================
// SERVICES
// ============================================
export function useServices() {
  return useQuery({
    queryKey: [api.services.list.path],
    queryFn: async () => {
      const res = await fetch(api.services.list.path);
      if (!res.ok) throw new Error("Failed to fetch services");
      return api.services.list.responses[200].parse(await res.json());
    },
  });
}

// ============================================
// CONTACT
// ============================================
export function useContactForm() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const validated = api.contact.submit.input.parse(data);
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Invalid contact data");
        }
        throw new Error("Failed to send message");
      }
      return api.contact.submit.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Message envoyé",
        description:
          "Merci pour votre message. Nous vous répondrons rapidement.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// ============================================
// RENDEZ-VOUS
// ============================================
export function useRendezVousForm() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertRendezVousRequestInput) => {
      const validated = api.rendezVous.submit.input.parse(data);
      const res = await fetch(api.rendezVous.submit.path, {
        method: api.rendezVous.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Invalid rendez-vous data");
        }
        throw new Error("Failed to send rendez-vous request");
      }
      return api.rendezVous.submit.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Demande envoyée",
        description:
          "Merci pour votre demande. Nous vous contacterons rapidement.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
