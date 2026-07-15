import { useState } from "react";
import { Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import JoinProjectDialog from "./JoinProjectDialog";

export default function ProjectCard({ project }) {
  const [bookmarked, setBookmarked] = useState(project.bookmarked);

  return (
    <Card className="rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {project.category.map((tag, index) => (
              <Badge
                key={tag}
                variant={index === 0 ? "default" : "secondary"}
                className={cn(
                  "rounded-md px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase",
                  index === 0
                    ? "bg-brand text-brand-foreground hover:bg-brand/90"
                    : "bg-brand-light text-brand hover:bg-brand-light"
                )}
              >
                {tag}
              </Badge>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setBookmarked(!bookmarked)}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark project"}
          >
            <Bookmark
              className={cn("size-5", bookmarked && "fill-foreground text-foreground")}
            />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="font-heading text-xl font-bold leading-snug text-foreground">
            {project.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        <Separator />

        <div className="flex items-center justify-between pt-1">
          <AvatarGroup>
            <Avatar className="size-8">
              <AvatarImage src={project.avatars[0]} alt="" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            {project.members > 1 && (
              <AvatarGroupCount className="size-8 text-xs font-medium">
                +{project.members - 1}
              </AvatarGroupCount>
            )}
          </AvatarGroup>

          <JoinProjectDialog
            ideaName={project.title}
            description={project.description}
            skillsNeeded={project.skillsNeeded}
          >
            <Button
              size="sm"
              className="rounded-lg bg-brand px-5 text-brand-foreground hover:bg-brand/90"
            >
              Join Project
            </Button>
          </JoinProjectDialog>
        </div>
      </CardContent>
    </Card>
  );
}
