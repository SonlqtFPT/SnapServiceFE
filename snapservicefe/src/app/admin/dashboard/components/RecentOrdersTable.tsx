import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchOrdersByMonth } from "@/services/report/reportService";
import { OrderReportItem } from "@/model/response/reportResponse";
import dayjs from "dayjs";
import OrderStatusBadge from './OrderStatusBadge';

export default function RecentOrdersTable() {
    const [orders, setOrders] = useState<OrderReportItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            setLoading(true);
            try {
                const now = new Date();
                const year = now.getFullYear();
                const month = now.getMonth() + 1;
                const res = await fetchOrdersByMonth(year, month);
                setOrders(res?.orders?.items || []);
            } catch {
                setOrders([]);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, []);
    console.log("🚨 RecentOrdersTable orders:", orders);
    return (
        <Card className="col-span-full">
            <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>

                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">Loading...</td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">No orders this month.</td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.userFullName || "Unknown"}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {typeof order.total === 'number'
                                                ? order.total.toLocaleString()
                                                : order.total || "-"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <OrderStatusBadge statuses={order.orders_details.map((d) => d.status)} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.supplierName || "Unknown"}</td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {order.createdAt ? dayjs(order.createdAt).format("DD/MM/YYYY HH:mm") : "-"}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
