import { FormAuth } from "@/components/forms/form-auth";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";
import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/24/solid";
export default function Login() {
  return (
    <>
      <div className="p-5 max-w-2xl hidden lg:block">
        <Image
          isBlurred
          loading="lazy"
          width={200}
          src="/silka.png"
          alt="Logo SILKa Online"
        />
        <h2 className="mb-8 mt-8 text-2xl md:text-5xl uppercase font-bold text-white/90">
          Sistem Informasi Layanan Kepegawaian Terintegrasi Keuangan Daerah
        </h2>
        <p className="text-lg md:text-2xl mb-5 text-white/50">
          Layanan Integrasi Kenaikan Gaji Berkala dan Tambahan Penghasilan
          Pegawai ke Sistem Keuangan Daerah Kab. Balangan
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
        shadow="lg"
        className="px-4 px-md-8 py-6 max-w-lg">
        <CardHeader>
          <div className="flex flex-col">
            <h3 className="text-3xl fw-bold mb-4 flex items-center justify-start gap-x-3">
              Masuk Aplikasi <LockClosedIcon className="size-6 text-gray-400" />
            </h3>
            <p className="text-small text-default-500">
              Silahkan masukan username dan password kepegawaian yang terdaftar
              pada silka online
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <FormAuth />
        </CardBody>
        <CardFooter className="flex items-end justify-between">
          <span className="text-gray-300 text-sm">
            &copy; Develop by BKPSDM
          </span>
          <Link
            href="/auth/lupa-password"
            className="text-blue-500 hover:text-blue-800">
            Lupa Password ?
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
