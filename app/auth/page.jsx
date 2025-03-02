"use server";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";
import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import SSOButton from "@/components/button/btn-sso";
import { v7 as uuidv7 } from "uuid";

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

  return (
    <>
      <div className="hidden max-w-2xl md:p-5 lg:block">
        <div className="flex items-center justify-start gap-x-3">
          <Image
            isBlurred
            loading="lazy"
            width={200}
            src="/silka.png"
            alt="Logo - SILKa Online"
          />
          <Image
            isBlurred
            src="/logo-inexis.png"
            width={200}
            alt="Logo - Inexis"
          />
        </div>
        <h2 className="mt-8 mb-8 text-2xl font-bold uppercase md:text-5xl text-blue-600/70 dark:text-white text-balance">
          Sistem Informasi Layanan Kepegawaian Terintegrasi Badan Keuangan
          Daerah.
        </h2>
        <p className="mb-5 text-lg md:text-2xl text-gray-500/80 dark:text-white/50">
          Layanan Integrasi Kenaikan Gaji Berkala, Kenaikan Pangkat dan Tambahan
          Penghasilan Pegawai ke Sistem INEXIS Badan Keuangan Daerah Kab.
          Balangan
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          fill="white"
          className="bi bi-grip-horizontal"
          viewBox="0 0 16 16">
          <path d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
      </div>
      <Card
        isFooterBlurred
        fullWidth={false}
        shadow="sm"
        className="px-4 py-3 md:px-8 md:py-6 md:max-w-lg bg-white/30 dark:bg-slate-300/30">
        <CardHeader>
          <div className="flex flex-col">
            <h3 className="flex items-center justify-start mb-4 text-3xl fw-bold gap-x-3">
              Masuk Aplikasi <LockClosedIcon className="text-gray-300 size-6" />
            </h3>
            <p className="text-small text-default-400 dark:text-white/70">
              Layanan SILKa Integrasi, silahkan masuk menggunakan akun silka-sso
              anda yang terdaftar dan aktif.
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <SSOButton query={queryString} uuid={state} />
        </CardBody>
        <CardFooter className="flex flex-col items-center justify-between md:flex-row md:items-end dark:bg-transparent">
          <span className="text-sm text-gray-300 text-ellipsis">
            &copy; Dikembangakan oleh Bidang PPIK BKPSDM Kab. Balangan
          </span>
        </CardFooter>
      </Card>
    </>
  );
}
