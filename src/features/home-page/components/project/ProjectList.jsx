import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "./ProjectCard";

export default function ProjectList({ projects }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          variant="outline"
          className="h-11 w-full max-w-md rounded-xl border-border bg-white text-sm font-medium shadow-sm transition-all hover:bg-muted/50 sm:w-auto sm:min-w-[280px]"
        >
          Show More Ideas
          <ChevronDown className="size-4" />
        </Button>
      </div>
    </div>
  );
}
