'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { CartItem } from '@/app/cart/typeOfCart'
import axios from 'axios'
import { Order } from '@/services/payment/paymentService'

const confettiVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 }
  })
}
export type userData = {
  address: string
  districtCode: string
  lat: number
  lng: number
  name: string
  phone: string
  provinceCode: string
  wardCode: string
}

export default function PaymentSuccessPage() {
  const key = '5b3ce3597851110001cf624802b2bf2ae3e948e99c137c69ace1a778'
  const [userData, setUserData] = useState<userData | null>()
  const [productsData, setProductsData] = useState<Record<number, CartItem[]>>()
  const [total, setTotal] = useState<number>(0)
  const [token, setToken] = useState<string>('')

  const groupProductsBySupplier = (products: CartItem[]) => {
    return products.reduce((acc: { [key: number]: CartItem[] }, product) => {
      if (!acc[product.supplier.id]) {
        acc[product.supplier.id] = [];
      }
      acc[product.supplier.id].push(product);
      return acc;
    }, {});
  }


  useEffect(() => {
    {
      const userLocal = localStorage.getItem('checkoutFormData');
      const productsLocal = localStorage.getItem('checkout');
      const tokenLocal = localStorage.getItem("token")
      if (tokenLocal) {
        setToken(tokenLocal)
      }
      if (userLocal && productsLocal) {
        const products = JSON.parse(productsLocal)
        const groupProducts = groupProductsBySupplier(products);
        console.log(groupProducts)
        const user = JSON.parse(userLocal)
        setTotal(products.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0))
        setUserData(user)
        setProductsData(groupProducts)
      }
    }
  }, [])


  const getDistance = async (): Promise<number> => {
    if (userData == null) {
      return 0
    }
    const from: [number, number] = [106.682032, 10.776388];
    const to: [number, number] = [userData?.lng, userData?.lat]
    try {
      const res = await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${key}&start=${from}&end=${to}`)
      const distance = res.data.features?.[0].properties.summary.distance
      return distance / 1000;
    } catch (error) {
      console.log(error)
      return 0;
    }
  }

  const removeProductsFromCart = (productsInCheckout: CartItem[]) => {
    // Lấy giỏ hàng hiện tại từ localStorage
    const productsLocal = localStorage.getItem('cart');
    if (productsLocal) {
      const products: CartItem[] = JSON.parse(productsLocal);

      // Lọc ra các sản phẩm trong giỏ hàng mà không có trong checkout
      const updatedProducts = products.filter(product =>
        !productsInCheckout.some(item => item.id === product.id)
      );

      // Cập nhật lại giỏ hàng trong localStorage
      localStorage.setItem('cart', JSON.stringify(updatedProducts));
    }
  };

  const checkoutProducts = productsData ? Object.values(productsData).flat() : [];
  removeProductsFromCart(checkoutProducts);


  const createOrder = async () => {
    try {
      console.log(token)
      if (userData && productsData) {
        const distance = await getDistance();
        removeProductsFromCart(Object.values(productsData).flat());
        const res = await Order(userData, productsData, distance, total, token)
        localStorage.removeItem("checkout")
        console.log(res)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (userData && productsData) {
      getDistance()
      createOrder();
    }
  }, [userData, productsData])
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-100 to-white flex flex-col items-center justify-center px-4 overflow-hidden">
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
          Woohoo! Payment successful 🎉
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 text-lg mb-6"
        >
          Your order has been received and is being prepared. Thank you for choosing us 💚
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
            Back to home page
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
