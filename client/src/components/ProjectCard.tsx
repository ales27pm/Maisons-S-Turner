import { Project } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden border-0 shadow-lg bg-card rounded-xl h-full flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        
        <Badge className="absolute top-4 right-4 bg-accent hover:bg-accent text-white font-medium border-0 shadow-md">
          {project.category}
        </Badge>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-display text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">
          {project.description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
          {project.location && (
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="w-3 h-3 mr-1 text-accent" />
              {project.location}
            </div>
          )}
          {project.completionDate && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="w-3 h-3 mr-1 text-accent" />
              {project.completionDate}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
