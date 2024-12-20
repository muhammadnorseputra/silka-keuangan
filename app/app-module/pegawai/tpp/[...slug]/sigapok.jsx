import { AlertDanger, AlertInfo, AlertSuccess } from "@/components/alert";
import { getTppByNip } from "@/dummy/data-tpp-by-nip";
import { getTppSigapok } from "@/dummy/sigapok-get-tpp";
import { formatRupiahManual } from "@/helpers/cx";
import { polaNIP } from "@/helpers/polanip";
import { ShowProfile } from "@/helpers/profile";
import { terbilangRupiah } from "@/helpers/rupiah";
import { ExclamationCircle } from "react-bootstrap-icons";

export default async function RenderGapokServices({ nip: NIP, sigapok }) {
  const getTppSilka = await getTppByNip(NIP);

  if (getTppSilka.status === false) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <ExclamationCircle className="size-8" />
        <p className="text-gray-400">{getTppSilka.message}</p>
      </div>
    );
  }

  const { bulan, tahun } = getTppSilka?.data;
  const PERIODE_TPP = `${bulan.toString().padStart(2, "0")}${tahun}`;

  const getDataTppSigapok = async () => {
    const resultDataTppSigapok = await getTppSigapok(
      sigapok.access_token,
      NIP,
      PERIODE_TPP
    );
    return resultDataTppSigapok;
  };

  const { success, message, data, exception } = await getDataTppSigapok();
  if (exception !== "" && data === null) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <ExclamationCircle className="size-8" />
        <p className="text-gray-400">{message}</p>
      </div>
    );
  }

  if (success === false || getTppSilka.status === false) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <ExclamationCircle className="size-8" />
        <p className="text-gray-400">{message}</p>
      </div>
    );
  }

  let lastRow = data?.length - 1;
  const { STATUS_VERIF, KET_VERIFIKASI, USER_VERIF, VERIFIKASI_TIME } =
    data[lastRow];

  return (
    <>
      {STATUS_VERIF === "1" && (
        <AlertSuccess title="Status Verifikasi (Disetujui)">
          {KET_VERIFIKASI} oleh {USER_VERIF} pada {VERIFIKASI_TIME}
        </AlertSuccess>
      )}
      {STATUS_VERIF === "2" && (
        <AlertDanger
          title="Status Verifikasi (Ditolak)"
          message={`oleh ${USER_VERIF} pada ${VERIFIKASI_TIME}, keterangan : ${KET_VERIFIKASI} `}
        />
      )}
      {STATUS_VERIF === "0" && (
        <AlertInfo title="Status Verifikasi">
          Menunggu Verifikasi Badan Keuangan Daerah.
        </AlertInfo>
      )}
      <div>
        <div className="text-gray-400">NIP</div>
        <div className="font-bold">{polaNIP(data[lastRow].NIP) ?? "-"}</div>
      </div>
      <div>
        <div className="text-gray-400">PERIODE TPP</div>
        <div className="font-bold">{data[lastRow].PERIODE_TPP ?? "-"}</div>
      </div>
      <div>
        <div className="text-gray-400">JUMLAH TPP</div>
        <div className="font-bold text-green-600 text-2xl">
          {formatRupiahManual(data[lastRow].JML_TPP) ?? "-"}
        </div>
      </div>
      <div>
        <div className="text-gray-400">TERBILANG</div>
        <div className="font-bold text-gray-400 italic uppercase">
          {terbilangRupiah(data[lastRow].JML_TPP) ?? "-"}
        </div>
      </div>
      <div className="inline-flex flex-col justify-start gap-x-8 gap-y-6">
        <div>
          <div className="text-gray-400">DI KIRIM OLEH</div>
          <div className="font-bold">
            <ShowProfile jenis="PNS" nipnama={data[lastRow].ADDUSER} />
          </div>
        </div>
        <div>
          <div className="text-gray-400">DI KIRIM PADA</div>
          <div className="font-bold">{data[lastRow].ADDTIME ?? "-"}</div>
        </div>
      </div>
    </>
  );
}
