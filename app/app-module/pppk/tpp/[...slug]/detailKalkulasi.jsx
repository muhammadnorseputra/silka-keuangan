"use client";
import { formatRupiahManual } from "@/helpers/cx";
import { Accordion, AccordionItem } from "@nextui-org/react";
import React from "react";

function DetailKalkulasi({ data }) {
  const { basic_bk, basic_pk, basic_kk, basic_kp, jml_pph, jml_iwp, jml_bpjs } =
    data;
  return (
    <>
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
    </>
  );
}

export default DetailKalkulasi;
