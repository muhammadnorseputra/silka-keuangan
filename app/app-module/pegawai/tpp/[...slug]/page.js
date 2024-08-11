import { BtnBackNextUi } from "@/components/button/btn-back";
import { getTppByNip } from "@/dummy/data-tpp-by-nip";
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
import { formatRupiahManual } from "@/helpers/cx";
import { CloudArrowUp, ExclamationCircle } from "react-bootstrap-icons";
import { decrypt } from "@/helpers/encrypt";
import { getTppSigapok } from "@/dummy/sigapok-get-tpp";

export const revalidate = 0;

export default async function Page({ params, searchParams }) {
  const session = hasSessionServer("USER_GAPOK");
  const sigapok = useSessionServer("USER_GAPOK");
  if (session === false) {
    return redirect("/app-integrasi/dashboard");
  }
  const $getNip = decrypt(params?.slug[0], "bkpsdm");
  const resultDataTpp = await getTppByNip($getNip);
  const resultDataPerubaahan = await getTppSigapok(sigapok.access_token);

  const namalengkap = `${resultDataTpp?.data?.gelar_depan} ${resultDataTpp?.data?.nama} ${resultDataTpp?.data?.gelar_belakang}`;
  const renderSilkaService = () => {
    if (resultDataTpp.status === false) {
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          <ExclamationCircle className="size-8" />
          <p className="text-gray-400">{resultDataTpp.message}</p>
        </div>
      );
    }
    const {
      nip,
      nama,
      gelar_depan,
      gelar_belakang,
      tpp_diterima,
      tahun,
      bulan,
      fid_status,
    } = resultDataTpp?.data;

    return (
      <>
        <div>
          <div className="text-gray-400">NAMA</div>
          <div className="font-bold">{namalengkap ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">NIP</div>
          <div className="font-bold">{nip ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">TAHUN</div>
          <div className="font-bold">{tahun ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">JUMLAH TPP DI TERIMA</div>
          <div className="font-bold">
            {formatRupiahManual(tpp_diterima) ?? "-"}
          </div>
        </div>
      </>
    );
  };
  const renderGapokServices = () => {
    if (resultDataPerubaahan.success === false) {
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          <ExclamationCircle className="size-8" />
          <p className="text-gray-400">{resultDataPerubaahan.message}</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-screen">
        OKE
      </div>
    );
  };
  return (
    <>
      <div className="max-w-6xl mx-auto">
        <Card shadow="none">
          <CardHeader className="flex justify-between items-center">
            <div className="inline-flex items-center gap-4">
              <BtnBackNextUi goTo="/app-module/kgb" title="Kembali" />
              <div className="flex flex-col">
                <p className="text-xl flex flex-col">
                  <span className="uppercase">
                    Tambahan Penghasilan Pegawai
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
                      Data Tambahan Penghasilan Pegawai
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="flex flex-col gap-y-4 px-8 py-8">
                  {renderSilkaService()}
                </CardBody>
                <Divider />
                <CardFooter>
                  <div className="flex items-end justify-end w-full">
                    <Button color="primary" variant="shadow">
                      <CloudArrowUp className="size-5 text-white" />
                      <Divider orientation="vertical" />
                      Kirim
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              {/* Get Data Gapok */}
              <Card fullWidth>
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col">
                    <p className="text-md">Gapok Services</p>
                    <p className="text-small text-default-500">
                      Data Badan Keuangan Daerah
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="flex flex-col gap-y-4 px-8 py-8">
                  {renderGapokServices()}
                </CardBody>
              </Card>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
