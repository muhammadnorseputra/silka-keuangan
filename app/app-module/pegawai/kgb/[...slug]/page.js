import { BtnBackNextUi } from "@/components/button/btn-back";
import { getKgbByNip } from "@/dummy/data-kgb-by-nip";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
import { useSessionServer } from "../../../server-session";
import { formatRupiahManual, formatTanggalIndonesia } from "@/helpers/cx";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { CloudArrowUp, ExclamationCircle } from "react-bootstrap-icons";
import { decrypt } from "@/helpers/encrypt";
import { getPerubahanData } from "@/dummy/sigapok-get-perubahan";

export const revalidate = 0;

export default async function Page({ params }) {
  const sigapok = useSessionServer("USER_GAPOK");
  const $getNip = decrypt(params.slug[0], "bkpsdm");
  const resultDataKgb = await getKgbByNip($getNip);
  const tmt_sk = "2024-01-01";
  const resultDataPerubaahan = await getPerubahanData(
    sigapok.access_token, //token
    2, // jenis kenaikan
    $getNip, // nip baru
    tmt_sk, // tmt sk
    2 //
  );

  const renderSilkaService = () => {
    if (resultDataKgb.status === false) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 h-screen">
          <ExclamationCircle className="size-8" />
          <p className="text-gray-400">{resultDataKgb.message}</p>
        </div>
      );
    }
    const {
      nip,
      nip_convert,
      nama_lengkap,
      gapok_baru,
      golru_nama,
      mk_thn,
      mk_bln,
      tmt,
      tgl_sk,
      no_sk,
      pejabat_sk,
      berkas,
    } = resultDataKgb?.data;
    return (
      <>
        <div>
          <div className="text-gray-400">NAMA</div>
          <div className="font-bold">{nama_lengkap ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">NIP</div>
          <div className="font-bold">{nip_convert ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">GOLONGAN RUANG</div>
          <div className="font-bold">{golru_nama ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">GAJI POKOK TERAKHIR</div>
          <div className="font-bold">
            {formatRupiahManual(gapok_baru) ?? "-"}
          </div>
        </div>
        <div className="inline-flex flex-row justify-between">
          <div>
            <div className="text-gray-400">MASA KERJA TAHUN</div>
            <div className="font-bold">{mk_thn ?? "-"} Tahun</div>
          </div>
          <div>
            <div className="text-gray-400">MASA KERJA BULAN</div>
            <div className="font-bold">{mk_bln ?? "-"} Bulan</div>
          </div>
        </div>
        <div>
          <div className="text-gray-400">TERHITUNG MULAI TANGGAL</div>
          <div className="font-bold">{formatTanggalIndonesia(tmt) ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">NO SK</div>
          <div className="font-bold">{no_sk ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">TANGGAL SK</div>
          <div className="font-bold">
            {formatTanggalIndonesia(tgl_sk) ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">PEJABAT SK</div>
          <div className="font-bold">{pejabat_sk ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">FILE SK</div>
          <Button
            href={berkas}
            as={Link}
            color="primary"
            // fullWidth
            isExternal
            showAnchorIcon
            className="justify-start"
            variant="bordered">
            <DocumentTextIcon className="size-4" />
            <Divider orientation="vertical" />
            <p className="truncate">{nip}.pdf</p>
          </Button>
        </div>
      </>
    );
  };
  const renderGapokServices = () => {
    if (resultDataPerubaahan.success === false) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 h-screen">
          <ExclamationCircle className="size-8" />
          <p className="text-gray-400">{resultDataPerubaahan.message}</p>
        </div>
      );
    }
    console.log(resultDataPerubaahan);
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
                  <span className="uppercase">Kenaikaan gaji berkala</span>
                  <span className="text-base">
                    {resultDataKgb?.data?.nama_lengkap}
                  </span>
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
                      Data Kenaikan Gaji Berkala
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="flex flex-col gap-y-4 px-8 py-8 h-screen">
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
                <CardBody>{renderGapokServices()}</CardBody>
              </Card>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
