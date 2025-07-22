import { UserListItem } from "@/model/response/userResponse";

export default function UsersTable({ users }: { users: UserListItem[] }) {
  return (
    <div className="overflow-x-auto border rounded-lg mt-4">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr className="text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Full Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Created At</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t hover:bg-muted/20">
              <td className="p-2">{u.id}</td>
              <td className="p-2">{u.username}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.phone}</td>
              <td className="p-2">{u.createdAt?.slice(0, 10) || "-"}</td>
              <td className="p-2">
                <span className={`px-2 py-0.5 text-xs rounded-full ${u.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {u.isActive ? "Active" : "Inactive"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
