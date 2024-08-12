import { redirect } from "next/navigation";
import { hasSessionServer } from "../app-module/server-session";

export default function Layout({ children }) {
  const isLogin = hasSessionServer("USER_SILKA");
  if (isLogin === false) {
    return redirect("/auth");
  }
  return (
    <div className="mx-auto flex justify-center align-center w-full min-h-screen bg-gray-50 dark:bg-gray-800">
      {children}
    </div>
  );
}
