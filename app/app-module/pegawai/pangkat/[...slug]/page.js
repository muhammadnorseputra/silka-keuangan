import { BtnBackNextUi } from "@/components/button/btn-back";
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
import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  CheckBadgeIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { ExclamationCircle } from "react-bootstrap-icons";
import { decrypt } from "@/helpers/encrypt";
import { getPerubahanData } from "@/dummy/sigapok-get-perubahan";

import { checkURLStatus } from "@/helpers/cekurlstatus";
import { polaNIP } from "@/helpers/polanip";
import { getPangkatByNip } from "@/dummy/data-pangkat-by-nip";
import BtnPangkatConfirm from "@/components/button/btn-pangkat-confirm";
import { ShowProfile } from "@/helpers/profile";
import {
  AlertDanger,
  AlertInfo,
  AlertSuccess,
  AlertWarning,
} from "@/components/alert";
import { getGapokByPangkat } from "@/dummy/sigapok-get-gapok";
import { GapokByPangkat } from "@/components/cards/card-gapok";

export default async function Page({ params }) {
  const sigapok = await useSessionServer("USER_GAPOK");
  const session_silka = await useSessionServer("USER_SILKA");
  const NIP = decrypt(params.slug[0], "bkpsdm");
  const riwayat_pangkat = await getPangkatByNip(NIP);
  const resultDataPerubaahan = await getPerubahanData(
    sigapok.access_token, //token
    1, // jenis kenaikan pangkat
    NIP, // nip baru
    riwayat_pangkat?.data?.row?.tmt, // tmt sk
    riwayat_pangkat?.data?.row?.id_status_pegawai_simgaji //status pegawai
  );

  const { data: resGapok } = await getGapokByPangkat(sigapok.access_token, {
    MASKER: riwayat_pangkat?.data?.row?.mkgol_thn ?? 0,
    KDPANGKAT: riwayat_pangkat?.data?.row?.id_pangkat_simgaji,
    KDKELOMPOK: 2,
  });

  const getGapok = {
    resGapok: resGapok[0],
    pangkat_nama: riwayat_pangkat?.data?.row?.nama_pangkat,
    golru_nama: riwayat_pangkat?.data?.row?.nama_golru,
  };
  // cek apakah gapok inexis sama atau beda dengan silka
  // jika beda naik atau turun icon, jika sama check oke icon
  const checkGapok = () => {
    if (parseInt(riwayat_pangkat?.data?.row?.gapok) < resGapok[0].gapok) {
      return <ArrowDownLeftIcon className="size-6 font-bold text-red-500" />;
    }

    if (parseInt(riwayat_pangkat?.data?.row?.gapok) > resGapok[0].gapok) {
      return <ArrowUpRightIcon className="size-6 font-bold text-red-500" />;
    }

    return <CheckBadgeIcon className="size-7 font-bold text-green-500" />;
  };

  // cek file sk kgb ada atau tidak
  const isBerkas = await checkURLStatus(riwayat_pangkat?.data?.row?.berkas);

  const renderSilkaService = () => {
    if (riwayat_pangkat.status === false) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 h-screen">
          <ExclamationCircle className="size-8" />
          <p className="text-gray-400">{riwayat_pangkat.message}</p>
        </div>
      );
    }

    const { is_peremajaan } = riwayat_pangkat?.data.row;
    return (
      <>
        {isBerkas !== "OK" && (
          <AlertDanger
            title="Perhatian"
            message="File SK / Berkas tidak ditemukan, verifikasi tidak dapat dilakukan !
            Silahkan Upload pada Riwayat Pangkat Terkahir ASN"
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
          <div className="font-bold">
            {riwayat_pangkat?.data.nama_lengkap ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">NIP</div>
          <div className="font-bold">
            {riwayat_pangkat?.data.nip_convert ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">PANGKAT (GOLONGAN RUANG)</div>
          <div className="font-bold">
            {riwayat_pangkat?.data?.row?.nama_pangkat} (
            {riwayat_pangkat?.data.row.nama_golru ?? "-"})
          </div>
        </div>
        <div>
          <div className="text-gray-400">GAJI POKOK</div>
          <div className="inline-flex items-center gap-2 font-bold text-2xl text-green-700">
            {`Rp. ${formatRupiah(riwayat_pangkat?.data?.row?.gapok)}`}{" "}
            {checkGapok()}
          </div>
        </div>
        <div className="inline-flex flex-row justify-between">
          <div>
            <div className="text-gray-400">MASA KERJA TAHUN</div>
            <div className="font-bold">
              {riwayat_pangkat?.data.row.mkgol_thn ?? "-"} Tahun
            </div>
          </div>
          <div>
            <div className="text-gray-400">MASA KERJA BULAN</div>
            <div className="font-bold">
              {riwayat_pangkat?.data.row.mkgol_bln ?? "-"} Bulan
            </div>
          </div>
        </div>
        <div>
          <div className="text-gray-400">TERHITUNG MULAI TANGGAL</div>
          <div className="font-bold">
            {formatTanggalIndonesia(riwayat_pangkat?.data.row.tmt) ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">NO SK</div>
          <div className="font-bold">
            {riwayat_pangkat?.data.row.no_sk ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">TANGGAL SK</div>
          <div className="font-bold">
            {formatTanggalIndonesia(riwayat_pangkat?.data.row.tgl_sk) ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">PEJABAT SK</div>
          <div className="font-bold">
            {riwayat_pangkat?.data.row.pejabat_sk ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">FILE SK</div>
          <Button
            href={riwayat_pangkat?.data.row.berkas}
            as={Link}
            color="primary"
            // fullWidth
            isExternal
            className="justify-start"
            variant="bordered">
            <DocumentTextIcon className="size-4" />
            <Divider orientation="vertical" />
            <p className="truncate">{riwayat_pangkat?.data.row.no_sk}.pdf</p>
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
    let lastRow = resultDataPerubaahan?.data?.length - 1;
    const { USER_VERIF, KETERANGAN, FLAG, VERIFIKASI_TIME } =
      resultDataPerubaahan?.data[lastRow];

    return (
      <>
        {FLAG === 2 && (
          <AlertDanger
            title="Hasil Verifikasi (Ditolak)"
            message={`oleh ${USER_VERIF} pada ${VERIFIKASI_TIME}, keterangan : ${KETERANGAN} `}
          />
        )}
        {FLAG === 1 && (
          <AlertSuccess title="Hasil Verifikasi (Disetujui)">
            {USER_VERIF} pada {VERIFIKASI_TIME}
          </AlertSuccess>
        )}
        {(FLAG === 0 || FLAG === null) && (
          <AlertInfo title="Status Verifikasi">
            Menunggu Verifikasi Badan Keuangan Daerah.
          </AlertInfo>
        )}
        <div>
          <div className="text-gray-400">NAMA</div>
          <div className="font-bold">
            {resultDataPerubaahan?.data[lastRow].NAMA ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">NIP</div>
          <div className="font-bold">
            {polaNIP(resultDataPerubaahan?.data[lastRow].NIP_BARU) ?? "-"}
          </div>
        </div>
        <div className="inline-flex flex-row justify-start gap-x-8">
          <div>
            <div className="text-gray-400">STATUS PEGAWAI</div>
            <div className="font-bold">
              {resultDataPerubaahan?.data[lastRow].STATUS_PEGAWAI_NAMA ?? "-"}
            </div>
          </div>
          <div>
            <div className="text-gray-400">PANGKAT PEGAWAI</div>
            <div className="font-bold">
              {resultDataPerubaahan?.data[lastRow].PANGKAT_NAMA ?? "-"}
            </div>
          </div>
        </div>
        <div>
          <div className="text-gray-400">GAJI POKOK BARU</div>
          <div className="font-bold text-2xl text-green-700">
            {`Rp. ${formatRupiah(
              resultDataPerubaahan?.data[lastRow]?.GAJI_POKOK
            )}`}
          </div>
        </div>
        <div className="inline-flex flex-row justify-start gap-x-8">
          <div>
            <div className="text-gray-400">MASA KERJA TAHUN</div>
            <div className="font-bold">
              {resultDataPerubaahan?.data[lastRow].MASA_KERJA_TAHUN ?? "-"}{" "}
              Tahun
            </div>
          </div>
          <div>
            <div className="text-gray-400">MASA KERJA BULAN</div>
            <div className="font-bold">
              {resultDataPerubaahan?.data[lastRow].MASA_KERJA_BULAN ?? "-"}{" "}
              Bulan
            </div>
          </div>
        </div>
        <div className="inline-flex flex-row justify-between">
          <div>
            <div className="text-gray-400">TERHITUNG MULAI TANGGAL</div>
            <div className="font-bold">
              {formatTanggalIndonesia(
                resultDataPerubaahan?.data[lastRow].TMT_SK
              ) ?? "-"}
            </div>
          </div>
        </div>
        <div>
          <div className="text-gray-400">NO SK</div>
          <div className="font-bold">
            {resultDataPerubaahan?.data[lastRow].NO_SK ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">TANGGAL SK</div>
          <div className="font-bold">
            {formatTanggalIndonesia(
              resultDataPerubaahan?.data[lastRow].TANGGAL_SK
            ) ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">PEJABAT SK</div>
          <div className="font-bold">
            {resultDataPerubaahan?.data[lastRow].PEJABAT_PENETAP ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">FILE SK</div>
          <Button
            href={resultDataPerubaahan?.data[lastRow].PDF}
            as={Link}
            color="primary"
            // fullWidth
            isExternal
            className="justify-start"
            variant="bordered">
            <DocumentTextIcon className="size-4" />
            <Divider orientation="vertical" />
            <p>{resultDataPerubaahan?.data[lastRow].NO_SK}.pdf</p>
          </Button>
        </div>
      </>
    );
  };
  const renderButtonVerifikasi = () => {
    if (isBerkas !== "OK") return null;
    if (
      riwayat_pangkat?.data.row.is_peremajaan === "VERIFIKASI" ||
      riwayat_pangkat?.data.row.is_peremajaan === "ENTRI" ||
      riwayat_pangkat?.data.row.is_peremajaan === null
    )
      return null;

    return (
      <BtnPangkatConfirm
        RIWAYAT_PANGKAT={riwayat_pangkat}
        SESSION={session_silka}
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
                  <div className="text-xl flex flex-col">
                    <span className="uppercase font-bold">
                      Kenaikaan Pangkat
                    </span>
                    <ShowProfile jenis="PNS" nipnama={NIP} />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <GapokByPangkat props={getGapok} />
              <div className="flex flex-col md:flex-row justify-between items-start gap-x-6 gap-y-3">
                {/* Get Data Silka */}
                <Card fullWidth>
                  <CardHeader className="flex gap-3 bg-purple-100">
                    <div className="flex flex-col">
                      <p className="text-md font-bold dark:text-purple-600">
                        SILKa Online
                      </p>
                      <p className="text-small text-default-500">
                        Data Kenaikan Pangkat
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
                  <CardHeader className="flex gap-3 bg-amber-100">
                    <div className="flex flex-col">
                      <p className="text-md font-bold dark:text-amber-600">
                        Sigapok Services
                      </p>
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
