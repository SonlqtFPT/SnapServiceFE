'use client'

interface LoadingOverlayProps {
  text?: string
  className?: string
}

export default function LoadingOverlay({
  text = 'Processing...',
  className = ''
}: LoadingOverlayProps) {
  return (
    <div className={`absolute inset-0 bg-white/80 z-50 flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-2" />
        <p className="text-gray-600 font-medium">{text}</p>
      </div>
    </div>
  )
}
