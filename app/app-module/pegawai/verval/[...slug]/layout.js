import { hasSessionServer } from "@/app/app-module/server-session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Verifikasi & Validasi Peremajaan Data Pegawai | SILKa - INEXIS",
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
  return <div className="mx-auto w-full h-screen">{children}</div>;
}
