"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUsers } from "@/services/users/userService";
import { UserListItem } from "@/model/response/userResponse";
import { toggleUserStatus } from "@/services/users/userService";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {  Trash2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Props {
  role: string;
}

export default function UserManagement({ role }: Props) {
  const router = useRouter();
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredUsers = users.filter((user) =>
    ((user.username || "") + (user.email || "") + (user.phone || ""))
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const loadUsers = async () => {
    try {
      const data: UserListItem[] = await fetchUsers();
      if (!Array.isArray(data)) {
        console.error("API trả về không phải mảng:", data);
        setUsers([]);
        return;
      }
      const filtered = data.filter(
        (u) =>
          u &&
          typeof u.role === "string" &&
          u.role.trim().toUpperCase() === role.trim().toUpperCase()
      );
      setUsers(filtered);
    } catch (err) {
      console.error("Lỗi tải danh sách:", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [role]);

  const isShipper = role.trim().toUpperCase() === "SHIPPER";

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">
        Manage {role} ({users.length})
      </h1>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchTerm(searchInput);
            }}
            className="flex flex-col md:flex-row gap-2 w-full md:w-auto"
          >
            <Input
              placeholder="Find by name, email, phone..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full md:w-64"
            />
            <Button type="submit">Search</Button>
          </form>

          {/* Only SHIPPER can add new */}
          {isShipper && (
            <Button onClick={() => router.push(`/admin/users/${role}/add`)}>
              <Plus className="mr-2 h-4 w-4" /> Add new {role}
            </Button>
          )}
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => router.push(`/admin/users/detail/${user.id}`)}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{user.username}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{user.phone}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                          }`}
                      >
                        {user.isActive ? "Hoạt động" : "Không hoạt động"}
                      </span>
                    </td>
                    <td
                      className="px-6 py-4 text-center text-sm font-medium flex justify-center gap-2"
                      onClick={(e) => e.stopPropagation()} // Ngăn click vào icon bị redirect
                    >
                     

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={async () => {
                          try {
                            await toggleUserStatus(user.id);
                            loadUsers();
                          } catch (error) {
                            console.error("Lỗi cập nhật trạng thái:", error);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-gray-400" />
                        <span className="sr-only">Delete</span>
                      </Button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
