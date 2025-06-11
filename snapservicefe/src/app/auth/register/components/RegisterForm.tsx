// 'use client'

// import { registerUser } from '@/services/users/userService'
// import { useRouter } from 'next/navigation'
// import { useState } from 'react'
// import { toast, ToastContainer } from 'react-toastify'

// export default function RegisterForm() {
//     const [fullname, setFullname] = useState('')
//     const [phone, setPhone] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [role, setRole] = useState<'customer' | 'vendor'>('customer')
//     const route = useRouter()

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault()
//         try {
//             const res = await registerUser({ fullname, phone, password, email })
//             if (res && res.username && res.email) {
//                 toast.success("Đăng kí thành công")
//                 setTimeout(() => {
//                     route.push('/auth/login')
//                 }, 4000)
//             }
//         } catch (error: any) {
//             const message = error.response?.data?.message
//             if (message === "Số điện thoại đã tồn tại.") {
//                 toast.error("Số điện thoại đã tồn tại")
//             } else if (message === "Email đã được sử dụng.") {
//                 toast.error("Email đã tồn tại")
//             } else {
//                 console.error("Lỗi đăng ký:", error)
//             }
//         }
//     }

//     return (
//         <div className="max-w-md mx-auto mt-20 px-6">
//             <ToastContainer position='top-center' autoClose={3000}/>
//             <p className="text-center text-sm text-gray-600 mb-6">
//                 There are many advantages to creating an account: the payment process is faster,
//                 shipment tracking is possible and much more.
//             </p>

//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label className="block text-sm font-medium mb-1">Fullname *</label>
//                     <input
//                         type="text"
//                         value={fullname}
//                         onChange={(e) => setFullname(e.target.value)}
//                         required
//                         className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500"
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium mb-1">Phone *</label>
//                     <input
//                         type="text"
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                         required
//                         className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500"
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium mb-1">Email address *</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                         className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500"
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium mb-1">Password *</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500"
//                     />
//                 </div>

//                 <div className="space-y-1 text-sm">
//                     <label className="flex items-center gap-2">
//                         <input
//                             type="radio"
//                             name="role"
//                             value="customer"
//                             checked={role === 'customer'}
//                             onChange={() => setRole('customer')}
//                         />
//                         I am a customer
//                     </label>
//                     <label className="flex items-center gap-2">
//                         <input
//                             type="radio"
//                             name="role"
//                             value="vendor"
//                             checked={role === 'vendor'}
//                             onChange={() => setRole('vendor')}
//                         />
//                         I am a vendor
//                     </label>
//                 </div>

//                 <p className="text-xs text-gray-600 mt-4">
//                     Your personal data will be used to support your experience throughout this website,
//                     to manage access to your account, and for other purposes described in our{' '}
//                     <a href="#" className="text-purple-600 underline">
//                         privacy policy
//                     </a>.
//                 </p>

//                 <button
//                     type="submit"
//                     className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition mt-4"
//                 >
//                     Register
//                 </button>
//             </form>
//         </div>
//     )
// }
