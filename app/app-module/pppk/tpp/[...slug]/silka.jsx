import { getSessionServer } from "@/app/app-module/server-session";
import { BtnKirimTPP } from "@/components/button/btn-tpp-kirim";
import { getTppByNipppk } from "@/dummy/data-tpp-by-nip-v2";
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
import { IdentificationIcon, UserIcon, BriefcaseIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";

export default async function RenderSilkaService({ slug }) {
  const sigapok = getSessionServer("USER_GAPOK");
  const silka = getSessionServer("USER_SILKA");

  const NIP = decrypt(slug[0], "bkpsdm");

  const resultDataTpp = await getTppByNipppk(NIP, silka?.access_token);
  if (resultDataTpp.status === false) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <ExclamationCircle className="size-8" />
        <p className="text-gray-400">{resultDataTpp.message}</p>
      </div>
    );
  }
  const {
    nipppk,
    nama,
    gelar_depan,
    gelar_belakang,
    jabatan,
    tahun,
    bulan,
    fid_status,
    is_peremajaan,
    is_sync_simgaji,
  } = resultDataTpp?.data[0];

  const renderButtonKirim = () => {
    if (is_sync_simgaji === "1") return null;
    if (fid_status === "5") return null;
    if (fid_status !== "4" && fid_status !== "5") return null;
    if (is_peremajaan === "ENTRI" || is_peremajaan === null) return null;
    if (is_peremajaan === "VERIFIKASI") return null;

    return (
      <>
        <BtnKirimTPP {...sigapok} {...resultDataTpp?.data[0]} silka={silka} />
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
      <div className="flex flex-col border border-gray-200 rounded-lg shadow">
        <div className="flex flex-col justify-start sm:flex-row divide-x-1">
          <div className="inline-flex items-center justify-start flex-1 p-3 border-b gap-x-4">
            <div className="p-2 rounded-lg bg-blue-50">
              <IdentificationIcon className="text-blue-600 size-6" />
            </div>
            <div className="inline-flex flex-col">
              <div className="text-xs text-gray-400">NIP</div>
              <div className="text-sm font-semibold">{polaNIP(nipppk) ?? "-"}</div>
            </div>
          </div>
          <div className="inline-flex items-center justify-start flex-1 p-3 border-b gap-x-4">
            <div className="p-2 rounded-lg bg-blue-50">
            <UserIcon className="text-blue-600 size-5" />
            </div>
            <div className="inline-flex flex-col">
              <div className="text-xs text-gray-400">NAMA</div>
              <div className="text-sm font-semibold">
                {`${gelar_depan} ${nama} ${gelar_belakang}`}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start px-3 py-4 border-b sm:flex-row">
          <div className="inline-flex items-center justify-start gap-x-4">
            <div className="p-2 rounded-lg bg-blue-50">
            <BriefcaseIcon className="text-blue-600 size-6" />
            </div>
            <div className="inline-flex flex-col">
              <div className="text-xs text-gray-400">JABATAN</div>
              <div className="text-sm font-semibold">{jabatan ?? "-"}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start sm:flex-row gap-x-8 gap-y-6 divide-x-1">
          <div className="inline-flex items-center justify-start flex-1 p-3 px-3 gap-x-4">
            <div className="p-2 rounded-lg bg-blue-50">
            <CalendarDaysIcon className="text-blue-600 size-6" />
            </div>
            <div className="inline-flex flex-col">
              <div className="text-xs text-gray-400">BULAN</div>
              <div className="text-sm font-semibold">{bulan ?? "-"}</div>
            </div>
          </div>
          <div className="inline-flex items-center justify-start flex-1 p-3 px-3 gap-x-4">
            <div className="p-2 rounded-lg bg-blue-50">
            <CalendarDaysIcon className="text-blue-600 size-6" />
            </div>
            <div className="inline-flex flex-col">
              <div className="text-xs text-gray-400">TAHUN</div>
              <div className="text-sm font-semibold">{tahun ?? "-"}</div>
            </div>
          </div>
        </div>
      </div>
      <DetailKalkulasi data={resultDataTpp?.data[0]} />
      {renderButtonKirim()}
    </>
  );
}
