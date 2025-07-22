'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { UserListItem } from '@/model/response/userResponse';
import { getAPI } from '@/lib/axios';
import Link from 'next/link';
import dayjs from 'dayjs';

export default function RecentUsersTable() {
  const [users, setUsers] = useState<UserListItem[]>([]);

  useEffect(() => {
    const fetchUsersThisMonth = async () => {
      const now = dayjs();
      const year = now.year();
      const month = now.month() + 1; // dayjs month is 0-based

      try {
        const api = getAPI();
        const response = await api.get('/api/User/usersbymonth', {
          params: { year, month },
        });
        setUsers(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch users this month:', error);
      }
    };

    fetchUsersThisMonth();
  }, []);
  console.log("🚨 RecentUsersTable users:", users);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Users Registered This Month</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Avatar</th>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Registered Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <Image
                    src={user.imageUrl || '/placeholder.jpg'}
                    alt={user.fullName}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-2">
                  <Link href={`/admin/users/detail/${user.id}`} className="text-blue-600 hover:underline">
                    {user.fullName}
                  </Link>
                </td>
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 capitalize">{user.role}</td>
                <td className="px-4 py-2">{user.registeredDate?.split('T')[0] || '-'}</td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No users registered this month.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
