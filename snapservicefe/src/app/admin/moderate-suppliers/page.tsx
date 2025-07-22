"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Supplier = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: "inactive" | "active";
};

const fakeSuppliers: Supplier[] = [
  {
    id: "S001",
    name: "Cửa hàng A",
    email: "a@example.com",
    phone: "0123456789",
    address: "123 Lê Lợi, Q.1, TP.HCM",
    status: "inactive",
  },
  {
    id: "S002",
    name: "Cửa hàng B",
    email: "b@example.com",
    phone: "0987654321",
    address: "456 Trần Hưng Đạo, Q.5, TP.HCM",
    status: "inactive",
  },
];

export default function ModerateSupplier() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(fakeSuppliers);

  const handleApprove = (id: string) => {
    setSuppliers(prev =>
      prev.map(sup => (sup.id === id ? { ...sup, status: "active" } : sup))
    );
  };

  const handleReject = (id: string) => {
    setSuppliers(prev => prev.filter(sup => sup.id !== id));
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Danh sách nhà cung cấp chờ duyệt</h2>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>SĐT</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.filter(s => s.status === "inactive").length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    Không có nhà cung cấp nào cần kiểm duyệt
                  </TableCell>
                </TableRow>
              ) : (
                suppliers
                  .filter(s => s.status === "inactive")
                  .map(supplier => (
                    <TableRow key={supplier.id}>
                      <TableCell>{supplier.id}</TableCell>
                      <TableCell>{supplier.name}</TableCell>
                      <TableCell>{supplier.email}</TableCell>
                      <TableCell>{supplier.phone}</TableCell>
                      <TableCell>{supplier.address}</TableCell>
                      <TableCell className="space-x-2">
                        <Button size="sm" onClick={() => handleApprove(supplier.id)}>
                          Duyệt
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleReject(supplier.id)}>
                          Từ chối
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
