import {
  hasSessionServer,
  useSessionServer,
} from "@/app/app-module/server-session";
import { getTppByNip, getTppByNipppk } from "@/dummy/data-tpp-by-nip";
import { getTppSigapok } from "@/dummy/sigapok-get-tpp";
import { formatRupiahManual } from "@/helpers/cx";
import { decrypt } from "@/helpers/encrypt";
import { polaNIP } from "@/helpers/polanip";
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

  return (
    <>
      <div>
        <div className="text-gray-400">NIP</div>
        <div className="font-bold">{polaNIP(data[0].NIP) ?? "-"}</div>
      </div>
      <div>
        <div className="text-gray-400">PERIODE TPP</div>
        <div className="font-bold">{data[0].PERIODE_TPP ?? "-"}</div>
      </div>
      <div>
        <div className="text-gray-400">JUMLAH TPP</div>
        <div className="font-bold text-green-600 text-2xl">
          {formatRupiahManual(data[0].JML_TPP) ?? "-"}
        </div>
      </div>
      <div>
        <div className="text-gray-400">TERBILANG</div>
        <div className="font-bold text-gray-400 italic uppercase">
          {terbilangRupiah(data[0].JML_TPP) ?? "-"}
        </div>
      </div>
    </>
  );
}
