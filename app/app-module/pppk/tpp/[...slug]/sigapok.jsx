import {
  hasSessionServer,
  useSessionServer,
} from "@/app/app-module/server-session";
import { AlertSuccess, AlertDanger, AlertInfo } from "@/components/alert";
import { getTppByNip, getTppByNipppk } from "@/dummy/data-tpp-by-nip";
import { getTppSigapok } from "@/dummy/sigapok-get-tpp";
import { formatRupiahManual } from "@/helpers/cx";
import { decrypt } from "@/helpers/encrypt";
import { polaNIP } from "@/helpers/polanip";
import { ShowProfile } from "@/helpers/profile";
import { terbilangRupiah } from "@/helpers/rupiah";
import { redirect } from "next/navigation";
import { ExclamationCircle } from "react-bootstrap-icons";

export default async function RenderGapokServices({ slug }) {
  const session = hasSessionServer("USER_GAPOK");
  const sigapok = useSessionServer("USER_GAPOK");
  if (session === false) {
    return redirect("/app-integrasi/dashboard");
  }
  const NIP = decrypt(slug[0], "bkpsdm");

  const getTppSilka = await getTppByNipppk(NIP);
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

  const { success, message, data } = await getDataTppSigapok();

  if (success === false) {
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
      <div className="inline-flex flex-col justify-start sm:flex-row gap-x-6 gap-y-8">
        <div>
          <div className="text-gray-400">JUMLAH KOTOR</div>
          <div className="text-xl font-bold text-gray-600">
            {formatRupiahManual(data[lastRow].KOTOR ?? 0) ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">TOTAL POTONGAN</div>
          <div className="text-xl font-bold text-red-600">
            {formatRupiahManual(data[lastRow].JLH_POT ?? 0) ?? "-"}
          </div>
        </div>
      </div>
      <div>
        <div className="text-gray-400">JUMLAH TPP</div>
        <div className="text-2xl font-bold text-green-600">
          {formatRupiahManual(data[lastRow].JML_TPP) ?? "-"}
        </div>
      </div>
      <div className="pb-6 border-b border-gray-300 border-dashed">
        <div className="text-gray-400">TERBILANG</div>
        <div className="italic font-bold text-gray-400 uppercase">
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
