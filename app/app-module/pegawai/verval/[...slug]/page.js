import { BtnBackNextUi } from "@/components/button/btn-back";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { hasSessionServer, useSessionServer } from "../../../server-session";
import { redirect } from "next/navigation";
import { CloudArrowUp, ExclamationCircle } from "react-bootstrap-icons";
import { decrypt } from "@/helpers/encrypt";
// import { getTppSigapok } from "@/dummy/sigapok-get-tpp";
import { getPegawaiByNip } from "@/dummy/data-pegawai-by-nip";
import { formatTanggalIndonesia } from "@/helpers/cx";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { ButtonPeremajaan } from "@/components/button/btn-peremajaan";
import { BtnApprove } from "@/components/button/btn-approve";
import { BtnRollBackPNS } from "@/components/button/btn-rollback-pns";

export const revalidate = 0;

export default async function Page({ params }) {
  const session = hasSessionServer("USER_GAPOK");
  const sigapok = useSessionServer("USER_GAPOK");
  const silkaonline = useSessionServer("USER_SILKA");
  if (session === false) {
    return redirect("/app-integrasi/dashboard");
  }
  const NIP = decrypt(params?.slug[0], "bkpsdm");
  const getPegawais = await getPegawaiByNip(NIP);
  // const resultDataPerubaahan = await getTppSigapok(sigapok.access_token);

  const namalengkap = `${getPegawais?.gelar_depan} ${getPegawais?.nama} ${getPegawais?.gelar_belakang}`;
  const renderSilkaService = () => {
    if (getPegawais.status_data !== "VERIFIKASI") {
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          <ExclamationCircle className="size-8" />
          <p className="text-gray-400">Data Belum Diremajakan</p>
          <ButtonPeremajaan nip={NIP} />
        </div>
      );
    }

    return (
      <>
        <div>
          <div className="text-gray-400">NAMA</div>
          <div className="font-bold">{namalengkap}</div>
        </div>
        <div>
          <div className="text-gray-400">NIP</div>
          <div className="font-bold">{getPegawais.nip}</div>
        </div>
        <div>
          <div className="text-gray-400">GELAR DEPAN</div>
          <div className="font-bold">{getPegawais.gelar_depan}</div>
        </div>
        <div>
          <div className="text-gray-400">GELAR BELAKNG</div>
          <div className="font-bold">{getPegawais.gelar_belakang}</div>
        </div>
        <div>
          <div className="text-gray-400">TINGKAT PENDIDIKAN</div>
          <div className="font-bold">{getPegawais.nama_tingkat_pendidikan}</div>
        </div>
        <div>
          <div className="text-gray-400">TEMPAT LAHIR</div>
          <div className="font-bold">{getPegawais.tmp_lahir}</div>
        </div>
        <div>
          <div className="text-gray-400">TANGGAL LAHIR</div>
          <div className="font-bold">
            {formatTanggalIndonesia(getPegawais.tgl_lahir)}
          </div>
        </div>
        <div>
          <div className="text-gray-400">ALAMAT SESUAI KTP</div>
          <div className="font-bold">{getPegawais.alamat_ktp}</div>
        </div>
        <div>
          <div className="text-gray-400">JENIS KELAMIN</div>
          <div className="font-bold">{getPegawais.jenis_kelamin}</div>
        </div>
        <div>
          <div className="text-gray-400">AGAMA</div>
          <div className="font-bold">{getPegawais.nama_agama}</div>
        </div>
        <Divider />
        <div>
          <div className="text-gray-400">UNIT KERJA</div>
          <div className="font-bold">{getPegawais.nama_unit_kerja}</div>
        </div>
        <div className="flex flex-col sm:flex-row justify-start gap-x-16">
          <div>
            <div className="text-gray-400">JENIS PEGAWAI</div>
            <div className="font-bold">{getPegawais.kode_jenis_pegawai}</div>
          </div>
          <div>
            <div className="text-gray-400">STATUS PEGAWAI</div>
            <div className="font-bold">{getPegawais.kode_status_pegawai}</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-start gap-x-16">
          <div>
            <div className="text-gray-400">
              {getPegawais.jenis_kelamin === "L"
                ? "JUMLAH ISTRI"
                : "JUMLAH SUAMI"}
            </div>
            <div className="font-bold">{getPegawais.jumlah_sutri}</div>
          </div>
          <div>
            <div className="text-gray-400">JUMLAH ANAK</div>
            <div className="font-bold">{getPegawais.jumlah_anak}</div>
          </div>
        </div>
      </>
    );
  };
  // const renderGapokServices = () => {
  //   if (resultDataPerubaahan.success === false) {
  //     return (
  //       <div className="flex flex-col items-center justify-center gap-4">
  //         <ExclamationCircle className="size-8" />
  //         <p className="text-gray-400">{resultDataPerubaahan.message}</p>
  //       </div>
  //     );
  //   }

  //   return <div className="flex flex-col items-center justify-center">OKE</div>;
  // };

  const isVerifikasi = () => {
    if (getPegawais.status_data !== "VERIFIKASI") {
      return;
    }

    return (
      <>
        <BtnRollBackPNS data={getPegawais} />
        <BtnApprove
          {...sigapok}
          data={getPegawais}
          session_silkaonline={silkaonline}
        />
      </>
    );
  };
  return (
    <>
      <div className="w-full bg-blue-500 dark:bg-slate-800 h-screen">
        <div className="max-w-6xl mx-auto">
          <Card
            radius="none"
            shadow="lg"
            className="max-h-screen overflow-y-auto my-auto">
            <CardHeader className="flex justify-between items-center">
              <div className="inline-flex items-center gap-4">
                <BtnBackNextUi goTo="/app-module/kgb" title="Kembali" />
                <div className="flex flex-col">
                  <p className="text-xl flex flex-col">
                    <span className="uppercase">
                      Verifikasi & Validasi Data Peremajaan
                    </span>
                    <span className="text-base">{namalengkap}</span>
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col md:flex-row justify-between items-start gap-x-6 gap-y-3">
                {/* Get Data Silka */}
                <Card fullWidth>
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                      <p className="text-md">SILKa Online</p>
                      <p className="text-small text-default-500">
                        Data Verifikasi & Validasi Data Peremajaan
                      </p>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex flex-col gap-y-4 px-8 py-8">
                    {renderSilkaService()}
                  </CardBody>
                  <Divider />
                  <CardFooter className="sticky bottom-0">
                    <div className="flex items-center justify-between w-full">
                      {isVerifikasi()}
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
