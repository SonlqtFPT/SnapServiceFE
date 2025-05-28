// app/users/page.tsx (hoặc bất kỳ component nào)
"use client";

import { useEffect, useState } from "react";
import { getAllUsers } from "@/services/users/userService";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data); 
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {users ? "work" : "false"}
    </div>
  );
}
