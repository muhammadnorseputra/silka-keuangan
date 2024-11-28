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
import { formatRupiah, formatTanggalIndonesia } from "@/helpers/cx";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { ExclamationCircle } from "react-bootstrap-icons";
import { decrypt } from "@/helpers/encrypt";
import { getPerubahanData } from "@/dummy/sigapok-get-perubahan";

import BtnKgbConfirm from "@/components/button/btn-kgb-confirm";
import { checkURLStatus } from "@/helpers/cekurlstatus";
import { polaNIP } from "@/helpers/polanip";
import { ShowProfile } from "@/helpers/profile";
import { AlertDanger, AlertWarning } from "@/components/alert";

export const revalidate = 0;

export default async function Page({ params }) {
  const sigapok = useSessionServer("USER_GAPOK");
  const session_silka = useSessionServer("USER_SILKA");
  const NIP = decrypt(params.slug[0], "bkpsdm");
  const resultDataKgb = await getKgbByNip(NIP);
  const resultDataPerubaahan = await getPerubahanData(
    sigapok.access_token, //token
    2, // jenis kenaikan
    NIP, // nip baru
    resultDataKgb?.data.tmt, // tmt sk
    resultDataKgb?.data.id_status_pegawai_simgaji //status pegawai
  );

  // cek file sk kgb ada atau tidak
  const isBerkas = await checkURLStatus(resultDataKgb?.data?.berkas);

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
      id_status_pegawai_simgaji,
      id_jenis_pegawai_simgaji,
      is_peremajaan,
    } = resultDataKgb?.data;
    return (
      <>
        {isBerkas !== "OK" && (
          <AlertDanger
            title="Perhatian"
            message="File SK / Berkas tidak ditemukan, verifikasi tidak dapat dilakukan !
            Silahkan Upload pada Riwayat KGB Terkahir ASN"
          />
        )}
        {(is_peremajaan === "ENTRI" || is_peremajaan === null) && (
          <AlertWarning
            title="Perhatian"
            message="Data Pegawai belum diremajakan, silahkan melakukan peremajaan data terlebih dahulu"
          />
        )}
        {is_peremajaan === "VERIFIKASI" && (
          <AlertWarning title="Perhatian">
            Peremajaan data belum verifikasi oleh pengelola kepegawaian.
          </AlertWarning>
        )}
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
          <div className="font-bold text-2xl text-green-700">
            {formatRupiah(gapok_baru) ?? "-"}
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
            className="justify-start"
            variant="bordered">
            <DocumentTextIcon className="size-4" />
            <Divider orientation="vertical" />
            <p className="truncate">{no_sk}.pdf</p>
          </Button>
        </div>
      </>
    );
  };
  const renderGapokServices = () => {
    if (resultDataPerubaahan.success === false || resultDataPerubaahan.ok) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 h-screen">
          <ExclamationCircle className="size-8" />
          <p className="text-gray-400">{resultDataPerubaahan.message}</p>
        </div>
      );
    }
    return (
      <>
        <div>
          <div className="text-gray-400">NAMA</div>
          <div className="font-bold">
            {resultDataPerubaahan?.data[0].NAMA ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">NIP</div>
          <div className="font-bold">
            {polaNIP(resultDataPerubaahan?.data[0].NIP_BARU) ?? "-"}
          </div>
        </div>
        <div className="inline-flex flex-row justify-start gap-x-8">
          <div>
            <div className="text-gray-400">STATUS PEGAWAI</div>
            <div className="font-bold">
              {resultDataPerubaahan?.data[0].STATUS_PEGAWAI_NAMA ?? "-"}
            </div>
          </div>
          <div>
            <div className="text-gray-400">PANGKAT PEGAWAI</div>
            <div className="font-bold">
              {resultDataPerubaahan?.data[0].PANGKAT_NAMA ?? "-"}
            </div>
          </div>
        </div>
        <div>
          <div className="text-gray-400">GAJI POKOK BARU</div>
          <div className="font-bold text-2xl text-green-700">
            {formatRupiah(resultDataPerubaahan?.data[0].GAJI_POKOK) ?? "-"}
          </div>
        </div>
        <div className="inline-flex flex-row justify-start gap-x-8">
          <div>
            <div className="text-gray-400">MASA KERJA TAHUN</div>
            <div className="font-bold">
              {resultDataPerubaahan?.data[0].MASA_KERJA_TAHUN ?? "-"} Tahun
            </div>
          </div>
          <div>
            <div className="text-gray-400">MASA KERJA BULAN</div>
            <div className="font-bold">
              {resultDataPerubaahan?.data[0].MASA_KERJA_BULAN ?? "-"} Bulan
            </div>
          </div>
        </div>
        <div className="inline-flex flex-row justify-between">
          <div>
            <div className="text-gray-400">TERHITUNG MULAI TANGGAL</div>
            <div className="font-bold">
              {formatTanggalIndonesia(resultDataPerubaahan?.data[0].TMT_SK) ??
                "-"}
            </div>
          </div>
          <div>
            <div className="text-gray-400">TMT KGB BERIKUTNYA</div>
            <div className="font-bold">
              {formatTanggalIndonesia(
                resultDataPerubaahan?.data[0].TMTBERKALAYAD
              ) ?? "-"}
            </div>
          </div>
        </div>
        <div>
          <div className="text-gray-400">NO SK</div>
          <div className="font-bold">
            {resultDataPerubaahan?.data[0].NO_SK ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">TANGGAL SK</div>
          <div className="font-bold">
            {formatTanggalIndonesia(resultDataPerubaahan?.data[0].TANGGAL_SK) ??
              "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">PEJABAT SK</div>
          <div className="font-bold">
            {resultDataPerubaahan?.data[0].PEJABAT_PENETAP ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">FILE SK</div>
          <Button
            href={resultDataPerubaahan?.data[0].PDF}
            as={Link}
            color="primary"
            // fullWidth
            isExternal
            className="justify-start"
            variant="bordered">
            <DocumentTextIcon className="size-4" />
            <Divider orientation="vertical" />
            <p>{resultDataPerubaahan?.data[0].NO_SK}.pdf</p>
          </Button>
        </div>
      </>
    );
  };

  const renderButtonVerifikasi = () => {
    if (isBerkas !== "OK") return null;
    if (
      resultDataKgb?.data.is_peremajaan === "VERIFIKASI" ||
      resultDataKgb?.data.is_peremajaan === "ENTRI" ||
      resultDataKgb?.data.is_peremajaan === null
    )
      return null;

    return (
      <BtnKgbConfirm
        dataSilka={resultDataKgb}
        session_silka={session_silka}
        {...sigapok}
      />
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
                    <span className="uppercase font-bold">
                      Kenaikaan gaji berkala
                    </span>
                    <ShowProfile jenis="PNS" nipnama={NIP} />
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
                      {renderButtonVerifikasi()}
                    </div>
                  </CardFooter>
                </Card>
                {/* Get Data Gapok */}
                <Card fullWidth>
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                      <p className="text-md">Sigapok Services</p>
                      <p className="text-small text-default-500">
                        Data Badan Keuangan Daerah
                      </p>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex flex-col gap-y-4 px-8 py-8 h-screen">
                    {renderGapokServices()}
                  </CardBody>
                </Card>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
