"use client";

import { AlertDanger, AlertSuccess, AlertWarning } from "@/components/alert";
import { BtnKirimTPP } from "@/components/button/btn-tpp-kirim";
import { PlaceholderBar } from "@/components/skeleton/placeholder-bar";
import { getTppByNip } from "@/dummy/data-tpp-by-nip-v2";
import {
  formatRupiahManual,
  formatRupiahManualVersiDesember,
} from "@/helpers/cx";
import { polaNIP } from "@/helpers/polanip";
import { terbilangRupiah } from "@/helpers/rupiah";
import { useSession } from "@/lib/session";
import {
  IdentificationIcon,
  UserIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import { Accordion, AccordionItem, Divider } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { ExclamationCircle } from "react-bootstrap-icons";

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
  const {
    nip,
    nama,
    gelar_depan,
    gelar_belakang,
    jabatan,
    tpp_diterima,
    tahun,
    bulan,
    basic_bk,
    basic_pk,
    basic_kk,
    basic_kp,
    real_bk,
    real_pk,
    real_kk,
    real_tb,
    real_kp,
    jml_pph,
    jml_iwp,
    jml_bpjs,
    jml_pot,
    total_kotor,
  } = row?.data[0];

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
      {row?.data[0].fid_status === "5" && (
        <AlertSuccess title="Perhatian">
          TPP sudah selesai cetak pada silka online.
        </AlertSuccess>
      )}
      {row?.data[0].fid_status !== "4" && row?.data[0].fid_status !== "5" && (
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
      {(row?.data[0].is_peremajaan === "ENTRI" ||
        row?.data[0].is_peremajaan === null) && (
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
      <Accordion
        variant="bordered"
        defaultExpandedKeys={["1", "2"]}
        selectionMode="multiple"
      >
        <AccordionItem key="1" aria-label="Accordion 1" title="Take Home Pay">
          <div className="inline-flex flex-col justify-start sm:flex-row gap-x-6 gap-y-8">
            <div>
              <div className="text-gray-400">JUMLAH KOTOR</div>
              <div className="text-xl font-bold text-gray-600">
                {formatRupiahManual(total_kotor) ?? "-"}
              </div>
            </div>
            <div>
              <div className="text-gray-400">TOTAL POTONGAN</div>
              <div className="text-xl font-bold text-red-600">
                {formatRupiahManual(jml_pot) ?? "-"}
              </div>
            </div>
          </div>
          <div className="pt-3 mt-3 mb-3 border-t border-gray-200 border-dashed">
            <div className="text-gray-400">JUMLAH TPP DI TERIMA</div>
            <div className="text-2xl font-bold text-green-600">
              {formatRupiahManual(tpp_diterima) ?? "-"}
            </div>
          </div>
          <div className="mb-3">
            <div className="text-gray-400">TERBILANG</div>
            <div className="italic font-bold text-gray-400 uppercase">
              {terbilangRupiah(tpp_diterima) ?? "-"}
            </div>
          </div>
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Accordion 2"
          title="Detail Kalkulasi TPP"
        >
          <div className="inline-flex flex-col justify-start sm:flex-row gap-x-12 gap-y-8">
            <div>
              <div className="text-gray-400">BEBAN KERJA</div>
              <div className="font-bold">
                {formatRupiahManual(real_bk) ?? "-"}
              </div>
            </div>
            <div>
              <div className="text-gray-400">PRESTASI KERJA</div>
              <div className="font-bold">
                {formatRupiahManual(real_pk) ?? "-"}
              </div>
            </div>
            <div>
              <div className="text-gray-400">KONDISI KERJA</div>
              <div className="font-bold">
                {formatRupiahManual(real_kk) ?? "-"}
              </div>
            </div>
          </div>
          <div className="inline-flex flex-col justify-start mt-4 sm:flex-row gap-x-6 gap-y-8">
            <div>
              <div className="text-gray-400">KELANGKAAN PROFESI</div>
              <div className="font-bold">
                {formatRupiahManual(real_kp) ?? "-"}
              </div>
            </div>
          </div>
          <div className="inline-flex flex-col justify-start mt-4 sm:flex-row gap-x-6 gap-y-8">
            <div>
              <div className="text-gray-400">POT. BPJS</div>
              <div className="font-bold">
                {formatRupiahManual(jml_bpjs) ?? "-"}
              </div>
            </div>

            <div>
              <div className="text-gray-400">POT. PPH21</div>
              <div className="font-bold">
                {formatRupiahManualVersiDesember(jml_pph, bulan) ?? "-"}
              </div>
            </div>
            <div>
              <div className="text-gray-400">POT. IWP</div>
              <div className="font-bold">
                {formatRupiahManual(jml_iwp) ?? "-"}
              </div>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
      {renderButtonKirim()}
    </>
  );
}
