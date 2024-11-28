"use client";

import { AlertDanger, AlertSuccess, AlertWarning } from "@/components/alert";
import { BtnKirimTPP } from "@/components/button/btn-tpp-kirim";
import { PlaceholderBar } from "@/components/skeleton/placeholder-bar";
import { getTppByNip } from "@/dummy/data-tpp-by-nip";
import { formatRupiahManual } from "@/helpers/cx";
import { polaNIP } from "@/helpers/polanip";
import { terbilangRupiah } from "@/helpers/rupiah";
import { useSession } from "@/lib/session";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
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
    queryKey: ["silka.tpp.nip", NIP],
    queryFn: async () => {
      const result = await getTppByNip(NIP);
      return result;
    },
  });

  if (isFetching || isPending) return <PlaceholderBar />;

  if (row.status === false) {
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
    jml_pph,
    jml_iwp,
    jml_bpjs,
  } = row?.data;

  const renderButtonKirim = () => {
    // jika sudah melakukan sinkronisasi
    if (row?.data.is_sync_simgaji === "1") return null;
    // jika status data tpp tidak sama dengan APPROVE dan CETAK
    if (row?.data.fid_status !== "4" && row?.data.fid_status !== "5")
      return null;
    // jika status data tpp sudah cetak
    if (row?.data.fid_status === "5") return null;
    // jika status data peremajaan masih verifikasi, entri, null
    if (
      row?.data.is_peremajaan === "VERIFIKASI" ||
      row?.data.is_peremajaan === "ENTRI" ||
      row?.data.is_peremajaan === null
    )
      return null;
    return (
      <>
        <Divider />
        <BtnKirimTPP {...sigapok} {...row?.data} silka={silka} />
      </>
    );
  };

  return (
    <>
      {row?.data.fid_status === "5" && (
        <AlertSuccess title="Perhatian">
          TPP sudah selesai cetak pada silka online.
        </AlertSuccess>
      )}
      {row?.data.fid_status !== "4" && row?.data.fid_status !== "5" && (
        <AlertDanger title="Perhatian">
          TPP masih dalam proses perhitungan atau belum disetujui.
        </AlertDanger>
      )}
      {row?.data.is_peremajaan === "VERIFIKASI" && (
        <AlertWarning title="Perhatian">
          Peremajaan data belum verifikasi oleh pengelola kepegawaian.
        </AlertWarning>
      )}
      {(row?.data.is_peremajaan === "ENTRI" ||
        row?.data.is_peremajaan === null) && (
        <AlertWarning
          title="Perhatian"
          message="Data Pegawai belum diremajakan, silahkan melakukan peremajaan data terlebih dahulu"
        />
      )}
      <div className="inline-flex flex-col sm:flex-row justify-start gap-x-8 gap-y-8">
        <div>
          <div className="text-gray-400">NIP</div>
          <div className="font-bold">{polaNIP(nip) ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">NAMA</div>
          <div className="font-bold">
            {`${gelar_depan} ${nama} ${gelar_belakang}`}
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
      <Accordion
        variant="bordered"
        defaultExpandedKeys={["1", "2"]}
        selectionMode="multiple">
        <AccordionItem key="1" aria-label="Accordion 1" title="Take Home Pay">
          <div className="mb-3">
            <div className="text-gray-400">JUMLAH TPP DI TERIMA</div>
            <div className="font-bold text-green-600 text-2xl">
              {formatRupiahManual(tpp_diterima) ?? "-"}
            </div>
          </div>
          <div>
            <div className="text-gray-400">TERBILANG</div>
            <div className="font-bold text-gray-400 italic uppercase">
              {terbilangRupiah(tpp_diterima) ?? "-"}
            </div>
          </div>
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Accordion 2"
          title="Detail Kalkulasi TPP">
          <div className="inline-flex flex-col sm:flex-row justify-start gap-x-12 gap-y-8">
            <div>
              <div className="text-gray-400">BEBAN KERJA</div>
              <div className="font-bold">
                {formatRupiahManual(basic_bk) ?? "-"}
              </div>
            </div>
            <div>
              <div className="text-gray-400">PRESTASI KERJA</div>
              <div className="font-bold">
                {formatRupiahManual(basic_pk) ?? "-"}
              </div>
            </div>
            <div>
              <div className="text-gray-400">KONDISI KERJA</div>
              <div className="font-bold">
                {formatRupiahManual(basic_kk) ?? "-"}
              </div>
            </div>
          </div>
          <div className="inline-flex flex-col sm:flex-row justify-start gap-x-6 gap-y-8 mt-4">
            <div>
              <div className="text-gray-400">KELANGKAAN PROFESI</div>
              <div className="font-bold">
                {formatRupiahManual(basic_kp) ?? "-"}
              </div>
            </div>
            <div>
              <div className="text-gray-400">PPH21</div>
              <div className="font-bold">
                {formatRupiahManual(jml_pph) ?? "-"}
              </div>
            </div>
            <div>
              <div className="text-gray-400">IWP</div>
              <div className="font-bold">
                {formatRupiahManual(jml_iwp) ?? "-"}
              </div>
            </div>
          </div>
          <div className="inline-flex flex-col sm:flex-row justify-start gap-x-6 gap-y-8 mt-4">
            <div>
              <div className="text-gray-400">BPJS</div>
              <div className="font-bold">
                {formatRupiahManual(jml_bpjs) ?? "-"}
              </div>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
      {renderButtonKirim()}
    </>
  );
}
