// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'SnapService',
  description: 'SnapService ne',
  icons: {
    icon: '/favicon.ico', 
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800">
        <Header />
        <main className="min-h-screen container mx-auto p-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
