import { useEffect, useState } from "react";
import { ShoppingCart, Users, Package } from "lucide-react";
import { fetchUsersByMonth } from "@/services/users/fetchUsersByMonth";

// Không cần type User nữa vì không lấy danh sách user
import { fetchOrdersByMonth } from "@/services/report/reportService";

export type SummaryData = {
  id: number;
  title: string;
  value: string | number;
  change: string;
  icon: React.ElementType;
  trend: "up" | "down" | "none";
};

export default function useDashboardSummary() {
  const [summaryData, setSummaryData] = useState<SummaryData[]>([
    { id: 1, title: "Total Customers", value: "...", change: "", icon: Users, trend: "none" },
    { id: 2, title: "New Users This Month", value: "...", change: "", icon: Users, trend: "none" },
    { id: 3, title: "Total Products", value: "...", change: "", icon: Package, trend: "none" },
    { id: 4, title: "Orders This Month", value: "...", change: "", icon: Package, trend: "none" },

  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const now = new Date();
        const year = now.getFullYear();
        // Get total users in current year
        let totalUsersThisYear = 0;
        let newUsersThisMonth = 0;
        for (let m = 1; m <= 12; m++) {
          const res = await fetchUsersByMonth(year, m);
          const total = res?.total;
          const monthTotal = typeof total === 'number' && !isNaN(total) ? total : 0;
          totalUsersThisYear += monthTotal;
          if (m === now.getMonth() + 1) newUsersThisMonth = monthTotal;
        }
        // Get total orders in current year and new orders this month
        let totalOrdersThisYear = 0;
        let newOrdersThisMonth = 0;
        for (let m = 1; m <= 12; m++) {
          const res = await fetchOrdersByMonth(year, m);
          const total = res?.orders?.totalItems;
          const monthTotal = typeof total === 'number' && !isNaN(total) ? total : 0;
          totalOrdersThisYear += monthTotal;
          if (m === now.getMonth() + 1) newOrdersThisMonth = monthTotal;
        }

        setSummaryData([
          {
            id: 1,
            title: "Total Customers",
            value: totalUsersThisYear.toString(),
            change: "",
            icon: Users,
            trend: "none",
          },
          {
            id: 2,
            title: "New Users This Month",
            value: newUsersThisMonth.toString(),
            change: "",
            icon: Users,
            trend: "none",
          },
          {
            id: 3,
            title: "Total Orders",
            value: totalOrdersThisYear.toString(),
            change: "",
            icon: ShoppingCart,
            trend: "none",
          },
          {
            id: 4,
            title: "Orders This Month",
            value: newOrdersThisMonth.toString(),
            change: "",
            icon: ShoppingCart,
            trend: "none",
          },
        ]);
      } catch (e) {
        console.error("Failed to fetch dashboard summary data:", e);
      }
    }

    fetchData();
  }, []);

  return summaryData;
}
