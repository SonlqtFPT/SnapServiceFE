'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createUser } from '@/services/users/userService';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AddUser() {
  const { role } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    role: typeof role === 'string' ? role : 'customer',
    phone: '',
    address: ''
  });

 const handleSubmit = async () => {
  try {
    console.log("Dữ liệu gửi lên:", form);

    const result = await createUser(form);
    console.log("Tạo user thành công:", result);

    alert("Tạo user thành công!");
    router.push(`/admin/users/${role}`);
  } catch (err) {
    console.error("Lỗi tạo user:", err);
    alert("Đã xảy ra lỗi khi tạo user. Kiểm tra lại thông tin.");
  }
};


  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Thêm {role}</h1>
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Tên đăng nhập"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <Input
          placeholder="Họ và tên"
          value={form.fullname}
          onChange={(e) => setForm({ ...form, fullname: e.target.value })}
        />
        <Input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          placeholder="Mật khẩu"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Input
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <Input
          placeholder="Địa chỉ"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <Button className="mt-4" onClick={handleSubmit}>
          Thêm mới
        </Button>
      </div>
    </div>
  );
}
