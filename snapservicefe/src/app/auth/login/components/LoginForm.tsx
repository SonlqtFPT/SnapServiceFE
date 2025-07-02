'use client'

import { loginUser } from '@/services/users/userService'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'

type UserPayload = {
  Role: string
}

export default function LoginForm() {
  const [emailOrPhone, setEmailOrPhone] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await loginUser({ emailOrPhone, password })
      if (res?.token) {
        localStorage.setItem('token', res.token)
        const decodeData = jwtDecode(res.token)
        const userRole = (decodeData as UserPayload).Role;
        document.cookie = `token=${res.token}; path=/; max-age=3600; Secure; HttpsOnly; SameSite=Strict`;
        window.dispatchEvent(new Event('login'));
        if (userRole === 'ADMIN') {
          toast.success("Chào mừng bạn đến với trang quản trị")
          setTimeout(() => {
            route.push('/admin')
          }, 2000)
        } else {
          toast.success("Đăng nhập thành công, chào mừng bạn đến với SnapService")
          setTimeout(() => {
            route.push('/home')
          }, 2000)
        }
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại, vui lòng kiểm tra lại thông tin đăng nhập của bạn.")
      console.log(error);
    }

  }

  return (
    <div className="max-w-md mx-auto mt-20 px-6">
      <ToastContainer position='top-center' autoClose={2000} />
      <p className="text-center text-sm text-gray-600 mb-6">
        If you have an account, sign in with your username or email address.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Phone or email address *</label>
          <input
            type="text"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password *</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="accent-purple-600"
            />
            Remember me
          </label>
          <a href="#" className="text-purple-600 hover:underline">
            Lost your password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
        >
          Log in
        </button>
      </form>
    </div>
  )
}
