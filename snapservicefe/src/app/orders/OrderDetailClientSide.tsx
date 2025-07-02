import Image from "next/image";
import React from "react";

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

export default function OrderDetailClientSide({ details }: { details: OrderDetail[] }) {
  return (
    <div className="mt-4 divide-y">
      {details.map((item) => (
        <div key={item.id} className="py-4 flex items-center space-x-4">
          <Image
            width={64}
            height={64}
            src={item.productImage || "/default-product.jpg"}
            alt={item.productName || "Unnamed Product"}
            className="w-16 h-16 object-cover rounded"
          />
          <div>
            <h4 className="text-md font-medium">{item.productName || "Unnamed Product"}</h4>
            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            <p className="text-sm text-gray-500">Price: {item.price.toLocaleString()}đ</p>
            <p className="text-sm text-gray-500">Status: {item.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}