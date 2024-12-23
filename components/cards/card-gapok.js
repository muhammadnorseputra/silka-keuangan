import { formatTanggalIndonesia, formatRupiah } from "@/helpers/cx";
import { Card, CardHeader, Divider, CardBody } from "@nextui-org/react";

export async function GapokByPangkat({ props }) {
  const { pangkat_nama, golru_nama } = props;
  const { tmt_gapok, masa_kerja, gapok } = props.resGapok;
  return (
    <div className="flex mb-3">
      <Card fullWidth>
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
              <div className="text-gray-400">TMT GAPOK</div>
              <div className="font-bold">
                {formatTanggalIndonesia(tmt_gapok)}
              </div>
            </div>
            <div>
              <div className="text-gray-400">PANGKAT PEGAWAI</div>
              <div className="font-bold">
                {pangkat_nama} ({golru_nama})
              </div>
            </div>
            <div>
              <div className="text-gray-400">MASA KERJA</div>
              <div className="font-bold">{masa_kerja} Tahun</div>
            </div>
            <div>
              <div className="text-gray-400">GAPOK</div>
              <div className="font-bold">{formatRupiah(gapok)}</div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
