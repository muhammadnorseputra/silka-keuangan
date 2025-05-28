import { useSessionServer } from "@/app/app-module/server-session";
import {
  AlertDanger,
  AlertInfo,
  AlertSuccess,
  AlertWarning,
} from "@/components/alert";
import { BtnBackNextUi } from "@/components/button/btn-back";
import BtnKgbConfirm from "@/components/button/btn-kgb-confirm-pppk";
import { getKgbPPPK } from "@/dummy/data-kgb-by-nipppk";
import { getPerubahanData } from "@/dummy/sigapok-get-perubahan";
import { checkURLStatus } from "@/helpers/cekurlstatus";
import { formatRupiah, formatTanggalIndonesia } from "@/helpers/cx";
import { decrypt } from "@/helpers/encrypt";
import { polaNIP } from "@/helpers/polanip";
import { ShowProfile } from "@/helpers/profile";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  CardFooter,
  Button,
  Link,
} from "@nextui-org/react";
import { ExclamationCircle } from "react-bootstrap-icons";

export default async function Page({ params }) {
  const nipppk = decrypt(params.slug[0], "bkpsdm");

  const sigapok = await useSessionServer("USER_GAPOK");
  const silka = await useSessionServer("USER_SILKA");

  const response = await getKgbPPPK(nipppk, silka.access_token);
  const response_gapok = await getPerubahanData(
    sigapok.access_token, //token
    2, // jenis kenaikan
    nipppk, // nip baru
    response?.data?.tmt, // tmt sk
    response?.data?.kode_status_pegawai_simgaji // status pegawai id
  );

  // cek file sk kgb ada atau tidak
  const isBerkas = await checkURLStatus(response?.data?.berkas);

  const RenderSilkaService = () => {
    if (response.status === false) {
      return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <ExclamationCircle className="size-8" />
          <p className="text-gray-400">{response.message}</p>
        </div>
      );
    }
    const {
      nipppk,
      nama_lengkap,
      gapok_baru,
      id_pangkat,
      nama_pangkat,
      mk_thn,
      mk_bln,
      tmt,
      tgl_sk,
      no_sk,
      pejabat_sk,
      berkas,
      is_peremajaan,
    } = response?.data;
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
          <div className="text-gray-400">NIPPPK</div>
          <div className="font-bold">{nipppk ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">ID PANGKAT (NAMA PANGKAT)</div>
          <div className="font-bold">
            {id_pangkat} ({nama_pangkat ?? "-"})
          </div>
        </div>
        <div>
          <div className="text-gray-400">GAJI POKOK TERAKHIR</div>
          <div className="inline-flex items-center gap-2 text-2xl font-bold text-green-700">
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
    if (response_gapok.success === false || response_gapok.ok) {
      return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <ExclamationCircle className="size-8" />
          <p className="text-gray-400">{response_gapok.message}</p>
        </div>
      );
    }

    let lastRow = response_gapok?.data?.length - 1;
    const { USER_VERIF, KETERANGAN, FLAG, VERIFIKASI_TIME } =
      response_gapok?.data[lastRow];
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
            {response_gapok?.data[lastRow].NAMA ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">NIP</div>
          <div className="font-bold">
            {polaNIP(response_gapok?.data[lastRow].NIP_BARU) ?? "-"}
          </div>
        </div>
        <div className="inline-flex flex-row justify-start gap-x-8">
          <div>
            <div className="text-gray-400">STATUS PEGAWAI</div>
            <div className="font-bold">
              {response_gapok?.data[lastRow].STATUS_PEGAWAI_NAMA ?? "-"}
            </div>
          </div>
          <div>
            <div className="text-gray-400">GOLONGAN</div>
            <div className="font-bold">
              {response_gapok?.data[lastRow].PANGKAT_NAMA ?? "-"}
            </div>
          </div>
        </div>
        <div>
          <div className="text-gray-400">GAJI POKOK BARU</div>
          <div className="text-2xl font-bold text-green-700">
            {formatRupiah(response_gapok?.data[lastRow].GAJI_POKOK) ?? "-"}
          </div>
        </div>
        <div className="inline-flex flex-row justify-start gap-x-8">
          <div>
            <div className="text-gray-400">MASA KERJA TAHUN</div>
            <div className="font-bold">
              {response_gapok?.data[lastRow].MASA_KERJA_TAHUN ?? "-"} Tahun
            </div>
          </div>
          <div>
            <div className="text-gray-400">MASA KERJA BULAN</div>
            <div className="font-bold">
              {response_gapok?.data[lastRow].MASA_KERJA_BULAN ?? "-"} Bulan
            </div>
          </div>
        </div>
        <div className="inline-flex flex-row justify-between">
          <div>
            <div className="text-gray-400">TERHITUNG MULAI TANGGAL</div>
            <div className="font-bold">
              {formatTanggalIndonesia(response_gapok?.data[lastRow].TMT_SK) ??
                "-"}
            </div>
          </div>
          <div>
            <div className="text-gray-400">TMT KGB BERIKUTNYA</div>
            <div className="font-bold">
              {formatTanggalIndonesia(
                response_gapok?.data[lastRow].TMTBERKALAYAD
              ) ?? "-"}
            </div>
          </div>
        </div>
        <div>
          <div className="text-gray-400">NO SK</div>
          <div className="font-bold">
            {response_gapok?.data[lastRow].NO_SK ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">TANGGAL SK</div>
          <div className="font-bold">
            {formatTanggalIndonesia(response_gapok?.data[lastRow].TANGGAL_SK) ??
              "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">PEJABAT SK</div>
          <div className="font-bold">
            {response_gapok?.data[lastRow].PEJABAT_PENETAP ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">FILE SK</div>
          <Button
            href={response_gapok?.data[lastRow].PDF}
            as={Link}
            color="primary"
            // fullWidth
            isExternal
            className="justify-start"
            variant="bordered">
            <DocumentTextIcon className="size-4" />
            <Divider orientation="vertical" />
            <p>{response_gapok?.data[lastRow].NO_SK}.pdf</p>
          </Button>
        </div>
      </>
    );
  };
  const renderButtonVerifikasi = () => {
    if (isBerkas !== "OK") return null;
    if (
      response?.data.is_peremajaan === "VERIFIKASI" ||
      response?.data.is_peremajaan === "ENTRI" ||
      response?.data.is_peremajaan === null
    )
      return null;

    return (
      <BtnKgbConfirm dataSilka={response} session_silka={silka} {...sigapok} />
    );
  };
  return (
    <>
      <div className="w-full bg-[url(/background-wa.jpg)] dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <Card
            radius="none"
            shadow="lg"
            className="max-h-screen my-auto overflow-y-auto">
            <CardHeader className="flex items-center justify-between">
              <div className="inline-flex items-center gap-4">
                <BtnBackNextUi goTo="/app-module/kgb" title="Kembali" />
                <div className="flex flex-col">
                  <div className="flex flex-col text-xl">
                    <span className="font-bold uppercase">
                      Kenaikaan gaji berkala PPPK
                    </span>
                    <ShowProfile jenis="PPPK" nipnama={nipppk} />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col items-start justify-between md:flex-row gap-x-6 gap-y-3">
                {/* Get Data Silka */}
                <Card fullWidth>
                  <CardHeader className="flex gap-3 bg-purple-100">
                    <div className="flex flex-col">
                      <p className="font-bold text-md dark:text-purple-600">
                        SILKa Online
                      </p>
                      <p className="text-small text-default-500">
                        Data Kenaikan Gaji Berkala
                      </p>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex flex-col h-screen px-8 py-8 gap-y-4">
                    {RenderSilkaService()}
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
                      <p className="font-bold text-md dark:text-amber-600">
                        Sigapok Services
                      </p>
                      <p className="text-small text-default-500">
                        Data Badan Keuangan Daerah
                      </p>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex flex-col px-8 py-8 gap-y-4">
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
