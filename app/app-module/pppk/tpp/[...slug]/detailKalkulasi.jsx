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
    jml_pph,
    jml_iwp,
    jml_bpjs,
  } = data;
  return (
    <>
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
          <div className="flex flex-col sm:flex-row justify-start gap-x-6 gap-y-8 mt-4">
            <div>
              <div className="text-gray-400">BPJS</div>
              <div className="font-bold">
                {formatRupiahManual(jml_bpjs) ?? "-"}
              </div>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default DetailKalkulasi;
