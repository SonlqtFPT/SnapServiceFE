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

      // Tạo mảng 12 tháng với giá trị mặc định 0, chỉ tháng hiện tại có totalOrders
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
      title="Đơn hàng theo tháng"
      data={data}
      xLabel="Tháng"
      yLabel="Đơn hàng"
      barColor="bg-blue-500"
      unit=" đơn"
    />
  );
}
