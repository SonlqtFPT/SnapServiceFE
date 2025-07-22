'use client'

import { getAPI } from '@/lib/axios'
import { registerSupplier, registerUser } from '@/services/users/userService'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
const api = getAPI()

type uploadResponse = {
    url: string
    key: string
    imageUrl: string
}
export default function RegisterForm() {
    const [fullname, setFullname] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState<'customer' | 'supplier'>('customer')
    const route = useRouter()
    const [files, setFiles] = useState<File[]>([]);
    const [message, setMessage] = useState("");
    const [uploading, setUploading] = useState(false);
    const ref = useRef<HTMLInputElement>(null);

    const productId = 383;
    const supplierId = 1; // tạm hardcode, mày có thể lấy từ props hoặc context

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setFiles(Array.from(e.target.files));
        setMessage("");
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            setMessage("Chọn ít nhất 1 file đi bro!");
            return;
        }

        setUploading(true);
        setMessage("");

        try {
            // 1. Lấy mảng contentTypes để gửi lên backend lấy presigned URLs
            const contentTypes = files.map((file) => file.type);

            // 2. Gọi API backend lấy presigned URLs
            const presignResponse = await api.post("/api/Upload/upload-images?isSupplierId=true",
                {
                    productId,
                    productSlug: "", // nếu cần
                    supplierId,
                    categoryId: 0,
                    contentTypes,
                }
            );

            const uploads = presignResponse.data.data.uploads; // array { url, key, imageUrl }
            // 3. Upload ảnh lên S3 song song
            await Promise.all(
                uploads.map((upload: any, idx: number) =>
                    axios.put(upload.url, files[idx], {
                        headers: { "Content-Type": files[idx].type },
                    })
                )
            );

            setMessage(`✅ Upload và confirm thành công ${files.length} ảnh!`);
            setFiles([]);
            return uploads; // Trả về mảng upload để sử dụng sau này
        } catch (error: any) {
            setMessage("Lỗi upload: " + (error.message || "Unknown error"));
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (role === 'customer') {
                const res = await registerUser({ fullname, phone, password, email })
                if (res && res.username && res.email) {
                    toast.success("Đăng kí thành công")
                    setTimeout(() => {
                        route.push('/auth/login')
                    }, 4000)
                }
            } else {
                const upload: uploadResponse[] = await handleUpload()
                const res = await registerSupplier({
                    fullname,
                    phone,
                    password,
                    email,
                    back_image: upload[0]?.imageUrl,
                    front_image: upload[1]?.imageUrl,
                });
                if (res && res.username && res.email) {
                    toast.success("Đăng kí thành công")
                    setTimeout(() => {
                        route.push('/auth/login')
                    }, 4000)
                }

            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message
                if (message === "Số điện thoại đã tồn tại.") {
                    toast.error("Số điện thoại đã tồn tại")
                } else if (message === "Email đã được sử dụng.") {
                    toast.error("Email đã tồn tại")
                } else {
                    console.error("Lỗi đăng ký:", error)
                }
            }
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 px-6">
            <ToastContainer position='top-center' autoClose={3000} />
            <p className="text-center text-sm text-gray-600 mb-6">
                There are many advantages to creating an account: the payment process is faster,
                shipment tracking is possible and much more.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Fullname *</label>
                    <input
                        type="text"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Phone *</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email address *</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Password *</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                {role === 'supplier' && (
                    <div>
                        <button
                            type="button"
                            onClick={() => ref.current?.click()}
                            className="cursor-pointer bg-purple-600 text-white px-4 py-2 rounded-lg inline-block hover:bg-purple-700 transition"
                        >
                            Upload ID Card
                        </button>
                        <span className="ml-3 text-sm text-gray-600">
                            {files.length > 0 ? `${files.length} file(s) selected` : "No files selected"}
                        </span>
                        <input
                            type="file"
                            multiple
                            ref={ref}
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={uploading}
                            className="hidden"
                        />

                        {message && <p>{message}</p>}

                        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                            {files.map((file, idx) => (
                                <img
                                    key={idx}
                                    src={URL.createObjectURL(file)}
                                    alt={`preview-${idx}`}
                                    style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 6 }}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className="space-y-1 text-sm">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="role"
                            value="customer"
                            checked={role === 'customer'}
                            onChange={() => setRole('customer')}
                        />
                        I am a customer
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="role"
                            value="supplier"
                            checked={role === 'supplier'}
                            onChange={() => setRole('supplier')}
                        />
                        I am a supplier
                    </label>
                </div>

                <p className="text-xs text-gray-600 mt-4">
                    Your personal data will be used to support your experience throughout this website,
                    to manage access to your account, and for other purposes described in our{' '}
                    <a href="#" className="text-purple-600 underline">
                        privacy policy
                    </a>.
                </p>

                <button
                    type="submit"
                    className="cursor-pointer w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition mt-4"
                >
                    Register
                </button>
            </form>
        </div>
    )
}
