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
  { id: "ORD-001", customer: "John Smith", email: "a@email.com", total: 1250000, status: "Completed", date: "2025-07-01", items: 3 },
  { id: "ORD-002", customer: "Jane Doe", email: "b@email.com", total: 850000, status: "Processing", date: "2025-07-04", items: 2 },
  { id: "ORD-003", customer: "Michael Lee", email: "c@email.com", total: 2100000, status: "Completed", date: "2025-06-27", items: 5 },
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
    .then((data) => {
      console.log("Data from fetchUsers:", data);
      setUsers(data);
    })
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
 const usersInRange = Array.isArray(users)
  ? users.filter((u) => isInRange(u.createdAt || u.registeredDate))
  : [];


  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Admin Report</h1>

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
            <StatCard icon={ShoppingCart} title="Orders" value={ordersInRange.length} subtitle={`Revenue: ${currency(ordersInRange.reduce((s, o) => s + o.total, 0))}`} />
            <StatCard icon={CalendarDays} title="Recent Orders" value={ordersInRange.length} subtitle="Orders in selected range" />
            <StatCard icon={TrendingUp} title="Total Revenue" value={currency(ordersInRange.reduce((s, o) => s + o.total, 0))} subtitle="All statuses included" />
            <StatCard icon={Package} title="Completed" value={ordersInRange.filter(o => o.status === "Completed").length} subtitle="In selected range" />
          </div>
          <OrdersTable orders={ordersInRange} />
        </>
      )}

      {tab === "users" && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
            <StatCard icon={Users} title="New Users" value={usersInRange.length} subtitle="In selected range" />
            <StatCard
              icon={CalendarDays}
              title="Start Date"
              value={
                rangeDays === 1
                  ? dayjs(selectedDate).format("YYYY-MM-DD")
                  : `${dayjs(selectedDate).format("YYYY-MM-DD")} → ${dayjs(selectedDate).add(29, "day").format("YYYY-MM-DD")}`
              }
              subtitle={`${rangeDays === 1 ? "1 day" : "In 30 days"}`}
            />
            <StatCard icon={TrendingUp} title="Total Users" value={users.length} subtitle="All users" />
            <StatCard icon={Eye} title="Verified" value="92%" subtitle="Verification rate (assumed)" />
          </div>
          <UsersTable users={usersInRange} />
        </>
      )}
    </div>
  );
}
