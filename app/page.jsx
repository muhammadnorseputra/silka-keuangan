import Image from "next/image";
import Link from "next/link";
import { getSessionDatabase, getSessionServer } from "./app-module/server-session";
import { redirect } from "next/navigation";

export default async function Page() {
  // session
  const session = await getSessionServer("USER_SILKA");
  const sessionFromDB = await getSessionDatabase(session?.access_token);

  if (sessionFromDB.status) {
    return redirect("/app-integrasi/dashboard");
  }

  return (
    <>
      <section className="pt-8 lg:pt-12 bg-[url('/33960364-b6f6-4064-93ce-6817ee78806d.png')] bg-cover lg:bg-center lg:bg-cover lg:bg-fixed">
        <div className="relative px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between p-1 mx-auto mb-4 border border-indigo-600 rounded-full w-80">
            <span className="ml-3 mr-3 text-xs font-medium text-gray-100 font-inter dark:text-gray-100">
              Selamat datang SILKa - Inexis
            </span>
            <Link
              href="/auth"
              prefetch={true}
              className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full">
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.83398 8.00019L12.9081 8.00019M9.75991 11.778L13.0925 8.44541C13.3023 8.23553 13.4073 8.13059 13.4073 8.00019C13.4073 7.86979 13.3023 7.76485 13.0925 7.55497L9.75991 4.22241"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
          <h1 className="max-w-3xl mx-auto text-center font-manrope font-bold text-4xl text-white mb-5 md:text-6xl leading-[50px]">
            Sistem Informasi Layanan Kepegawaian
            <span className="text-transparent bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text"> Terintegrasi </span>
          </h1>
          <p className="max-w-3xl mx-auto text-base font-normal leading-7 text-center text-gray-200 dark:text-gray-2s00 mb-9">
            Telah Terintegrasi Layanan Kenaikan Gaji Berkala (KGB), Kenaikan
            Pangkat (KP) dan Tambahan Penghasilan Pegawai (TPP) dengan Inexis -
            Badan Keuangan Daerah Kabupaten Balangan.
          </p>
          <Link
            href="/auth"
            prefetch={true}
            className="inline-flex items-center justify-center w-full py-3 text-base font-semibold text-center text-white transition-all duration-500 bg-indigo-600 rounded-full shadow-xs md:w-auto mb-14 px-7 hover:bg-indigo-700 hover:scale-105 hover:shadow-lg">
            Masuk Aplikasi SILKa - INEXIS
            <svg
              className="ml-2"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.5 15L11.0858 11.4142C11.7525 10.7475 12.0858 10.4142 12.0858 10C12.0858 9.58579 11.7525 9.25245 11.0858 8.58579L7.5 5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <div className="relative flex justify-center">
            <Image
              src="/assets/app-for-personal.png"
              alt="Dashboard image"
              width={1200}
              height={400}
              className="transition-all ease-in-out delay-100 rounded-t-3xl duration-350 hover:scale-105 filter grayscale blur-sm contrast-100 hover:blur-none hover:grayscale-0 "
              priority
            />
            <div className="absolute text-3xl text-slate-100 top-[50%] [text-shadow:_0_4px_8px_rgb(0_0_0_/_60%)]">
              Preview Dashboard
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
