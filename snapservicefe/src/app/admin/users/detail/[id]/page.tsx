"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserById } from "@/services/users/userService";
import { UserListItem } from "@/model/response/userResponse";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function UserDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState<UserListItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (typeof id === "string") {
          const data = await getUserById(id);
          setUser(data);
        }
      } catch (err) {
        console.error("Không thể tải thông tin user:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  if (loading) return <div className="p-6">Đang tải thông tin người dùng...</div>;
  if (!user) return <div className="p-6 text-red-500">Không tìm thấy người dùng!</div>;

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Chi tiết người dùng</h2>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><strong>ID:</strong> {user.Id}</p>
          <p><strong>Họ tên:</strong> {user.Username}</p>
          <p><strong>Email:</strong> {user.Email}</p>
          <p><strong>SĐT:</strong> {user.Phone}</p>
          <p><strong>Vai trò:</strong> {user.Role}</p>
          <p><strong>Trạng thái:</strong> {user.IsActive ? "Hoạt động" : "Không hoạt động"}</p>
        </CardContent>
      </Card>
    </div>
  );
}
