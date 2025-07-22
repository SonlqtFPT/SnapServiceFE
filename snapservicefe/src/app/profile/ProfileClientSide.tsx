'use client';
import { userProfile } from "@/services/users/userService";
import { User } from "@/types/user/UserType";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function ProfileClientSide() {
    const [user, setUser] = useState<User>({
        fullName: "",
        username: "",
        email: "",
        phone: "",
        address: "",
        imageUrl: "",
        role: "User",
        isActive: true,
        createdAt: "",
    })
    const [avatarUrl, setAvatarUrl] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_O1ip1ysN7xpCFu6AgBgbmbXK4RvC5MJRMA&s");

    const fetchUserData = async () => {
        try {
            const response = await userProfile() ;
            console.log("User data:", response);
            if (response) {
                setUser({
                    fullName: response.fullName,
                    username: response.username,
                    email: response.email,
                    phone: response.phone,
                    address: response.address,
                    imageUrl: response.imageUrl || "/default-avatar.png", // Fallback image
                    role: response.role,
                    isActive: response.isActive,
                    createdAt: response.createdAt,
                });
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);
    const fallback = (value?: string | null) => {
        return value?.trim() ? value : "Not provided";
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
                <div className="bg-[#9810FA] h-40 relative">
                    <Image
                        width={128}
                        height={128}
                        src={avatarUrl}
                        alt="avatar"
                        className="w-32 h-32 rounded-full border-4 border-white absolute -bottom-16 left-1/2 transform -translate-x-1/2"
                        onError={() => setAvatarUrl("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_O1ip1ysN7xpCFu6AgBgbmbXK4RvC5MJRMA&s")}
                    />
                </div>

                <div className="pt-20 pb-10 px-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">{fallback(user.fullName)}</h2>
                    <p className="text-gray-500">@{fallback(user.username)}</p>
                    <p className="mt-2 text-sm text-gray-600">{fallback(user.role)}</p>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-gray-800 font-medium">{fallback(user.email)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="text-gray-800 font-medium">{fallback(user.phone)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Address</p>
                            <p className="text-gray-800 font-medium">{fallback(user.address)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Active</p>
                            <p className={`font-medium ${user.isActive ? "text-green-600" : "text-red-600"}`}>
                                {user.isActive ? "Yes" : "No"}
                            </p>
                        </div>
                        <div className="md:col-span-2">
                            <p className="text-sm text-gray-500">Joined</p>
                            <p className="text-gray-800 font-medium">
                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Chưa có"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}