import { formatTanggalIndonesia, formatRupiah } from "@/helpers/cx";
import {
  ArrowTrendingUpIcon,
  BanknotesIcon,
  ChartBarIcon,
  HashtagIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { Card, CardHeader, Divider, CardBody } from "@nextui-org/react";

export async function GapokByPangkat({ props }) {
  const { pangkat_nama, golru_nama } = props;
  const { tmt_gapok, masa_kerja, gapok } = props.resGapok;
  return (
    <div className="flex mb-3">
      <Card
        shadow="none"
        fullWidth
        className="border-dashed border-1 border-green-400">
        <CardHeader className="bg-green-100">
          <div className="flex flex-col">
            <p className="text-md font-bold dark:text-green-800">
              Informasi Gaji pada INEXIS
            </p>
            <p className="text-small text-default-500">
              Berdasarkan Pangkat dan Masa Kerja.
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col">
          <div className="inline-flex flex-row justify-around gap-x-14">
            <div>
              <div className="inline-flex gap-2 text-gray-400">
                <SparklesIcon className="size-6" />
                PANGKAT
              </div>
              <div className="font-bold">{pangkat_nama}</div>
            </div>
            <div>
              <div className="inline-flex gap-2 text-gray-400">
                <ChartBarIcon className="size-6" />
                GOLRU
              </div>
              <div className="font-bold">{golru_nama}</div>
            </div>
            <div>
              <div className="inline-flex gap-2 text-gray-400">
                <ArrowTrendingUpIcon className="size-6" /> MASA KERJA
              </div>
              <div className="font-bold">{masa_kerja} Tahun</div>
            </div>
            <div>
              <div className="inline-flex gap-2 text-gray-400">
                <BanknotesIcon className="size-6" />
                GAPOK
              </div>
              <div className="font-bold">{formatRupiah(gapok)}</div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
