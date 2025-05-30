import { ReactNode } from "react";
import Link from "next/link"
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth-wrapper">
      <h1>Trang xác thực</h1>
      <div className=" flex justify-center mb-5">
        <Link href="/auth/login">đăng nhập</Link>
        <Link href="/auth/register">đăng ký</Link>
      </div>

      <div className="auth-content">{children}</div>

    </div>
  );
}
