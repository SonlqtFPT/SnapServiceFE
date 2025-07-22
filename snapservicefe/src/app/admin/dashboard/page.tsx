'use client';

import React, { useEffect, useState } from "react";
import SummaryCards from "./components/SummaryCards";
import SalesChart from "./components/SalesChart";
import RecentOrdersTable from "./components/RecentOrdersTable";
import RecentUsersTable from "./components/RecentUsersTable";
import useDashboardSummary from "./components/useDashboardSummary";
import { fetchOrdersByMonth } from "@/services/report/reportService";
import { fetchUsersByMonth } from "@/services/users/fetchUsersByMonth";


export default function AdminEcommerceDashboardPage() {
  const summaryData = useDashboardSummary();
  const [activeTab, setActiveTab] = useState<"orders" | "users">("orders");

  const [salesData, setSalesData] = useState<{ label: string; value: number }[]>([]);
  const [userChartData, setUserChartData] = useState<{ label: string; value: number }[]>([]);

  useEffect(() => {
    const year = new Date().getFullYear();
    const months = Array.from({ length: 12 }, (_, i) => i + 1); // [1..12]

    const fetchAllOrders = async () => {
      const results = await Promise.all(
        months.map(async (month) => {
          const res = await fetchOrdersByMonth(year, month);
          return { label: `${month}`, value: res.totalOrders };
        })
      );
      setSalesData(results);
    };

    const fetchAllUsers = async () => {
      const results = await Promise.all(
        months.map(async (month) => {
          const res = await fetchUsersByMonth(year, month);
          return { label: `${month}`, value: res.total };
        })
      );
      setUserChartData(results);
    };

    fetchAllOrders();
    fetchAllUsers();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-3xl font-bold">Overview Dashboard</h1>

      <SummaryCards
        data={summaryData.map((item) => ({
          ...item,
          value: String(item.value),
        }))}
      />

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <SalesChart
            title="Orders in Last 12 Months"
            data={salesData.map((d) => ({
              label: d.label.replace("Tháng", "Month"),
              value: d.value,
            }))}
            xLabel="Month"
            yLabel="Orders"
          />
        </div>

        <div className="w-full md:w-1/2">
          <SalesChart
            title="Users in Last 12 Months"
            data={userChartData.map((d) => ({
              label: d.label.replace("Tháng", "Month"),
              value: d.value,
            }))}
            xLabel="Month"
            yLabel="Users"
          />
        </div>
      </div>


      {/* Tabs */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-2 border-b-2 ${activeTab === "orders"
              ? "border-blue-600 text-blue-600 font-semibold"
              : "border-transparent text-gray-600"
            }`}
        >
          Recent Orders
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`pb-2 border-b-2 ${activeTab === "users"
              ? "border-blue-600 text-blue-600 font-semibold"
              : "border-transparent text-gray-600"
            }`}
        >
          Recent Users
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "orders" ? <RecentOrdersTable /> : <RecentUsersTable />}
    </div>
  );
}
