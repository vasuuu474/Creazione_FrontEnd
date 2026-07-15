import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Bell, ChevronDown, LogOut, User, Settings, Users } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/store/useAuthStore'
import { useProjectStore } from '@/store/useProjectStore'
import { useUIStore } from '@/store/useUIStore'
import { useIsFounder } from '../../hooks/useIsFounder'
import { useHeaderEditing } from '../../hooks/useHeaderEditing'

export default function Navbar() {
  const navigate = useNavigate()
  const currentUser = useAuthStore((state) => state.currentUser)
  const switchUser = useAuthStore((state) => state.switchUser)
  const logout = useAuthStore((state) => state.logout)
  const founderEmail = useProjectStore((state) => state.project.founder.email)
  const showToast = useUIStore((state) => state.showToast)
  const isFounder = useIsFounder()
  const { requestEditHeader, stopEditHeader } = useHeaderEditing()

  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Dr. Aris Thorne updated the project scope', time: '2h ago', unread: true },
    { id: 2, text: 'Marcus Chen updated DevOps deployment pipeline', time: '4h ago', unread: true },
    { id: 3, text: 'Sarah Jenkins approved UX components draft', time: '1d ago', unread: false },
  ])

  const unreadCount = notifications.filter((n) => n.unread).length

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })))
  }

  const handleUserSwitch = () => {
    const next = switchUser()
    if (next.email === founderEmail) {
      showToast(`Logged in as ${next.name} (Project Founder)!`)
    } else {
      stopEditHeader()
      showToast(`Logged in as ${next.name}!`)
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/")
    showToast("Logged out successfully!")
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-border dark:border-zinc-800 shadow-sm">
      <div className="max-w-[1280px] mx-auto px-4 md:px-12 h-16 flex items-center justify-between">

        {/* Left Section: Logo & Navigation */}
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

        {/* Right Section - User Operations */}
        <div className="flex items-center gap-4">

          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors cursor-pointer" aria-label="Notifications">
                <Bell className="size-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 size-2 bg-[#ba1a1a] rounded-full ring-2 ring-white" />
                )}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-80 p-2 bg-white border border-brand-border rounded-lg shadow-lg">
              <div className="flex items-center justify-between px-2 py-1.5">
                <DropdownMenuLabel className="font-serif text-sm font-bold text-brand-primary">Notifications</DropdownMenuLabel>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-[#2563eb] hover:underline font-medium cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <DropdownMenuSeparator className="bg-brand-border my-1" />
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-xs text-brand-text-muted">No new notifications</div>
              ) : (
                <div className="max-h-[300px] overflow-y-auto space-y-1">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-md text-xs transition-colors hover:bg-gray-50 ${n.unread ? 'bg-[#f4f7fe]' : ''}`}
                    >
                      <p className="font-medium text-brand-text leading-snug">{n.text}</p>
                      <span className="text-[10px] text-brand-text-muted mt-1 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                onClick={(e) => {
                  // Clicking the avatar image itself jumps straight to
                  // Profile; clicking elsewhere in this button (e.g. the
                  // chevron) still opens the dropdown as before.
                  if (e.target.tagName === 'IMG') {
                    e.preventDefault()
                    navigate('/profile')
                  }
                }}
                className="flex items-center gap-1.5 focus:outline-none rounded-full p-0.5 hover:bg-gray-100 transition-all cursor-pointer"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-brand-border shadow-sm"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
                  }}
                />
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 p-1 bg-white border border-brand-border rounded-lg shadow-lg">
              <div className="px-2 py-2">
                <p className="text-xs font-semibold text-brand-text">{currentUser.name}</p>
                <p className="text-[10px] text-brand-text-muted">{currentUser.email}</p>
              </div>
              <DropdownMenuSeparator className="bg-brand-border" />

              <DropdownMenuItem
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 text-xs py-2 text-brand-text hover:bg-gray-50 rounded-md cursor-pointer"
              >
                <User className="w-4 h-4 text-brand-text-muted" />
                <span>My Profile</span>
              </DropdownMenuItem>

              {isFounder && (
                <DropdownMenuItem
                  onClick={requestEditHeader}
                  className="flex items-center gap-2 text-xs py-2 text-brand-text hover:bg-gray-50 rounded-md cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-brand-text-muted" />
                  <span>Edit Project Details</span>
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator className="bg-brand-border" />

              <DropdownMenuItem
                onClick={handleUserSwitch}
                className="flex items-center gap-2 text-xs py-2 text-brand-primary font-bold hover:bg-brand-bg rounded-md cursor-pointer border border-brand-border/40 my-1"
              >
                <Users className="w-4 h-4 text-brand-primary" />
                <span>Switch User (Role Demo)</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-brand-border" />

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
  )
}
