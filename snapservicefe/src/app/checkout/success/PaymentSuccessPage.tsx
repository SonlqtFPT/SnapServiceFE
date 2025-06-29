'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

const confettiVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 }
  })
}

export default function PaymentSuccessPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-100 to-white flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Decorative Confetti */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={confettiVariants}
            initial="hidden"
            animate="visible"
            className="absolute w-3 h-3 rounded-full bg-green-400"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        className="relative z-10 bg-white border border-green-400 rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center"
      >
        <motion.div
          initial={{ rotate: -30, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-4"
        >
          <CheckCircle className="text-green-600 w-24 h-24 drop-shadow-md" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-extrabold text-green-700 mb-3 tracking-tight"
        >
          Woohoo! Thanh toán thành công 🎉
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 text-lg mb-6"
        >
          Đơn hàng của bạn đã được ghi nhận và đang chuẩn bị. Cảm ơn bạn vì đã lựa chọn chúng tôi 💚
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
          >
            Về trang chủ
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
