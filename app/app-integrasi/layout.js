import {
  hasSessionServer,
  getSessionServer,
} from "@/app/app-module/server-session";
import { redirect } from "next/navigation";
import Image from "next/image";
import { BtnProfile } from "@/components/button/btn-profile";
import { BuildingOfficeIcon } from "@heroicons/react/24/solid";

// @ts-ignore
export default async function Layout({ children }) {
  const isLogin = await hasSessionServer("USER_SILKA");
  let getProfile = await getSessionServer("USER_SILKA");
  if (isLogin === false) {
    return redirect("/auth");
  }
  const { unker } = getProfile?.data?.pegawai;
  return (
    <div className="flex justify-center bg-blue-50 dark:bg-slate-700">
      <div className="w-full mx-auto my-4 card sm:w-10/12 2xl:w-8/12">
        <div className="py-2 bg-white border-0 shadow-lg rounded-2xl dark:bg-slate-600 card-header dark:shadow-slate-700">
          <div className="flex flex-row justify-start pb-4 mx-6 md:justify-between md:items-center">
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
              <div className="text-base text-gray-700 dark:text-gray-300">
                <p className="font-bold">
                  Sistem Informasi Layanan Kepegawaian Terintegrasi
                </p>
                <p className="font-bold fs-6">Pemerintah Kab. Balangan</p>
                <p className="flex items-center">
                  <BuildingOfficeIcon className="inline w-5 h-5 mr-2 text-blue-400" />
                  {unker}
                </p>
              </div>
            </div>
            <div className="inline-flex justify-start mt-4 md:mt-0">
              <BtnProfile size="md" profile={getProfile} />
            </div>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
