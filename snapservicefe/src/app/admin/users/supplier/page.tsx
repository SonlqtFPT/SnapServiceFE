// app/admin/users/page.tsx
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, X } from "lucide-react"; // Icons for actions

// Define a simple User type
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'supplier' | 'customer';
  isActive: boolean;
}

// Mock data for initial users
const initialUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin', isActive: true },
  { id: '2', name: 'Supplier A', email: 'supplierA@example.com', role: 'supplier', isActive: true },
  { id: '3', name: 'Customer One', email: 'customer1@example.com', role: 'customer', isActive: true },
  { id: '4', name: 'Supplier B', email: 'supplierB@example.com', role: 'supplier', isActive: false },
  { id: '5', name: 'Customer Two', email: 'customer2@example.com', role: 'customer', isActive: true },
];

export default function SupplierPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Omit<User, 'id'>>({
    name: '',
    email: '',
    role: 'customer', // Default role
    isActive: true,
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle switch change for isActive
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isActive: checked }));
  };

  // Open modal for adding a new user
  const handleAddUserClick = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'customer', isActive: true });
    setIsModalOpen(true);
  };

  // Open modal for editing an existing user
  const handleEditUserClick = (user: User) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role, isActive: user.isActive });
    setIsModalOpen(true);
  };

  // Handle form submission (Add/Edit)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      // Edit existing user
      setUsers(users.map(user =>
        user.id === editingUser.id ? { ...user, ...formData } : user
      ));
    } else {
      // Add new user
      const newUser: User = { id: String(Date.now()), ...formData }; // Simple unique ID
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
  };

  // Handle deleting a user
  const handleDeleteUser = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Quản lý Supplier</h1>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Danh sách Người dùng</CardTitle>
          <Button onClick={handleAddUserClick}>
            <Plus className="mr-2 h-4 w-4" /> Thêm Người dùng
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vai trò</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {user.isActive ? 'Hoạt động' : 'Không hoạt động'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <Button variant="ghost" size="icon" onClick={() => handleEditUserClick(user)} className="mr-2">
                        <Edit className="h-4 w-4 text-blue-500" />
                        <span className="sr-only">Chỉnh sửa</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Xóa</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{editingUser ? 'Chỉnh sửa Người dùng' : 'Thêm Người dùng mới'}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Đóng</span>
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Tên</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="role">Vai trò</Label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="customer">Customer</option>
                    <option value="supplier">Supplier</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="isActive">Hoạt động</Label>
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={handleSwitchChange}
                  />
                </div>
                <Separator />
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                    Hủy
                  </Button>
                  <Button type="submit">
                    {editingUser ? 'Lưu thay đổi' : 'Thêm'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
