// @ts-nocheck
import { hasSessionServer } from "@/app/app-module/server-session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Peremajaan Data Pegawai | SILKa - INEXIS",
};

export default async function Layout({ children }) {
  // cek session silka dan sigapok
  const isLoginGapok = await hasSessionServer("USER_GAPOK");
  const isLoginSilka = await hasSessionServer("USER_SILKA");
  
  if (isLoginGapok === false) {
    return redirect("/app-integrasi/dashboard");
  }

  if (isLoginSilka === false) {
    return redirect("/auth");
  }
  return <div className="w-full h-screen mx-auto">{children}</div>;
}
