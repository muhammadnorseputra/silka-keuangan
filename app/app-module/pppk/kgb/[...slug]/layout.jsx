import { hasSessionServer } from "@/app/app-module/server-session";
import { redirect } from "next/navigation";

export const metadata = {
  title:
    "Integrasi TPP PPPK (Tambahan Penghasilan Pegawai PPPK) | SILKa - INEXIS",
};

export default function Layout({ children }) {
  // cek session silka dan sigapok
  const isLoginGapok = hasSessionServer("USER_GAPOK");
  const isLoginSilka = hasSessionServer("USER_SILKA");
  if (isLoginGapok === false) {
    return redirect("/app-integrasi/dashboard");
  }

  if (isLoginSilka === false) {
    return redirect("/auth");
  }
  return <div className="w-full h-screen mx-auto">{children}</div>;
}
