import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="pt-8 lg:pt-12 bg-[url('https://pagedone.io/asset/uploads/1691055810.png')] bg-center bg-cover">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="border border-indigo-600 p-1 w-80 mx-auto rounded-full flex items-center justify-between mb-4">
            <span className="font-inter text-xs font-medium text-gray-900 dark:text-gray-100 ml-3 mr-3">
              Selamat datang SILKa - Inexis
            </span>
            <Link
              href="/auth"
              className="w-8 h-8 rounded-full flex justify-center items-center bg-indigo-600">
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
          <h1 className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl text-gray-900 dark:text-gray-50 mb-5 md:text-5xl leading-[50px]">
            Sistem Informasi Layanan Kepegawaian
            <span className="text-indigo-600"> Terintegrasi </span>
          </h1>
          <p className="max-w-3xl mx-auto text-center text-base font-normal leading-7 text-gray-500 dark:text-gray-2s00 mb-9">
            Telah Terintegrasi Layanan Kenaikan Gaji Berkala (KGB), Kenaikan
            Pangkat (KP) dan Tambahan Penghasilan Pegawai (TPP) dengan Inexis -
            Badan Keuangan Daerah Kabupaten Balangan.
          </p>
          <Link
            href="/auth"
            className="w-full md:w-auto mb-14 inline-flex items-center justify-center py-3 px-7 text-base font-semibold text-center text-white rounded-full bg-indigo-600 shadow-xs hover:bg-indigo-700 transition-all duration-500">
            Uji Coba Aplikasi SILKa - Inexis
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
          <div className="flex justify-center">
            <Image
              src="/assets/app-for-personal.png"
              alt="Dashboard image"
              width={1100}
              height={400}
              className="rounded-t-3xl"
              priority
            />
          </div>
        </div>
      </section>
    </>
  );
}
