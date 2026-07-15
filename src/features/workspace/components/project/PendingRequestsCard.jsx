import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useProjectStore } from '@/store/useProjectStore'

export default function PendingRequestsCard() {
  const pendingRequests = useProjectStore((state) => state.project.pendingRequests || [])
  const acceptJoinRequest = useProjectStore((state) => state.acceptJoinRequest)
  const declineJoinRequest = useProjectStore((state) => state.declineJoinRequest)

  if (pendingRequests.length === 0) return null

  return (
    <div className="bg-white border border-[#e1e4ea] rounded-[16px] p-6 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100 select-none">
        <h3 className="font-serif text-lg font-bold text-brand-primary">Join Requests</h3>
        <span className="text-[10px] font-extrabold tracking-wider text-red-500 bg-red-50 px-2 py-0.5 rounded-full uppercase">
          {pendingRequests.length} Pending
        </span>
      </div>

      {/* Requests List */}
      <div className="space-y-3">
        {pendingRequests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between gap-3 p-3 bg-[#f8f9fc] rounded-xl border border-gray-100"
          >
            {/* User Info */}
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={request.avatar}
                alt={request.name}
                className="w-10 h-10 rounded-full object-cover border border-brand-border shrink-0"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
                }}
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-brand-text truncate leading-tight">
                  {request.name}
                </p>
                <p className="text-xs text-brand-text-muted truncate mt-0.5">
                  {request.role || 'Contributor'}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <Button
                size="sm"
                onClick={() => acceptJoinRequest(request.id)}
                className="size-8 p-0 bg-primary hover:bg-[#355B44] text-white rounded-lg cursor-pointer"
                title="Accept Request"
              >
                <Check className="size-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => declineJoinRequest(request.id)}
                className="size-8 p-0 border border-red-200 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                title="Decline Request"
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
