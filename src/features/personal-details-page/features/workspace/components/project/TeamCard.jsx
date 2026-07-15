import React from 'react'
import TeamMember from './TeamMember'
import { Button } from '@/components/ui/button'

export default function TeamCard({ 
  members, 
  totalMembersCount, 
  onViewAllClick
}) {
  return (
    <div className="bg-white border border-[#e1e4ea] rounded-[16px] p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
      
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-4 select-none">
          <h3 className="font-serif text-lg font-bold text-brand-primary">Team</h3>
          <span className="text-[10px] font-extrabold tracking-wider text-brand-text-muted uppercase">
            {totalMembersCount} Members
          </span>
        </div>
        
        {/* Members List */}
        <div className="space-y-1">
          {members.map((member) => (
            <TeamMember 
              key={member.id} 
              member={member} 
            />
          ))}
          {members.length === 0 && (
            <p className="text-xs text-brand-text-muted py-4 text-center">No team members assigned.</p>
          )}
        </div>
      </div>

      {/* View All Members Button */}
      <Button
        onClick={onViewAllClick}
        className="w-full bg-white hover:bg-gray-50 text-[#1b3022] hover:text-[#122017] text-xs font-bold tracking-wider rounded-[4px] py-2.5 h-10 border border-brand-border inline-flex items-center justify-center cursor-pointer transition-all duration-200 uppercase mt-6 select-none"
      >
        View All Members
      </Button>

    </div>
  )
}
