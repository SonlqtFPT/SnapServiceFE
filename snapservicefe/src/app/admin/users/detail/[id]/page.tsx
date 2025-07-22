"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getUserById } from "@/services/users/userService";
import { UserDetail } from "@/model/response/userResponse";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function UserDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (typeof id === "string") {
        try {
          const data = await getUserById(id);
          setUser(data);
        } catch (error) {
          console.error("Failed to fetch user details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-gray-500 text-center">Loading user data...</div>;
  }

  if (!user) {
    return <div className="p-8 text-red-500 text-center">User not found.</div>;
  }

  return (
    <div className="flex justify-center p-8">
      <Card className="w-full max-w-3xl rounded-xl shadow-xl border border-gray-100">
        <CardHeader className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gray-50 rounded-t-xl">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              src={user.ImageUrl || "/default-avatar.png"}
              alt="Avatar"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left space-y-1">
            <h2 className="text-2xl font-bold text-gray-800">{user.FullName}</h2>
            <p className="text-gray-500 text-sm">{user.Email}</p>
            <span
              className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${user.IsActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
            >
              {user.IsActive ? "Active" : "Inactive"}
            </span>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 text-sm text-gray-700">
         
          <div className="space-y-1">
            <p className="text-gray-500">Username</p>
            <p className="font-medium">{user.Username}</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-500">Phone</p>
            <p className="font-medium">{user.Phone || "Not updated"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-500">Role</p>
            <p className="font-medium">{user.Role}</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-500">Area Code</p>
            <p className="font-medium">{user.AreaCode || "Not updated"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-500">Address</p>
            <p className="font-medium">{user.Address || "Not updated"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-500">Created At</p>
            <p className="font-medium">
              {new Date(user.CreatedAt).toLocaleDateString("en-GB")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
