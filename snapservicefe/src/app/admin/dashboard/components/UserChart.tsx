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

      const results: { label: string; value: number }[] = [];

for (let i = 0; i < 12; i++) {
  const month = i + 1;
  try {
    const res = await fetchUsersByMonth(year, month);
    results.push({ label: `T${month}`, value: res.total || 0 });
  } catch {
    results.push({ label: `T${month}`, value: 0 });
  }
}
setData(results);

    };

    load();
  }, []);

  return (
    <SalesChart
      title="New Users by Month"
      data={data}
      xLabel="Month"
      yLabel="User"
      barColor="bg-green-500"
      unit=" người"
    />
  );
}
