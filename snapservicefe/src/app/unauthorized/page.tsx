'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md w-full"
      >
        <motion.div
          initial={{ rotate: -10, scale: 0.5 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
          className="text-red-500 text-6xl mb-4"
        >
          🚫
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-gray-700 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Unauthorized
        </motion.h1>

        <motion.p
          className="text-gray-500 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Bạn không có quyền truy cập trang này. Vui lòng đăng nhập để tiếp tục.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/home')}
          className="bg-[#634C9F] text-white px-6 py-2 rounded-xl shadow hover:shadow-lg transition"
        >
          Quay lại trang chủ
        </motion.button>
      </motion.div>
    </div>
  );
}
