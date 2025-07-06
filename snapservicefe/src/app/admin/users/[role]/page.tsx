"use client";

import { useParams } from "next/navigation";
import UserManagement from "../userManagement";

export default function RoleBasedUserPage() {
  const { role } = useParams(); // role sẽ là 'customer' | 'supplier' | 'shipper'

  if (!role || typeof role !== "string") return <div>Không tìm thấy vai trò</div>;

  return <UserManagement role={role} />;
}
