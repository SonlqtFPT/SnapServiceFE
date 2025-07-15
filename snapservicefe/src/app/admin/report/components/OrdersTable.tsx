type Order = {
  id: string;
  customer: string;
  email: string;
  total: number;
  status: "Hoàn thành" | "Đang xử lý" | "Đã hủy" | string;
  date: string;
  items: number;
};

export default function OrdersTable({ orders }: { orders: Order[] }) {
  const statusClass = (s: string) => {
    const colors: Record<string, string> = {
      "Hoàn thành": "bg-green-100 text-green-800",
      "Đang xử lý": "bg-yellow-100 text-yellow-800",
      "Đã hủy": "bg-red-100 text-red-800",
    };
    return colors[s] || "bg-gray-100 text-gray-800";
  };

  const currency = (v: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(v);

  return (
    <div className="overflow-x-auto border rounded-lg mt-4">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr className="text-left">
            <th className="p-2">Mã</th>
            <th className="p-2">Khách hàng</th>
            <th className="p-2">Email</th>
            <th className="p-2">Tổng</th>
            <th className="p-2">Trạng thái</th>
            <th className="p-2">Ngày</th>
            <th className="p-2">SP</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t hover:bg-muted/20">
              <td className="p-2 font-medium">{o.id}</td>
              <td className="p-2">{o.customer}</td>
              <td className="p-2">{o.email}</td>
              <td className="p-2">{currency(o.total)}</td>
              <td className="p-2">
                <span className={`px-2 py-0.5 text-xs rounded-full ${statusClass(o.status)}`}>{o.status}</span>
              </td>
              <td className="p-2">{o.date}</td>
              <td className="p-2">{o.items}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
