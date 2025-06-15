import {
  hasSessionServer,
  useSessionServer,
} from "@/app/app-module/server-session";
import { redirect } from "next/navigation";
import Image from "next/image";
import { BtnProfile } from "@/components/button/btn-profile";

export default async function Layout({ children }) {
  const isLogin = await hasSessionServer("USER_SILKA");
  let getProfile = await useSessionServer("USER_SILKA");
  if (isLogin === false) {
    return redirect("/auth");
  }
  const { unker } = getProfile?.data?.pegawai;
  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-t from-white to-blue-100 dark:from-slate-700 dark:to-slate-900">
      <div className="w-full mx-auto my-4 overflow-y-auto bg-gradient-to-b from-gray-100 to-white rounded-2xl card dark:from-slate-800 dark:to-slate-700 lg:w-8/12">
        <div className="py-4 bg-blue-700 border-0 dark:bg-slate-600 card-header">
          <div className="flex flex-row justify-start pb-4 mx-8 md:justify-between md:items-center">
            <div className="inline-flex flex-col items-start justify-start gap-3 pt-3 sm:flex-row">
              <Image
                className="mb-2 rounded img-fluid md:mb-0"
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
