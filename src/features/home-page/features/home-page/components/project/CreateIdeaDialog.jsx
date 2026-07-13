import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const SUGGESTED_SKILLS = [
  "React",
  "Node.js",
  "UI/UX",
  "Python",
  "AI/ML",
  "Flutter",
  "MongoDB",
  "Figma",
];

const initialFormState = {
  ideaName: "",
  description: "",
  skills: [],
};

export default function CreateIdeaDialog({ children }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [skillInput, setSkillInput] = useState("");

  const resetForm = () => {
    setForm(initialFormState);
    setErrors({});
    setSkillInput("");
  };

  const handleOpenChange = (nextOpen) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      resetForm();
    }
  };

  const addSkill = (skill) => {
    const trimmed = skill.trim();
    if (!trimmed || form.skills.includes(trimmed)) return;
    setForm((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
    setSkillInput("");
  };

  const removeSkill = (skill) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(skillInput);
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.ideaName.trim()) {
      nextErrors.ideaName = "Idea name is required.";
    }
    if (!form.description.trim()) {
      nextErrors.description = "Description is required.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ideaName: form.ideaName.trim(),
      description: form.description.trim(),
      skills: form.skills,
    };

    console.log("New idea submitted:", payload);

    setOpen(false);
    resetForm();
    toast.success("Idea posted successfully!");
  };

  const availableSuggestions = SUGGESTED_SKILLS.filter(
    (skill) => !form.skills.includes(skill)
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="border-b border-border px-6 py-5">
            <DialogTitle className="font-heading text-xl font-bold">
              Pitch a New Idea
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 px-6 py-5">
            <div className="space-y-2">
              <Label htmlFor="idea-name">Idea Name</Label>
              <Input
                id="idea-name"
                placeholder="Enter your project idea"
                value={form.ideaName}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, ideaName: e.target.value }));
                  if (errors.ideaName) {
                    setErrors((prev) => ({ ...prev, ideaName: undefined }));
                  }
                }}
                aria-invalid={!!errors.ideaName}
                className="h-10 rounded-xl"
              />
              {errors.ideaName && (
                <p className="text-xs text-destructive">{errors.ideaName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your idea, its purpose, features, and what you want to build..."
                value={form.description}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, description: e.target.value }));
                  if (errors.description) {
                    setErrors((prev) => ({ ...prev, description: undefined }));
                  }
                }}
                aria-invalid={!!errors.description}
                className="min-h-[140px] resize-none rounded-xl"
              />
              {errors.description && (
                <p className="text-xs text-destructive">{errors.description}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="skills">Required Skills</Label>

              {form.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {form.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="gap-1 rounded-full bg-brand-light px-3 py-1 text-sm text-brand"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-0.5 rounded-full transition-colors hover:text-destructive"
                        aria-label={`Remove ${skill}`}
                      >
                        <X className="size-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              <Input
                id="skills"
                placeholder="Type a skill and press Enter..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                className="h-10 rounded-xl"
              />

              {availableSuggestions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {availableSuggestions.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => addSkill(skill)}
                      className={cn(
                        "rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground transition-all hover:border-brand hover:bg-brand-light hover:text-brand"
                      )}
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="border-t border-border bg-muted/30 px-6 py-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-xl bg-brand text-brand-foreground hover:bg-brand/90"
            >
              Post Idea
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
