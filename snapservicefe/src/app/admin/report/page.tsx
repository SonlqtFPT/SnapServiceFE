"use client";

import { useState, useEffect, useMemo } from "react";
import { fetchUsers } from "@/services/users/userService";
import { UserListItem } from "@/model/response/userResponse";
import {
  CalendarDays,
  Eye,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import dayjs from "dayjs";
import StatCard from "./components/StatCard";
import DateFilterBar from "./components/DateFilterBar";
import OrdersTable from "./components/OrdersTable";
import UsersTable from "./components/UsersTable";

const mockOrders = [
  { id: "ORD-001", customer: "Nguyễn Văn A", email: "a@email.com", total: 1250000, status: "Hoàn thành", date: "2025-07-01", items: 3 },
  { id: "ORD-002", customer: "Trần Thị B", email: "b@email.com", total: 850000, status: "Đang xử lý", date: "2025-07-04", items: 2 },
  { id: "ORD-003", customer: "Lê Văn C", email: "c@email.com", total: 2100000, status: "Hoàn thành", date: "2025-06-27", items: 5 },
];

const currency = (v: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(v);

export default function AdminReportPage() {
  const [tab, setTab] = useState<"orders" | "users">("orders");
  const [selectedDate, setSelectedDate] = useState("2025-07-05");
  const [rangeDays, setRangeDays] = useState<1 | 30>(30);
  const [users, setUsers] = useState<UserListItem[]>([]);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch((err) => console.error("Lỗi tải users:", err));
  }, []);

  const startDate = useMemo(() => new Date(selectedDate), [selectedDate]);
  const endDate = useMemo(() => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + rangeDays - 1);
    return d;
  }, [selectedDate, rangeDays]);

  const isInRange = (dateStr: string | undefined) => {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    return d >= startDate && d <= endDate;
  };

  const ordersInRange = mockOrders.filter((o) => isInRange(o.date));
  const usersInRange = users.filter((u) =>
    isInRange(u.CreatedAt || u.RegisteredDate)
  );

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Báo cáo quản trị</h1>

      <DateFilterBar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        rangeDays={rangeDays}
        setRangeDays={setRangeDays}
        tab={tab}
        setTab={setTab}
      />

      {tab === "orders" && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
            <StatCard icon={ShoppingCart} title="Đơn hàng" value={ordersInRange.length} subtitle={`Doanh thu: ${currency(ordersInRange.reduce((s, o) => s + o.total, 0))}`} />
            <StatCard icon={CalendarDays} title="Đơn mới gần đây" value={ordersInRange.length} subtitle="Đơn trong khoảng chọn" />
            <StatCard icon={TrendingUp} title="Tổng doanh thu" value={currency(ordersInRange.reduce((s, o) => s + o.total, 0))} subtitle="Gồm tất cả trạng thái" />
            <StatCard icon={Package} title="Đã hoàn thành" value={ordersInRange.filter(o => o.status === "Hoàn thành").length} subtitle="Trong khoảng đã chọn" />
          </div>
          <OrdersTable orders={ordersInRange} />
        </>
      )}

      {tab === "users" && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
            <StatCard icon={Users} title="Người dùng mới" value={usersInRange.length} subtitle="Trong khoảng thời gian" />
<StatCard
  icon={CalendarDays}
  title="Ngày bắt đầu"
  value={
    rangeDays === 1
      ? dayjs(selectedDate).format("YYYY-MM-DD")
      : `${dayjs(selectedDate).format("YYYY-MM-DD")} → ${dayjs(selectedDate).add(29, "day").format("YYYY-MM-DD")}`
  }
  subtitle={`${rangeDays === 1 ? "1 ngày" : "Trong 30 ngày"}`}
/>
            <StatCard icon={TrendingUp} title="Tổng người dùng" value={users.length} subtitle="Tính tất cả" />
            <StatCard icon={Eye} title="Xác thực" value="92%" subtitle="Tỷ lệ xác thực (giả định)" />
          </div>
          <UsersTable users={usersInRange} />
        </>
      )}
    </div>
  );
}
