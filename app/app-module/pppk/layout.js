import { redirect } from "next/navigation";
import { hasSessionServer } from "../server-session";

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
  return (
    <>
      <section>
        <div className="mx-auto w-full h-screen">{children}</div>
      </section>
    </>
  );
}
