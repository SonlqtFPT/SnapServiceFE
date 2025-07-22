'use client';

import SalesChart from './SalesChart';
import { useEffect, useState } from 'react';
import { fetchUsersByMonth } from '@/services/users/fetchUsersByMonth';

export default function UserChart() {
  const [data, setData] = useState<{ label: string; value: number }[]>([]);

  useEffect(() => {
    const load = async () => {
      const now = new Date();
      const year = now.getFullYear();

      const results = await Promise.all(
        Array.from({ length: 12 }, async (_, i) => {
          const month = i + 1;
          try {
            const res = await fetchUsersByMonth(year, month);
            return {
              label: `T${month}`,
              value: res.total || 0, // nếu không có thì trả về 0
            };
          } catch {
            // Nếu API trả lỗi (ví dụ: tháng chưa có dữ liệu), vẫn trả về 0
            return {
              label: `T${month}`,
              value: 0,
            };
          }
        })
      );

      // Nếu bạn muốn ẩn các tháng có value === 0
      const filtered = results.filter((item) => item.value > 0);

      setData(filtered);
    };

    load();
  }, []);

  return (
    <SalesChart
      title="Tài khoản mới theo tháng"
      data={data}
      xLabel="Tháng"
      yLabel="Người dùng"
      barColor="bg-green-500"
      unit=" người"
    />
  );
}
