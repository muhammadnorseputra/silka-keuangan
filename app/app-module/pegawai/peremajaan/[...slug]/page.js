import { BtnBackNextUi } from "@/components/button/btn-back";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { hasSessionServer, useSessionServer } from "../../../server-session";
import { redirect } from "next/navigation";
import { decrypt } from "@/helpers/encrypt";
import { FormPeremajaan } from "@/components/forms/form-peremajaan";
import { getSatkerSigapok } from "@/dummy/sigapok-get-satker";
import { getSkpdSigapok } from "@/dummy/sigapok-get-skpd";
import { getJenisPegawaiSigapok } from "@/dummy/sigapok-get-jenispegawai";
import { getPangkatSigapok } from "@/dummy/sigapok-get-pangkat";
import { getStatusPegawaiSigapok } from "@/dummy/sigapok-get-statuspegawai";
import { getBankSigapok } from "@/dummy/sigapok-get-bank";
import { getPegawaiByNip } from "@/dummy/data-pegawai-by-nip";
import { Error500 } from "@/components/errors/500";
export const revalidate = 0;

export default async function Page({ params, searchParams }) {
  const session = hasSessionServer("USER_GAPOK");
  const sigapok = useSessionServer("USER_GAPOK");
  if (session === false) {
    return redirect("/app-integrasi/dashboard");
  }
  const getNip = decrypt(params?.slug[0], "bkpsdm");

  const getPegawais = await getPegawaiByNip(getNip);

  const { nama, nip, gelar_depan, gelar_belakang } = getPegawais;
  const renderForm = () => {
    if (getPegawais.status === false) {
      return <Error500 />;
    }

    return <FormPeremajaan sigapok={sigapok} pegawais={getPegawais} />;
  };

  return (
    <>
      <div className="w-full bg-gray-100  dark:bg-gray-900 h-screen">
        <div className="max-w-6xl mx-auto">
          <Card shadow="none" className="max-h-screen overflow-y-auto">
            <CardHeader className="flex justify-between items-center">
              <div className="inline-flex items-center gap-4">
                <BtnBackNextUi goTo="/app-module/kgb" title="Kembali" />
                <div className="flex flex-col">
                  <p className="text-xl flex flex-col">
                    <span className="uppercase font-bold">
                      Peremajaan Data Pegawai
                    </span>
                    <span className="text-base">
                      {gelar_depan} {nama} {gelar_belakang} {nip}
                    </span>
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody>{renderForm()}</CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
