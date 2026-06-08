import { formatRupiahManual, formatRupiahManualVersiDesember } from "@/helpers/cx";
import { terbilangRupiah } from "@/helpers/rupiah";
import { ChartBarIcon, BookmarkIcon, CalendarDaysIcon, MinusCircleIcon, CheckCircleIcon, CheckBadgeIcon, CalculatorIcon, BriefcaseIcon, Cog6ToothIcon, StarIcon, DocumentMinusIcon, ShieldCheckIcon, BuildingOffice2Icon } from "@heroicons/react/24/solid";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function DetailKalkulasi({ data }) {
    
    const {
    tpp_diterima,
    bulan,
    basic_bk,
    basic_pk,
    basic_kk,
    basic_kp,
    jml_pph,
    jml_iwp,
    jml_bpjs,
    jml_pot,
    total_kotor,
  } = data;

    return (
        <Accordion
          variant="light"
          defaultExpandedKeys={["1", "2"]}
          selectionMode="multiple"
        >
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title="Ringkasan TPP"
            startContent={<ChartBarIcon className="text-blue-600 size-6" />}
          >
            <div className="flex flex-col justify-start sm:flex-row gap-x-2 gap-y-8">
              <div className="inline-flex items-center justify-start flex-1 px-4 py-5 border border-blue-100 rounded-lg gap-x-4 bg-blue-50">
                <div className="p-2 bg-blue-100 rounded-full">
                  <CalendarDaysIcon className="text-blue-600 size-5" />
                </div>
                <div className="inline-flex flex-col">
                  <div className="text-xs text-gray-400">JUMLAH KOTOR</div>
                  <div className="text-lg font-semibold text-gray-600">
                    {formatRupiahManual(total_kotor) ?? "-"}
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center justify-start flex-1 px-4 py-3 border border-red-100 rounded-lg gap-x-4 bg-red-50">
                <div className="p-2 bg-red-100 rounded-full">
                  <MinusCircleIcon className="text-red-600 size-5" />
                </div>
                <div className="inline-flex flex-col">
                  <div className="text-xs text-gray-400">TOTAL POTONGAN</div>
                  <div className="text-lg font-semibold text-red-600">
                    {formatRupiahManual(jml_pot) ?? "-"}
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center justify-start flex-1 px-4 py-3 border border-green-100 rounded-lg bg-green-50 gap-x-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircleIcon className="text-green-500 size-5" />
                </div>
                <div className="inline-flex flex-col">
                  <div className="text-xs text-gray-400">TAKE HOME PAY</div>
                  <div className="text-lg font-semibold text-green-500">
                    {formatRupiahManual(tpp_diterima) ?? "-"}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-start w-full px-4 py-5 my-4 rounded-lg gap-x-4 bg-amber-50 border-amber-100">
              <div className="p-2 rounded-full bg-amber-100">
                <CheckBadgeIcon className="text-amber-600 size-5" />
              </div>
              <div className="inline-flex flex-col">
                <div className="text-xs text-gray-400">TERBILANG</div>
                <div className="text-sm italic text-black capitalize">
                  {terbilangRupiah(tpp_diterima) ?? "-"}
                </div>
              </div>
            </div>
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            title="Detail Kalkulasi TPP"
            startContent={<CalculatorIcon className="text-blue-600 size-6" />}
          >
            <div className="flex flex-col justify-start sm:flex-row gap-x-2 gap-y-2">
              <div className="inline-flex items-center justify-start flex-1 px-2 py-3 border rounded-lg bg-gray-50 gap-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <BriefcaseIcon className="text-blue-500 size-5" />
                </div>
                <div className="inline-flex flex-col">
                  <div className="text-xs text-gray-400">BEBAN KERJA</div>
                  <div className="font-semibold">
                    {formatRupiahManual(basic_bk) ?? "-"}
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center justify-start flex-1 px-2 py-3 border rounded-lg bg-gray-50 gap-x-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <BookmarkIcon className="text-purple-500 size-5" />
                </div>
                <div className="inline-flex flex-col">
                  <div className="text-xs text-gray-400">PRESTASI KERJA</div>
                  <div className="font-semibold">
                    {formatRupiahManual(basic_pk) ?? "-"}
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center justify-start flex-1 px-2 py-3 border rounded-lg bg-gray-50 gap-x-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <Cog6ToothIcon className="text-green-500 size-5" />
                </div>
                <div className="inline-flex flex-col">
                  <div className="text-xs text-gray-400">KONDISI KERJA</div>
                  <div className="font-semibold">
                    {formatRupiahManual(basic_kk) ?? "-"}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-start mt-2 sm:flex-row gap-x-2 gap-y-2">
              <div className="inline-flex items-center justify-start flex-1 px-2 py-3 border rounded-lg gap-x-3">
                <div className="p-2 rounded-full bg-amber-100">
                  <StarIcon className="text-amber-500 size-5" />
                </div>
                <div className="inline-flex flex-col">
                  <div className="text-xs text-gray-400 text-nowrap">
                    KELANGKAAN PROFESI
                  </div>
                  <div className="text-sm font-semibold">
                    {formatRupiahManual(basic_kp) ?? "-"}
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center justify-start flex-1 px-2 py-3 border rounded-lg gap-x-3">
                <div className="p-2 rounded-full bg-cyan-100">
                  <DocumentMinusIcon className="text-cyan-500 size-5" />
                </div>
                <div className="inline-flex flex-col">
                  <div className="text-xs text-gray-400">POT. PPH21</div>
                  <div className="text-sm font-semibold">
                    {formatRupiahManualVersiDesember(jml_pph, bulan) ?? "-"}
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center justify-start flex-1 px-2 py-3 border rounded-lg gap-x-3">
                <div className="p-2 bg-pink-100 rounded-full">
                  <ShieldCheckIcon className="text-pink-500 size-5" />
                </div>
                <div className="inline-flex flex-col">
                  <div className="text-xs text-gray-400">POT. BPJS</div>
                  <div className="text-sm font-semibold">
                    {formatRupiahManual(jml_bpjs) ?? "-"}
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center justify-start flex-1 px-2 py-3 border rounded-lg gap-x-3">
                <div className="p-2 rounded-full bg-lime-100">
                  <BuildingOffice2Icon className="text-lime-500 size-5" />
                </div>
                <div className="inline-flex flex-col">
                  <div className="text-xs text-gray-400">POT. IWP</div>
                  <div className="text-sm font-semibold">
                    {formatRupiahManual(jml_iwp) ?? "-"}
                  </div>
                </div>
              </div>
            </div>
          </AccordionItem>
        </Accordion>
    )
}