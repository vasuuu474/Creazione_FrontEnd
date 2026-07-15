import { useNavigate, Link } from "react-router-dom";
import { Bell, ChevronDown, LogOut, User, Users } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/useAuthStore";
import CreateIdeaDialog from "../project/CreateIdeaDialog";

export default function Navbar() {
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.currentUser);
  const switchUser = useAuthStore((state) => state.switchUser);
  const logout = useAuthStore((state) => state.logout);

  const handleUserSwitch = () => {
    const next = switchUser();
    toast.success(`Logged in as ${next.name} !`);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logged out successfully!");
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-border dark:border-zinc-800 shadow-sm">
      <div className="max-w-[1280px] mx-auto px-4 md:px-12 h-16 flex items-center justify-between">

        {/* Left Side: Logo & Navigation */}
        <div className="flex items-center gap-8 md:gap-12">
          {/* Logo */}
          <Link to="/home" className="font-heading text-xl font-bold tracking-tight text-primary dark:text-[#b4cdb8] hover:opacity-90 transition-opacity">
            Creazione
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6">
            <Link
              to="/home"
              className="font-sans text-sm font-semibold text-primary dark:text-[#b4cdb8] hover:text-[#061b0e] dark:hover:text-white transition-colors relative after:absolute after:bottom-[-20px] after:left-0 after:w-full after:h-[2px] after:bg-primary dark:after:bg-[#b4cdb8]"
            >
              Home
            </Link>
          </nav>
        </div>

        {/* Right Side: CTA, Notifications & Avatar */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Create Idea Buttons wrapped in dialog trigger */}
          <CreateIdeaDialog>
            <button
              className="hidden sm:inline-flex items-center justify-center bg-primary hover:bg-[#355B44] text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Create Idea
            </button>
          </CreateIdeaDialog>

          <CreateIdeaDialog>
            <button
              className="sm:hidden flex items-center justify-center bg-primary hover:bg-[#355B44] text-white px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
            >
              Create
            </button>
          </CreateIdeaDialog>

          {/* Notification Bell */}
          <button className="relative p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors cursor-pointer" aria-label="Notifications">
            <Bell className="size-5" />
            <span className="absolute top-1 right-1 size-2 bg-[#ba1a1a] rounded-full ring-2 ring-white" />
          </button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                onClick={(e) => {
                  if (e.target.tagName === 'IMG') {
                    e.preventDefault();
                    navigate('/profile');
                  }
                }}
                className="flex items-center gap-1 focus:outline-none rounded-full p-0.5 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-border shadow-sm"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120";
                  }}
                />
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 p-1 bg-white dark:bg-zinc-900 border border-border rounded-lg shadow-lg">
              <div className="px-2 py-2">
                <p className="text-xs font-semibold text-foreground">{currentUser.name}</p>
                <p className="text-[10px] text-muted-foreground">{currentUser.email}</p>
              </div>
              <DropdownMenuSeparator className="bg-border" />

              <DropdownMenuItem
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 text-xs py-2 text-foreground hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-md cursor-pointer"
              >
                <User className="w-4 h-4 text-muted-foreground" />
                <span>My Profile</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-border" />

              <DropdownMenuItem
                onClick={handleUserSwitch}
                className="flex items-center gap-2 text-xs py-2 text-primary dark:text-[#b4cdb8] font-bold hover:bg-muted rounded-md cursor-pointer border border-border/40 my-1"
              >
                <Users className="w-4 h-4" />
                <span>Switch User (Role Demo)</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-border" />

              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 text-xs py-2 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>
    </header>
  );
}
