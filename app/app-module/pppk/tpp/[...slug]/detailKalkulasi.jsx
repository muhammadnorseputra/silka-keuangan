"use client";
import { formatRupiahManual } from "@/helpers/cx";
import { terbilangRupiah } from "@/helpers/rupiah";
import { Accordion, AccordionItem } from "@nextui-org/react";
import React from "react";

function DetailKalkulasi({ data }) {
  const {
    tpp_diterima,
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
  } = data;
  return (
    <>
      <Accordion
        variant="bordered"
        defaultExpandedKeys={["1", "2"]}
        selectionMode="multiple">
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
          <div>
            <div className="text-gray-400">TERBILANG</div>
            <div className="italic font-bold text-gray-400 uppercase">
              {terbilangRupiah(tpp_diterima) ?? "-"}
            </div>
          </div>
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Accordion 2"
          title="Detail Kalkulasi TPP">
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
            <div>
              <div className="text-gray-400">KELANGKAAN PROFESI</div>
              <div className="font-bold">
                {formatRupiahManual(real_kp) ?? "-"}
              </div>
            </div>
          </div>
          <div className="inline-flex flex-col justify-start mt-4 sm:flex-row gap-x-6 gap-y-8">
            <div>
              <div className="text-gray-400">POT. PPH21</div>
              <div className="font-bold">
                {formatRupiahManual(jml_pph) ?? "-"}
              </div>
            </div>
            <div className="flex flex-col justify-start mt-4 sm:flex-row gap-x-6 gap-y-8">
              <div>
                <div className="text-gray-400">POT. BPJS</div>
                <div className="font-bold">
                  {formatRupiahManual(jml_bpjs) ?? "-"}
                </div>
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
    </>
  );
}

export default DetailKalkulasi;
