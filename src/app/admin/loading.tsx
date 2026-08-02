"use client"

export default function AdminLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1F4D]">
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-[3px] border-white/10" />
          <div className="absolute inset-0 rounded-full border-[3px] border-t-[#F4B400]" />
          <div className="absolute inset-2 rounded-full border-[3px] border-r-[#F4B400]/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#F4B400]" />
          </div>
        </div>
        <p className="text-white/60 font-body text-sm tracking-widest uppercase">Loading Admin Panel</p>
      </div>
    </div>
  )
}