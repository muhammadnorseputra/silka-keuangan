"use server";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Chip,
} from "@nextui-org/react";
import NextImage from "next/image";
import {
  CalculatorIcon,
  LockClosedIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import SSOButton from "@/components/button/btn-sso";
import { v7 as uuidv7 } from "uuid";
import {
  getSessionDatabase,
  getSessionServer,
} from "../app-module/server-session";
import { redirect } from "next/navigation";
import {
  FingerPrintIcon,
  SparklesIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";

export default async function Login() {
  const state = uuidv7();
  const params = {
    client_name: process.env.CLIENT_NAME,
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.CLIENT_REDIRECT,
    response_type: "code",
    state,
  };

  const queryString = new URLSearchParams(params).toString();

  // session
  const session = await getSessionServer("USER_SILKA");
  const sessionFromDB = await getSessionDatabase(session?.access_token);

  if (sessionFromDB.status) {
    return redirect("/app-integrasi/dashboard");
  }

  return (
    <>
      <div className="hidden max-w-2xl md:p-5 lg:block">
        <div className="flex items-center justify-start gap-x-3">
          <Image
            isBlurred
            width={200}
            height={60}
            as={NextImage}
            src="/silka.png"
            alt="Logo - SILKa Online"
          />
          <Image
            isBlurred
            src="/logo-inexis.png"
            as={NextImage}
            width={200}
            height={100}
            quality={100}
            alt="Logo - Inexis"
          />
        </div>
        <div className="inline-flex p-[1px] bg-gradient-to-r from-indigo-300/90 to-indigo-400/20 rounded-xl mt-4">
          <div className="inline-flex items-center gap-2 py-2 pl-4 pr-6 rounded-xl bg-blue-800/30 backdrop-blur-lg">
            <ShieldCheckIcon className="w-6 h-6 text-indigo-900" />
            <span className="tracking-wider text-white uppercase">
              BKPSDM KABUPATEN BALANGAN
            </span>
          </div>
        </div>
        <h1 className="mt-8 mb-8 text-6xl font-bold text-white">
          Sistem Informasi Layanan Kepegawaian{" "}
          <span className="text-transparent bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text">
            Terintegrasi
          </span>
        </h1>
        <p className="max-w-xl mt-4 text-lg tracking-wider text-white">
          Platform terpadu untuk pengelolaan kenaikan gaji berkala, kenaikan
          pangkat, dan tambahan penghasilan pegawai secara digital.
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          fill="white"
          className="bi bi-grip-horizontal"
          viewBox="0 0 16 16"
        >
          <path d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        <div className="flex items-start w-full gap-x-6">
          <Card className="p-2 bg-transparent border border-indigo-800 ">
            <CardBody>
              <div className="inline-flex items-start gap-x-3">
                <CalculatorIcon className="w-12 h-12 p-0 m-0 text-blue-600" />
                <div className="inline-flex flex-col text-white">
                  <span className="font-bold">KGB</span>{" "}
                  <span className="text-sm">Kenaikan Gaji Berkala</span>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="p-2 bg-transparent border border-indigo-800 ">
            <CardBody>
              <div className="inline-flex items-start gap-3">
                <SparklesIcon className="w-12 h-12 text-amber-600" />
                <div className="inline-flex flex-col text-white">
                  <span className="font-bold">Pangkat</span>{" "}
                  <span className="text-sm">Kenaikan Pangkat</span>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="p-2 bg-transparent border border-indigo-800 ">
            <CardBody>
              <div className="inline-flex items-start gap-3">
                <WalletIcon className="w-12 h-12 text-green-600" />
                <div className="inline-flex flex-col text-white">
                  <span className="font-bold">TPP</span>{" "}
                  <span className="text-sm">Tambahan Penghasilan Pegawai</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      <Card className="p-1 shadow-xl md:max-w-md bg-gradient-to-br to-blue-900/90 via-green-400 dark:via-green-800 from-blue-900/90">
        <div className="px-6 py-3 bg-gradient-to-t from-cyan-900/90 to-cyan-800/90 dark:from-black/60 backdrop-blur-lg md:px-12 md:py-6 rounded-xl">
          <CardHeader>
            <div className="flex flex-col items-center">
              <div className="p-3 mb-12 bg-transparent border rounded-full shadow-2xl border-blue-300/20">
                <div className="p-3 bg-transparent border rounded-full shadow-2xl border-blue-300/40">
                  <div className="relative w-24 h-24 border rounded-full shadow-md border-blue-300/70 shadow-green-200">
                    <Image isBlurred loading="lazy" as={NextImage} src='/logo-balangan.svg' width={80} height={80} alt="Logo Balangan" className="absolute top-3 left-2"/>
                  </div>
                </div>
              </div>
              <h3 className="flex items-center justify-center mb-4 text-3xl text-white fw-bold gap-x-3">
                Masuk Aplikasi
              </h3>
              <p className="mb-3 text-center text-small text-default-300 dark:text-white/20">
                Layanan SILKa Integrasi, silahkan masuk menggunakan akun
                silka-sso anda yang terdaftar dan aktif.
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <SSOButton query={queryString} uuid={state} />
            <div className="flex items-center justify-center mt-12 mb-8">
              <div className="w-full border-t border-amber-300"></div>
              <span className="absolute p-3 text-xs font-semibold tracking-wider text-black rounded-full bg-amber-300">
                <ShieldCheckIcon className="text-black size-4" />
              </span>
            </div>
            <div className="p-2 text-xs border border-green-700 text-white/70 rounded-xl">
              <div className="inline-flex items-start justify-start gap-x-3">
                <ShieldCheckIcon className="text-white size-16" />
                <span>
                  Untuk menjaga keamanan akun anda, disarankan untuk melakukan
                  pergantian passsword secara berkala, dengan kombinasi yang
                  tidak mudah ditebak.
                </span>
              </div>
            </div>
          </CardBody>
          <CardFooter className="flex flex-col items-center justify-between text-center md:flex-row dark:bg-transparent">
            <span className="text-xs text-blue-200 text-ellipsis">
              &copy; Dikembangakan oleh Bidang PPIK.
            </span>
          </CardFooter>
        </div>
      </Card>
    </>
  );
}
