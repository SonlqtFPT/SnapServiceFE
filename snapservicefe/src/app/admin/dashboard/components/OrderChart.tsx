'use client';

import SalesChart from "./SalesChart";
import { useEffect, useState } from "react";
import { fetchOrdersByMonth } from "@/services/report/reportService";

export default function OrderChart() {
  const [data, setData] = useState<{ label: string; value: number }[]>([]);

  useEffect(() => {
    const load = async () => {
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();

      const response = await fetchOrdersByMonth(currentYear, currentMonth);

      const formatted = Array.from({ length: 12 }, (_, i) => ({
        label: `T${i + 1}`,
        value: i + 1 === response.month ? response.totalOrders : 0,
      }));

      setData(formatted);
    };
    load();
  }, []);

  return (
    <SalesChart
      title="New Orders by Month"
      data={data}
      xLabel="Month"
      yLabel="Order"
      barColor="bg-blue-500"
      unit=" đơn"
    />
  );
}
