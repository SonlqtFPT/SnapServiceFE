"use client"

import { useEffect, useState } from "react"
import { userProfile } from "@/services/users/userService"
import { User } from "@/types/user/UserType"
import Image from "next/image"

export default function ShipperProfileClient() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await userProfile()
        setUser(profile)
      } catch (err) {
        setError("Failed to load user information.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>
  if (!user) return null

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded shadow">
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={user.imageUrl || "/default-avatar.png"}
          alt={user.fullName}
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.fullName}</h1>
          <p className="text-sm text-gray-600">{user.role}</p>
          <p className={`text-sm ${user.isActive ? "text-green-600" : "text-red-600"}`}>
            {user.isActive ? "Active" : "Inactive"}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Created at:</strong> {new Date(user.createdAt).toLocaleDateString("en-US")}</p>
      </div>
    </div>
  )
}
