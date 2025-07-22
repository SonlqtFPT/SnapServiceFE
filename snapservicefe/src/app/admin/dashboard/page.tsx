'use client';

import React, { useEffect, useState } from "react";
import SummaryCards from "./components/SummaryCards";
import SalesChart from "./components/SalesChart";
import RecentOrdersTable from "./components/RecentOrdersTable";
import useDashboardSummary from "./components/useDashboardSummary";
import { fetchOrdersByMonth } from "@/services/report/reportService";
import { fetchUsersByMonth } from "@/services/users/fetchUsersByMonth";

export default function AdminEcommerceDashboardPage() {
  const summaryData = useDashboardSummary();
  const [salesData, setSalesData] = useState<{ label: string; value: number }[]>([]);
  const [userChartData, setUserChartData] = useState<{ label: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const year = new Date().getFullYear();
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const fetchData = async () => {
      try {
        const [orderResults, userResults] = await Promise.all([
          Promise.all(months.map(async (month) => {
            const res = await fetchOrdersByMonth(year, month);
            return { label: `${month}`, value: res.totalOrders };
          })),
          Promise.all(months.map(async (month) => {
            const res = await fetchUsersByMonth(year, month);
            return { label: `${month}`, value: res.total };
          })),
        ]);

        setSalesData(orderResults);
        setUserChartData(userResults);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

      {loading ? (
        <p className="text-gray-500 text-center">Loading charts...</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <SalesChart
              title="Orders in Last 12 Months"
              data={salesData}
              xLabel="Month"
              yLabel="Orders"
            />
          </div>

          <div className="w-full md:w-1/2">
            <SalesChart
              title="Users in Last 12 Months"
              data={userChartData}
              xLabel="Month"
              yLabel="Users"
            />
          </div>
        </div>
      )}

      <RecentOrdersTable />
    </div>
  );
}
