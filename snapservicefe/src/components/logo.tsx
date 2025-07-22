// src/components/Logo.tsx
'use client'

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img
        src="/snapservice.svg"
        alt="SnapService logo"
        className="h-8 w-8 dark:hidden"
      />
      <img
        src="/snapservice.svg"
        alt="SnapService dark logo"
        className="h-8 w-8 hidden dark:block"
      />
      <span className="text-xl font-bold text-gray-800 dark:text-white select-none">
        SnapService
      </span>
    </div>
  )
}
