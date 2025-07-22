import { useEffect, useState } from "react";
import { fetchOrdersByMonth } from "@/services/report/reportService";
import { fetchUsersByMonth } from '@/services/users/fetchUsersByMonth';

type ChartItem = {
  month: number;
  total: number;
};

export const useDashboardCharts = () => {
  const [userStats, setUserStats] = useState<ChartItem[]>([]);
  const [orderStats, setOrderStats] = useState<ChartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const year = new Date().getFullYear();

        const [userRes, orderRes] = await Promise.all([
          fetchUsersByMonth(year),
          fetchOrdersByMonth(year),
        ]);

        setUserStats(userRes);
        setOrderStats(orderRes);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    userStats,
    orderStats,
    loading,
  };
};
