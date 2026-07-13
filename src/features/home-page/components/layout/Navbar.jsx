import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreateIdeaDialog from "../project/CreateIdeaDialog";

const navLinks = [
  { label: "Home", href: "#", active: true },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex h-[70px] items-center justify-between border-b border-border bg-white px-4 md:px-8">
      <div className="flex items-center gap-8">
        <a
          href="#"
          className="font-heading text-xl font-bold tracking-tight text-foreground"
        >
          Creazione
        </a>

        <nav className="hidden items-center gap-6 sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                link.active
                  ? "text-foreground underline decoration-foreground decoration-2 underline-offset-8"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <CreateIdeaDialog>
          <Button
            size="sm"
            className="bg-brand text-brand-foreground hover:bg-brand/90 sm:h-9"
          >
            <span className="sm:hidden">Create</span>
            <span className="hidden sm:inline">Create Idea</span>
          </Button>
        </CreateIdeaDialog>
        <Button
          size="icon"
          variant="ghost"
          className="text-muted-foreground hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
        </Button>
        <Avatar className="size-9 cursor-pointer">
          <AvatarImage
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"
            alt="User profile"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
