import { useSessionServer } from "@/app/app-module/server-session";
import { BtnKirimTPP } from "@/components/button/btn-tpp-kirim";
import { getTppByNipppk } from "@/dummy/data-tpp-by-nip";
import { decrypt } from "@/helpers/encrypt";
import { polaNIP } from "@/helpers/polanip";
import { ExclamationCircle } from "react-bootstrap-icons";
import DetailKalkulasi from "./detailKalkulasi";
import {
  AlertDanger,
  AlertInfo,
  AlertSuccess,
  AlertWarning,
} from "@/components/alert";

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
    is_peremajaan,
    is_sync_simgaji,
  } = resultDataTpp?.data;

  const renderButtonKirim = () => {
    if (is_sync_simgaji === "1") return null;
    if (fid_status === "5") return null;
    if (fid_status !== "4" && fid_status !== "5") return null;
    if (is_peremajaan === "ENTRI" || is_peremajaan === null) return null;
    if (is_peremajaan === "VERIFIKASI") return null;

    return (
      <>
        <BtnKirimTPP {...sigapok} {...resultDataTpp?.data} silka={silka} />
      </>
    );
  };

  return (
    <>
      {fid_status === "5" && (
        <AlertSuccess title="Perhatian">
          TPP sudah selesai cetak pada silka online.
        </AlertSuccess>
      )}
      {is_sync_simgaji !== "1" && (
        <AlertInfo title="Informasi">
          TPP belum dikirim, silahkan kirim data
        </AlertInfo>
      )}
      {fid_status !== "4" && fid_status !== "5" && (
        <AlertDanger title="Perhatian">
          TPP masih dalam proses perhitungan atau belum disetujui.
        </AlertDanger>
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
