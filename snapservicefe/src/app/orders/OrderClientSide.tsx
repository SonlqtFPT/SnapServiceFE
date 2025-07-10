'use client';
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import OrderDetailClientSide from "./OrderDetailClientSide";
import { fetchOrder } from "@/services/order/OrderService";
import {
  FileText,
  CalendarDays,
  MapPin,
  Truck,
  Store,
  ArrowLeft,
  ArrowRight,
  User,
} from "lucide-react";

interface OrderDetail {
  id: number;
  productId: number;
  productName: string | null;
  productImage: string | null;
  quantity: number;
  price: number;
  discountPercent: number;
  note: string;
  status: string;
}

interface Order {
  id: string;
  total: number;
  userId: number;
  userFullName: string | null;
  createdAt: string;
  address: string;
  shippingPrice: number;
  supplierId: number;
  supplierName: string | null;
  paidAt: string | null;
  deliveriedAt: string | null;
  orders_details: OrderDetail[];
}

export default function OrderClientSide() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getOrders = async () => {
    try {
      const response = await fetchOrder(page);
      setOrders(response.items || []);
      setTotalPages(response.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  useEffect(() => {
    getOrders();
  }, [page]);

  return (
    <div className="space-y-8">
      {orders.map((order) => (
        <motion.div
          key={order.id}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-[#9810FA]/20 shadow-md hover:shadow-xl transition-all rounded-xl p-6"
        >
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#9810FA] flex items-center gap-2">
              <FileText className="w-5 h-5" /> Order #{order.userId}-{order.supplierId}-{order.createdAt}
            </h2>
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="text-sm text-gray-700 space-y-2">
            <p className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-500">Customer:</span>
              {order.userFullName ?? "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-500">Address:</span>
              {order.address}
            </p>
            <p className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-500">Shipping:</span>
              {order.shippingPrice.toLocaleString()}đ
            </p>
            <p className="flex items-center gap-2">
              <Store className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-500">Supplier:</span>
              {order.supplierName ?? "N/A"}
            </p>
          </div>

          <div className="mt-4 border-t border-gray-200 pt-4">
            <OrderDetailClientSide details={order.orders_details} />
          </div>
        </motion.div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 flex items-center gap-2"
          disabled={page === 1}
        >
          <ArrowLeft className="w-4 h-4" /> Prev
        </button>
        <span className="text-[#9810FA] font-semibold">Page {page}</span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          className="px-4 py-2 bg-[#9810FA] text-white rounded hover:bg-[#7b0dc7] flex items-center gap-2 disabled:opacity-50"
          disabled={page === totalPages}
        >
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}