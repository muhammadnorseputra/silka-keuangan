import DetailKalkulasi from "@/app/app-module/pppk/tpp/[...slug]/detailKalkulasi";
import { useSessionServer } from "@/app/app-module/server-session";
import { AlertDanger, AlertSuccess, AlertWarning } from "@/components/alert";
import { BtnBackNextUi } from "@/components/button/btn-back";
import { BtnKirimTPP } from "@/components/button/btn-tpp-kirim";
import { getTppByNip } from "@/dummy/data-tpp-by-nip";
import { getNamaBulan } from "@/helpers/cx";
import { polaNIP } from "@/helpers/polanip";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { useCallback } from "react";
import { ExclamationCircle } from "react-bootstrap-icons";

async function ApprovalTpp() {
  const silka = useSessionServer("USER_SILKA");
  const sigapok = useSessionServer("USER_SIGAPOK");
  const resultDataTpp = await getTppByNip(silka?.data.nip);

  const {
    nip,
    nama,
    gelar_depan,
    gelar_belakang,
    jabatan,
    tahun,
    bulan,
    fid_status,
  } = resultDataTpp?.data;

  const renderActionKirim = () => {
    if (resultDataTpp?.data.is_sync_simgaji === "1") return null;
    if (
      resultDataTpp?.data.fid_status !== "4" &&
      resultDataTpp?.data.fid_status !== "5"
    )
      return null;

    if (resultDataTpp?.data.fid_status === "5") return null;

    return (
      <div className="inline-flex w-full justify-between items-center gap-x-3">
        <BtnKirimTPP
          {...sigapok}
          {...resultDataTpp?.data}
          silka={silka}
          fullWidth
        />
      </div>
    );
  };

  if (resultDataTpp.status === false) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <ExclamationCircle className="size-8" />
        <p className="text-gray-400">{resultDataTpp.message}</p>
      </div>
    );
  }

  return (
    <>
      <Card shadow="sm" className="max-w-3xl mx-auto my-5">
        <CardHeader className="flex justify-start gap-x-4 items-center bg-white border-b border-gray-200 dark:border-blue-700 dark:bg-blue-900 rounded-t-xl">
          <BtnBackNextUi />
          <div>
            <h2 className="text-lg font-bold">Approval TPP</h2>
            <p className="text-gray-400">
              Data TPP pada SILKa Periode {getNamaBulan(bulan)} {tahun}
            </p>
          </div>
          {resultDataTpp?.data.is_sync_simgaji === "1" && (
            <CheckBadgeIcon className="size-10 text-green-600 ms-auto" />
          )}
        </CardHeader>
        <CardBody>
          {resultDataTpp?.data.is_sync_simgaji !== "1" && (
            <AlertDanger
              title="Perhatian"
              message="TPP belum tersenkronisasi dengan Badan Keuangan Daerah, silahkan kirim data."
            />
          )}
          {resultDataTpp?.data.fid_status !== "4" &&
            resultDataTpp?.data.fid_status !== "5" && (
              <AlertWarning
                title="Perhatian"
                message="TPP masih dalam proses perhitungan atau belum disetujui."
              />
            )}
          {resultDataTpp?.data.fid_status === "5" && (
            <AlertSuccess title="Perhatian">
              TPP sudah selesai cetak pada SILKa Online.
            </AlertSuccess>
          )}
          <div className="flex flex-col gap-3 mt-3 p-5">
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
          </div>
          <DetailKalkulasi data={resultDataTpp?.data} />
        </CardBody>
        <CardFooter className="w-full justify-end items-start bg-gray-100 dark:bg-blue-900 rounded-b-xl">
          {renderActionKirim()}
        </CardFooter>
      </Card>
    </>
  );
}

export default ApprovalTpp;
