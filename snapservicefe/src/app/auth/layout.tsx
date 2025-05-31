import { ReactNode } from "react";
import AuthTabs from "./components/AuthTabs";
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth-wrapper">
      <AuthTabs />

      <div className="auth-content">{children}</div>

    </div>
  );
}
