import { redirect } from "next/navigation";
import { hasSessionServer } from "../server-session";

export const metadata = {
  title: "Module Pegawai | SILKa - INEXIS",
};

export default async function Layout({ children, modal }) {
  // cek session silka dan sigapok
  const isLoginGapok = await hasSessionServer("USER_GAPOK");
  const isLoginSilka = await hasSessionServer("USER_SILKA");
  if (isLoginGapok === false) {
    return redirect("/app-integrasi/dashboard");
  }

  if (isLoginSilka === false) {
    return redirect("/auth");
  }

  return (
    <>
      <div className="mx-auto w-full h-screen">
        {children} {modal}
      </div>
    </>
  );
}
