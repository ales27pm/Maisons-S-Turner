import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export function ServiceCard({ title, description, icon: Icon, className }: ServiceCardProps) {
  return (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-300 hover:shadow-xl border-t-4 border-t-transparent hover:border-t-accent hover:-translate-y-1 h-full",
      className
    )}>
      <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-1/4 -translate-y-1/4 transition-transform group-hover:scale-110 duration-500">
        <Icon className="w-32 h-32 text-primary" />
      </div>
      
      <CardHeader className="relative z-10 pb-2">
        <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mb-4 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
          <Icon className="w-7 h-7" />
        </div>
        <CardTitle className="font-display text-xl text-primary group-hover:text-primary/80 transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
