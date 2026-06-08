"use client";

import {
  AlertDanger,
  AlertInfo,
  AlertSuccess,
  AlertWarning,
} from "@/components/alert";
import { BtnKirimTPP } from "@/components/button/btn-tpp-kirim";
import { PlaceholderBar } from "@/components/skeleton/placeholder-bar";
import { getTppByNip } from "@/dummy/data-tpp-by-nip-v2";
import { polaNIP } from "@/helpers/polanip";
import { useSession } from "@/lib/session";
import {
  IdentificationIcon,
  UserIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import { Divider } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { ExclamationCircle } from "react-bootstrap-icons";
import DetailKalkulasi from "./detailKalkulasi";

export default function RenderSilkaService({ nip: NIP, sigapok }) {
  const silka = useSession("USER_SILKA");
  const {
    data: row,
    isFetching,
    isPending,
  } = useQuery({
    queryKey: ["silka.tpp.nip", NIP, silka?.access_token],
    queryFn: async () => {
      const result = await getTppByNip(NIP, silka?.access_token);
      return result;
    },
  });

  if (isFetching || isPending) return <PlaceholderBar />;

  if (!row.status) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <ExclamationCircle className="size-8" />
        <p className="text-gray-400">{row.message}</p>
      </div>
    );
  }
  const { nip, nama, gelar_depan, gelar_belakang, jabatan, tahun, bulan } =
    row?.data[0];

  const renderButtonKirim = () => {
    // jika sudah melakukan sinkronisasi
    if (row?.data[0].is_sync_simgaji === "1") return;
    // jika status data tpp tidak sama dengan APPROVE dan CETAK
    if (!["4", "5"].includes(row?.data[0].fid_status)) return;
    // jika status data tpp sudah cetak
    if (row?.data[0].fid_status === "5") return;
    // jika status data peremajaan masih verifikasi, entri, null
    if (["VERIFIKASI", "ENTRI", null].includes(row?.data[0].is_peremajaan))
      return;
    return (
      <>
        <Divider />
        <BtnKirimTPP {...sigapok} {...row?.data[0]} silka={silka} />
      </>
    );
  };

  return (
    <>
      {row?.data[0].is_sync_simgaji !== "1" && (
        <AlertInfo title="Informasi">
          TPP belum dikirim, silahkan kirim data
        </AlertInfo>
      )}
      {row?.data[0].fid_status === "5" && (
        <AlertSuccess title="Perhatian">
          TPP sudah selesai cetak pada silka online.
        </AlertSuccess>
      )}
      {!["4", "5"].includes(row?.data[0].fid_status) && (
        <AlertDanger
          title="Perhatian"
          message="TPP masih dalam proses perhitungan atau belum disetujui."
        />
      )}
      {row?.data[0].is_peremajaan === "VERIFIKASI" && (
        <AlertWarning title="Perhatian">
          Peremajaan data belum verifikasi oleh pengelola kepegawaian.
        </AlertWarning>
      )}
      {["ENTRI", null].includes(row?.data[0].is_peremajaan) && (
        <AlertWarning
          title="Perhatian"
          message="Data Pegawai belum diremajakan, silahkan melakukan peremajaan data terlebih dahulu"
        />
      )}
      <div className="flex flex-col border border-gray-200 rounded-lg shadow">
        <div className="flex flex-col justify-start sm:flex-row divide-x-1">
          <div className="inline-flex items-center justify-start flex-1 p-3 border-b gap-x-4">
            <div className="p-2 rounded-lg bg-blue-50">
              <IdentificationIcon className="text-blue-600 size-6" />
            </div>
            <div className="inline-flex flex-col">
              <div className="text-xs text-gray-400">NIP</div>
              <div className="text-sm font-semibold">{polaNIP(nip) ?? "-"}</div>
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
      <DetailKalkulasi data={row?.data[0]} />
      {renderButtonKirim()}
    </>
  );
}
