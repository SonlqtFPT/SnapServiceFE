'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { XCircle } from 'lucide-react'
import Link from 'next/link'

// Tạo danh sách icon ❌ random vị trí và màu
const floatingIcons = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  delay: Math.random() * 3,
  duration: 4 + Math.random() * 3,
  color: `hsl(${Math.random() * 360}, 80%, 90%)`,
}))

export default function PaymentFailedPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Nền gradient phía sau */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-50 to-white z-0" />

      {/* Icon ❌ nền động mờ nhẹ */}
      {floatingIcons.map((icon) => (
        <motion.div
          key={icon.id}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{
            duration: icon.duration,
            delay: icon.delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
          className="absolute z-10 blur-[1px] pointer-events-none"
          style={{
            top: `${icon.top}%`,
            left: `${icon.left}%`,
            color: icon.color,
          }}
        >
            ❌
        </motion.div>
      ))}

      {/* Nội dung chính */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 12 }}
        className="relative z-20 bg-white border border-red-300 rounded-2xl shadow-xl p-10 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ rotate: 10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-4"
        >
          <XCircle className="text-red-600 w-20 h-20" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-extrabold text-red-700 mb-2"
        >
          Thanh toán thất bại!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-6 leading-relaxed"
        >
          Có thể đã xảy ra lỗi trong quá trình xử lý. <br />
          Vui lòng thử lại hoặc liên hệ bộ phận hỗ trợ để được giúp đỡ kịp thời.
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-300 hover:scale-105"
          >
            Quay về trang chủ
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
