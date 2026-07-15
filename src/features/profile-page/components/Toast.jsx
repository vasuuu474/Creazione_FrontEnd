import { useUIStore } from '@/store/useUIStore'

export default function Toast() {
  const toastMessage = useUIStore((state) => state.toastMessage)

  if (!toastMessage) return null

  const isError = /error|required|cannot|fail/i.test(toastMessage)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      <div
        className={`pointer-events-auto px-5 py-3 rounded-lg shadow-md border text-xs md:text-sm font-semibold transition-all duration-300 animate-in slide-in-from-bottom flex items-center gap-2 ${
          !isError
            ? 'bg-[#d3e8d3] text-primary border-[#b7ccb7] dark:bg-zinc-800 dark:text-green-300 dark:border-green-800'
            : 'bg-[#ffdad6] text-[#ba1a1a] border-[#ffdad6] dark:bg-red-950/60 dark:text-red-300 dark:border-red-900'
        }`}
      >
        <span>{toastMessage}</span>
      </div>
    </div>
  )
}
