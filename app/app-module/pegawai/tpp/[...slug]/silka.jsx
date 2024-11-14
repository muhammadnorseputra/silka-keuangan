"use client";

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
    if (row?.data.fid_status !== "4" && row?.data.fid_status !== "5") {
      return (
        <p className="text-red-500 border-1 border-red-500 p-2 hover:cursor-not-allowed select-none inline-flex items-center justify-center gap-x-2">
          <InformationCircleIcon className="size-5 text-red-300" />
          TPP masih dalam proses perhitungan atau belum disetujui.
        </p>
      );
    }

    if (row?.data.fid_status === "5") {
      return (
        <>
          <p className="text-green-500 border-t-1 border-dashed border-green-500 px-2 py-4 hover:cursor-not-allowed select-none inline-flex items-center justify-center gap-x-2">
            <InformationCircleIcon className="size-5 text-green-500" />
            TPP sudah selesai cetak
          </p>
        </>
      );
    }
    if (row?.data.is_sync_simgaji === "1") return null;
    return (
      <>
        <Divider />
        <BtnKirimTPP {...sigapok} {...row?.data} silka={silka} />
      </>
    );
  };

  return (
    <>
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
      <Accordion variant="bordered" defaultExpandedKeys={["1"]}>
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
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
      <div className="border-t border-dashed border-green-600 pt-3">
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
      {renderButtonKirim()}
    </>
  );
}
