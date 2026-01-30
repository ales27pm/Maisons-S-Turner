import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { useProjects } from "@/hooks/use-content";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Realisations() {
  const { data: projects, isLoading } = useProjects();
  const [filter, setFilter] = useState("Toutes");

  const categories = [
    "Toutes",
    "Maison neuve",
    "Rénovation",
    "Commercial",
    "Paysagement",
  ];
  const categoryMap: Record<string, string | null> = {
    Toutes: null,
    "Maison neuve": "New Build",
    Rénovation: "Renovation",
    Commercial: "Commercial",
    Paysagement: "Landscape",
  };

  // Filter logic
  const filteredProjects =
    projects?.filter((project) => {
      const mappedCategory = categoryMap[filter];
      return mappedCategory === null || project.category === mappedCategory;
    }) || [];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <Navigation />

      {/* Header */}
      <div className="bg-primary text-white pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Nos réalisations
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Découvrez nos projets récents.
          </p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              className={cn(
                "rounded-full px-6",
                filter === category
                  ? "bg-accent hover:bg-accent/90 text-white border-transparent"
                  : "bg-white text-slate-600 hover:bg-slate-100 border-slate-200",
              )}
              onClick={() => setFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Project Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[250px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              // Empty state or Fallback if API is empty
              <div className="col-span-full text-center py-20">
                {projects && projects.length === 0 ? (
                  <>
                    {/* Static Fallback for Demo purposes if DB is empty */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                      <ProjectCard
                        project={{
                          id: 1,
                          title: "Maison de campagne moderne",
                          description:
                            "Une superbe maison moderne de 3 500 pi² avec un espace de vie à aire ouverte.",
                          category: "Maison neuve",
                          imageUrl:
                            "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop",
                          location: "Westmount, QC",
                          completionDate: "Oct. 2024",
                        }}
                      />
                      <ProjectCard
                        project={{
                          id: 2,
                          title: "Rénovation d'un loft urbain",
                          description:
                            "Rénovation complète d'un ancien entrepôt transformé en lofts haut de gamme.",
                          category: "Rénovation",
                          imageUrl:
                            "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop",
                          location: "Plateau, Montreal",
                          completionDate: "Août 2024",
                        }}
                      />
                      <ProjectCard
                        project={{
                          id: 3,
                          title: "Bureaux de direction",
                          description:
                            "Aménagement commercial haut de gamme avec boiseries sur mesure.",
                          category: "Commercial",
                          imageUrl:
                            "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
                          location: "Downtown Montreal",
                          completionDate: "Déc. 2024",
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground">
                    Aucun projet ne correspond à cette catégorie.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
