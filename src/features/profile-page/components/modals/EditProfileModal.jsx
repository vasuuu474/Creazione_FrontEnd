import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function EditProfileModal({ isOpen, profile, onClose, onSubmit }) {
  const [profileForm, setProfileForm] = useState({ ...profile })


  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileForm((prev) => ({ ...prev, avatar: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!profileForm.name.trim()) return
    if (!profileForm.email.trim()) return
    onSubmit(profileForm)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile Details</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Profile Photo selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-primary dark:text-white">
              Profile Photo
            </label>
            <div className="flex items-center gap-4">
              <div className="size-16 rounded-full overflow-hidden border border-border shrink-0 bg-muted">
                <img
                  src={profileForm.avatar}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-xs text-muted-foreground file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white file:cursor-pointer hover:file:bg-[#355B44]"
                />
                <p className="text-[10px] text-muted-foreground mt-1">
                  Upload a JPG, PNG, or GIF. Max 5MB.
                </p>
              </div>
            </div>
          </div>

          {/* Profile Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-primary dark:text-white">
              Profile Name
            </label>
            <input
              type="text"
              value={profileForm.name}
              onChange={(e) =>
                setProfileForm({ ...profileForm, name: e.target.value })
              }
              placeholder="E.g., Alex Sterling"
              className="w-full bg-[#f8f9fc] dark:bg-zinc-800 text-[#191c1e] dark:text-white border border-input px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-white"
              required
            />
          </div>




          {/* Location */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-primary dark:text-white">
              Location
            </label>
            <input
              type="text"
              value={profileForm.location || ''}
              onChange={(e) =>
                setProfileForm({ ...profileForm, location: e.target.value })
              }
              placeholder="E.g., San Francisco, CA"
              className="w-full bg-[#f8f9fc] dark:bg-zinc-800 text-[#191c1e] dark:text-white border border-input px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-white"
              required
            />
          </div>

          {/* Email Id */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-primary dark:text-white">
              Email Address
            </label>
            <input
              type="email"
              value={profileForm.email}
              onChange={(e) =>
                setProfileForm({ ...profileForm, email: e.target.value })
              }
              placeholder="E.g., alex.sterling@profilepage.io"
              className="w-full bg-[#f8f9fc] dark:bg-zinc-800 text-[#191c1e] dark:text-white border border-input px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-white"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-primary dark:text-white">
              Phone Number
            </label>
            <input
              type="text"
              value={profileForm.phone}
              onChange={(e) =>
                setProfileForm({ ...profileForm, phone: e.target.value })
              }
              placeholder="E.g., +1 (555) 012-3456"
              className="w-full bg-[#f8f9fc] dark:bg-zinc-800 text-[#191c1e] dark:text-white border border-input px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-white"
              required
            />
          </div>

          {/* Dialog Action Buttons */}
          <div className="flex justify-end gap-3 mt-4 border-t border-border pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg text-xs md:text-sm font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary hover:bg-[#355B44] text-white px-5 py-2 rounded-lg text-xs md:text-sm font-semibold cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
