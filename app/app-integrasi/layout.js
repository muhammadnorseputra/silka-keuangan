import {
  hasSessionServer,
  useSessionServer,
} from "@/app/app-module/server-session";
import { redirect } from "next/navigation";
import Image from "next/image";
import { BtnProfile } from "@/components/button/btn-profile";

export default function Layout({ children }) {
  const isLogin = hasSessionServer("USER_SILKA");
  let getProfile = useSessionServer("USER_SILKA");
  if (isLogin === false) {
    return redirect("/auth");
  }
  const { unker } = getProfile?.data?.pegawai;
  return (
    <div className="flex justify-center bg-white dark:bg-slate-900">
      <div className="card bg-gray-100  dark:bg-slate-800 w-full lg:w-8/12 mx-auto min-h-screen overflow-y-auto">
        <div className="card-header bg-blue-700 border-0 py-4">
          <div className="flex flex-row justify-start md:justify-between md:items-center mx-8 pb-4">
            <div className="inline-flex flex-col sm:flex-row justify-start items-start gap-3 pt-3">
              <Image
                className="img-fluid rounded mb-2 md:mb-0"
                loading="lazy"
                src="/logo-balangan.svg"
                width="50"
                height="50"
                quality={90}
                alt="Logo"
              />
              <div className="text-base text-white">
                <p className="font-bold">
                  Sistem Informasi Layanan Kepegawaian Terintegrasi
                </p>
                <p className="font-bold fs-6">Pemerintah Kab. Balangan</p>
                <p>{unker}</p>
              </div>
            </div>
            <div className="inline-flex justify-start mt-4 md:mt-0">
              <BtnProfile size="md" profile={getProfile} />
            </div>
          </div>
        </div>
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
}
