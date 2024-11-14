import { useSessionServer } from "@/app/app-module/server-session";
import { BtnKirimTPP } from "@/components/button/btn-tpp-kirim";
import { getTppByNipppk } from "@/dummy/data-tpp-by-nip";
import { formatRupiahManual } from "@/helpers/cx";
import { decrypt } from "@/helpers/encrypt";
import { polaNIP } from "@/helpers/polanip";
import { terbilangRupiah } from "@/helpers/rupiah";
import { Divider } from "@nextui-org/react";
import { ExclamationCircle } from "react-bootstrap-icons";
import DetailKalkulasi from "./detailKalkulasi";
import { AlertSuccess } from "@/components/alert";

export default async function RenderSilkaService({ slug }) {
  const sigapok = useSessionServer("USER_GAPOK");
  const silka = useSessionServer("USER_SILKA");

  const NIP = decrypt(slug[0], "bkpsdm");

  const resultDataTpp = await getTppByNipppk(NIP);
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
    gelar_blk,
    jabatan,
    tahun,
    bulan,
    fid_status,
  } = resultDataTpp?.data;

  const renderButtonKirim = () => {
    if (resultDataTpp?.data.is_sync_simgaji === "1") return null;
    if (resultDataTpp?.data.fid_status === "5") return null;
    return (
      <>
        <BtnKirimTPP {...sigapok} {...resultDataTpp?.data} silka={silka} />
      </>
    );
  };

  return (
    <>
      {resultDataTpp?.data.fid_status === "5" && (
        <AlertSuccess title="Perhatian">
          TPP sudah selesai cetak pada silka online.
        </AlertSuccess>
      )}
      <div className="inline-flex flex-col sm:flex-row justify-start gap-x-8 gap-y-8">
        <div>
          <div className="text-gray-400">NIP</div>
          <div className="font-bold">{polaNIP(nip) ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">NAMA</div>
          <div className="font-bold">
            {`${gelar_depan} ${nama} ${gelar_blk}`}
          </div>
        </div>
      </div>
      <div className="inline-flex flex-col sm:flex-row justify-start gap-x-8 gap-y-8">
        <div>
          <div className="text-gray-400">JABATAN</div>
          <div className="font-bold">{jabatan ?? "-"}</div>
        </div>
      </div>
      <div className="inline-flex flex-col sm:flex-row justify-start gap-x-8 gap-y-8">
        <div>
          <div className="text-gray-400">BULAN</div>
          <div className="font-bold">{bulan ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">TAHUN</div>
          <div className="font-bold">{tahun ?? "-"}</div>
        </div>
      </div>
      <DetailKalkulasi data={resultDataTpp?.data} />
      {renderButtonKirim()}
    </>
  );
}
