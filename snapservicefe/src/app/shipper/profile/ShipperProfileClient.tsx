'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { userProfile, assignShipperArea } from '@/services/users/userService'
import type { User } from '@/types/user/UserType'
import ConfirmDialog from '@/components/ui/ConfirmDialog'

type Province = { code: number; name: string }
type District = { code: number; name: string }
type Ward = { code: number; name: string }

export default function ShipperProfileClient() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [areaCode, setAreaCode] = useState<string | null>(null)
  const [areaText, setAreaText] = useState<string>('No area assigned')

  const [districts, setDistricts] = useState<District[]>([])
  const [wards, setWards] = useState<Ward[]>([])

  const [formData, setFormData] = useState({
    provinceCode: '79',
    districtCode: '',
    wardCode: '',
  })

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  useEffect(() => {
    userProfile()
      .then((res: any) => {
        setUser(res.userProfile)
        setAreaCode(res.areaCode)
      })
      .catch(() => setError('Failed to load user profile.'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!areaCode) return

    const decodeAreaCode = async () => {
      const [provinceCode, districtCode, wardCode] = areaCode.split('_')
      try {
        const [province, districtRes] = await Promise.all([
          axios.get(`https://provinces.open-api.vn/api/p/${Number(provinceCode)}`),
          axios.get(`https://provinces.open-api.vn/api/d/${Number(districtCode)}?depth=2`)
        ])
        const ward = districtRes.data.wards.find((w: any) => w.code === Number(wardCode))
        setAreaText([
          province.data?.name,
          districtRes.data?.name,
          ward?.name || 'Unknown ward'
        ].join(', '))
      } catch {
        setAreaText('Failed to decode assigned area.')
      }
    }

    decodeAreaCode()
  }, [areaCode])

  useEffect(() => {
    axios.get(`https://provinces.open-api.vn/api/p/79?depth=2`)
      .then(res => setDistricts(res.data.districts))
      .catch(() => toast.error('Failed to load districts'))
  }, [])

  useEffect(() => {
    if (!formData.districtCode) {
      setWards([])
      return
    }

    axios.get(`https://provinces.open-api.vn/api/d/${formData.districtCode}?depth=2`)
      .then(res => setWards(res.data.wards))
      .catch(() => toast.error('Failed to load wards'))
  }, [formData.districtCode])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const confirmSubmit = async () => {
    if (!formData.provinceCode || !formData.districtCode || !formData.wardCode) {
      toast.warn('Please select all fields before submitting.')
      return
    }

    setLoadingSubmit(true)
    try {
      await assignShipperArea({
        provinceCode: Number(formData.provinceCode),
        districtCode: Number(formData.districtCode),
        wardCode: Number(formData.wardCode),
      })

      const newAreaCode = `${formData.provinceCode}_${formData.districtCode}_${formData.wardCode}`
      setAreaCode(newAreaCode)
      toast.success('Area assignment successful!')
    } catch {
      toast.error('Failed to assign area.')
    } finally {
      setConfirmOpen(false)
      setLoadingSubmit(false)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>
  if (!user) return null

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded shadow space-y-8">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <img
          src={user.imageUrl || 'https://file.hstatic.net/200000472237/article/shipper-giao-hang-nhanh_2a47c6ffebd84a0486ebdfade644640a.jpg'}
          alt={user.fullName || 'User Avatar'}
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.fullName}</h1>
          <p className="text-sm text-gray-600">{user.role}</p>
          <p className={`text-sm ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
            {user.isActive ? 'Active' : 'Inactive'}
          </p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="space-y-2 text-sm">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Created at:</strong> {new Date(user.createdAt).toLocaleDateString('en-US')}</p>
        <p><strong>Assigned Area:</strong> {areaText}</p>
      </div>

      {/* Assign Area */}
      <div className="space-y-4 pt-6 border-t">
        <h2 className="text-lg font-semibold">Assign Delivery Area</h2>

        <select
          name="provinceCode"
          value="79"
          disabled
          className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700"
        >
          <option value="79">Hồ Chí Minh</option>
        </select>

        <select
          name="districtCode"
          value={formData.districtCode}
          onChange={handleChange}
          disabled={!formData.provinceCode}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">-- Select District --</option>
          {districts.map(d => (
            <option key={d.code} value={d.code}>{d.name}</option>
          ))}
        </select>

        <select
          name="wardCode"
          value={formData.wardCode}
          onChange={handleChange}
          disabled={!formData.districtCode}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">-- Select Ward --</option>
          {wards.map(w => (
            <option key={w.code} value={w.code}>{w.name}</option>
          ))}
        </select>

        <button
          onClick={() => setConfirmOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Confirm Area Assignment
        </button>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmSubmit}
        title="Confirm Area Assignment"
        description="Are you sure you want to assign this delivery area?"
        confirmText="Assign"
        loading={loadingSubmit}
      />
    </div>
  )
}
