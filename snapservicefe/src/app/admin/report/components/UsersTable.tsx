import { UserListItem } from "@/model/response/userResponse";

export default function UsersTable({ users }: { users: UserListItem[] }) {
  return (
    <div className="overflow-x-auto border rounded-lg mt-4">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr className="text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Họ tên</th>
            <th className="p-2">Email</th>
            <th className="p-2">Điện thoại</th>
            <th className="p-2">Ngày tạo</th>
            <th className="p-2">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.Id} className="border-t hover:bg-muted/20">
              <td className="p-2">{u.Id}</td>
              <td className="p-2">{u.Username}</td>
              <td className="p-2">{u.Email}</td>
              <td className="p-2">{u.Phone}</td>
              <td className="p-2">{u.CreatedAt?.slice(0, 10) || "-"}</td>
              <td className="p-2">
                <span className={`px-2 py-0.5 text-xs rounded-full ${u.IsActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {u.IsActive ? "Hoạt động" : "Không hoạt động"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
