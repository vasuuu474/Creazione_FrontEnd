import { Mail, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function FounderCard({ name, role, avatar, onContactClick }) {
  return (
    <div className="bg-[#1b3022] text-white rounded-[16px] p-6 relative overflow-hidden shadow-md shadow-[#1b3022]/15">
      
      {/* Faded Background Star Symbol */}
      <div className="absolute -top-4 -right-4 text-white/5 pointer-events-none select-none">
        <Star className="w-32 h-32 fill-white/5 stroke-none" />
      </div>

      <div className="relative z-10 space-y-5">
        
        {/* Card Category Header */}
        <h4 className="text-[11px] font-extrabold tracking-wider text-[#819986] uppercase select-none">
          Project Founder
        </h4>

        {/* Founder Info */}
        <div className="flex items-center gap-4">
          <img 
            src={avatar} 
            alt={name} 
            className="w-14 h-14 rounded-md object-cover border-2 border-white/20 shadow-inner"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
            }}
          />
          <div>
            <h3 className="font-serif text-lg font-bold leading-snug tracking-wide">
              {name}
            </h3>
            <p className="text-xs text-[#819986] font-semibold mt-0.5">
              {role}
            </p>
          </div>
        </div>

        {/* Contact Founder Button */}
        <Button
          onClick={onContactClick}
          className="w-full bg-white hover:bg-gray-100 text-[#1b3022] text-xs font-bold tracking-wider rounded-[4px] py-2.5 h-10 border border-transparent inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 select-none uppercase"
        >
          <Mail className="w-4 h-4" />
          <span>Contact Founder</span>
        </Button>

      </div>
    </div>
  )
}
