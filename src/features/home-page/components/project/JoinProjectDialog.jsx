import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lightbulb, FileText, Wrench, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/store/useAuthStore";
import { useProjectStore } from "@/store/useProjectStore";

export default function JoinProjectDialog({
  children,
  ideaName,
  description,
  skillsNeeded = [],
}) {
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.currentUser);
  const addMemberToProjectIfRoom = useProjectStore((state) => state.addMemberToProjectIfRoom);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestJoin = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setOpen(false);
      toast.success("Your request has been sent successfully!");
      // NOTE: member shape here is a best guess (id/name/avatar/role) based
      // on how TeamCard/FounderCard render project.founder elsewhere - we
      // haven't seen TeamCard.jsx's source, so double check this matches
      // once that file is available.
      addMemberToProjectIfRoom({
        id: currentUser.email,
        name: currentUser.name,
        avatar: currentUser.avatar,
        role: currentUser.role,
      });
      // currentUser is not this project's founder, so Workspace will
      // automatically render the member view via useIsFounder().
      navigate("/workspace");
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-lg">
        <DialogHeader className="border-b border-border px-6 py-5">
          <DialogTitle className="font-heading text-xl font-bold">
            Project Details
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 px-6 py-5">
            <section className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Lightbulb className="size-4 text-brand" />
                Idea Name
              </div>
              <h2 className="font-heading text-2xl font-bold leading-snug text-foreground">
                {ideaName}
              </h2>
            </section>

            <Separator />

            <section className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <FileText className="size-4 text-brand" />
                Description
              </div>
              <p className="text-sm leading-relaxed text-foreground/80">
                {description}
              </p>
            </section>

            <Separator />

            <section className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Wrench className="size-4 text-brand" />
                Skills Needed
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsNeeded.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="rounded-full bg-brand-light px-3 py-1 text-sm font-medium text-brand"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          </div>
        </ScrollArea>

        <DialogFooter className="border-t border-border bg-muted/30 px-6 py-4">
          <Button
            type="button"
            variant="outline"
            className="rounded-xl"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="rounded-xl bg-brand text-brand-foreground hover:bg-brand/90"
            onClick={handleRequestJoin}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Request to Join"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
