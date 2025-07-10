// app/admin/ecommerce/page.tsx
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DollarSign, ShoppingCart, Users, Package } from "lucide-react"; // Icons for dashboard
import { ArrowUpRight } from 'lucide-react'; // For trend indicators

// Mock data for demonstration
const summaryData = [
  {
    id: 1,
    title: "Tổng doanh thu",
    value: "45,231,890đ",
    change: "+20.1% từ tháng trước",
    icon: DollarSign,
    trend: "up",
  },
  {
    id: 2,
    title: "Tổng đơn hàng",
    value: "2,350",
    change: "+18.5% từ tháng trước",
    icon: ShoppingCart,
    trend: "up",
  },
  {
    id: 3,
    title: "Khách hàng mới",
    value: "1,200",
    change: "+5.2% từ tháng trước",
    icon: Users,
    trend: "up",
  },
  {
    id: 4,
    title: "Sản phẩm bán chạy",
    value: "Tai nghe không dây",
    change: "350 lượt bán",
    icon: Package,
    trend: "none", // No specific trend for this type
  },
];

const salesData = [
  { month: "Tháng 1", sales: 15000000 },
  { month: "Tháng 2", sales: 18000000 },
  { month: "Tháng 3", sales: 22000000 },
  { month: "Tháng 4", sales: 19000000 },
  { month: "Tháng 5", sales: 25000000 },
  { month: "Tháng 6", sales: 30000000 },
];

const recentOrders = [
  { id: "ORD001", customer: "Nguyễn Văn A", amount: "1,250,000đ", status: "Đã giao", date: "2025-06-26" },
  { id: "ORD002", customer: "Trần Thị B", amount: "800,000đ", status: "Đang xử lý", date: "2025-06-25" },
  { id: "ORD003", customer: "Lê Quang C", amount: "3,500,000đ", status: "Đã giao", date: "2025-06-24" },
  { id: "ORD004", customer: "Phạm Thị D", amount: "450,000đ", status: "Đang vận chuyển", date: "2025-06-24" },
];

// Simple Bar Chart Component (using divs for visual representation)
const SimpleBarChart = ({ data, title, xLabel, yLabel }: { data: { label: string; value: number }[]; title: string; xLabel: string; yLabel: string }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  const scaleFactor = 100 / maxValue;

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-end justify-around gap-2 p-4 border-b border-l border-gray-200">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-end h-full">
              <div
                className="w-8 bg-blue-500 rounded-t-md transition-all duration-300 ease-out"
                style={{ height: `${item.value * scaleFactor}%` }}
                title={`${item.label}: ${item.value.toLocaleString()}đ`}
              ></div>
              <span className="text-xs text-gray-600 mt-1">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{yLabel}</span>
          <span>{xLabel}</span>
        </div>
      </CardContent>
    </Card>
  );
};


export default function AdminEcommerceDashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-3xl font-bold">Dashboard Tổng quan</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryData.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {item.trend === "up" && <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />}
                {item.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sales Overview Chart */}
      <SimpleBarChart
        title="Doanh thu 6 tháng gần nhất"
        data={salesData.map(d => ({ label: d.month, value: d.sales }))}
        xLabel="Tháng"
        yLabel="Doanh thu"
      />

      {/* Recent Orders */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Đơn hàng gần đây</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn hàng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày đặt</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={
                          order.status === "Đã giao"
                            ? "default"
                            : order.status === "Đang xử lý"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
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
