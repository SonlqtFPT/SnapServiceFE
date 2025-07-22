import React from "react";
import OrderClientSide from "./OrderClientSide";

export default function OrderHistoryPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Order History</h1>
      <OrderClientSide />
    </main>
  );
}