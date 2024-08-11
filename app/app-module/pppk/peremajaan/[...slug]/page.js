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
import { FormPeremajaan } from "@/components/forms/form-peremajaan-pppk";
import { getSatkerSigapok } from "@/dummy/sigapok-get-satker";
import { getSkpdSigapok } from "@/dummy/sigapok-get-skpd";
import { getJenisPegawaiSigapok } from "@/dummy/sigapok-get-jenispegawai";
import { getPangkatSigapok } from "@/dummy/sigapok-get-pangkat";
import { getStatusPegawaiSigapok } from "@/dummy/sigapok-get-statuspegawai";
import { getBankSigapok } from "@/dummy/sigapok-get-bank";

export default async function Page({ params, searchParams }) {
  const session = hasSessionServer("USER_GAPOK");
  const sigapok = useSessionServer("USER_GAPOK");
  if (session === false) {
    return redirect("/app-integrasi/dashboard");
  }
  const $getNip = decrypt(params?.slug[0], "bkpsdm");

  // const getSatker = await getSatkerSigapok(sigapok.access_token);
  const getSkpd = await getSkpdSigapok(sigapok.access_token);
  // const getJenisPegawai = await getJenisPegawaiSigapok(sigapok.access_token);
  // const getPangkat = await getPangkatSigapok(sigapok.access_token);
  const getStatusPegawai = await getStatusPegawaiSigapok(sigapok.access_token);
  // const getBank = await getBankSigapok(sigapok.access_token);

  const renderForm = () => {
    return (
      <FormPeremajaan
        skpds={getSkpd?.data}
        statuspegawais={getStatusPegawai?.data}
      />
    );
  };
  return (
    <>
      <div className="w-full bg-gray-100 dark:bg-slate-800 h-screen">
        <div className="max-w-6xl mx-auto">
          <Card shadow="none" className="max-h-screen overflow-y-auto">
            <CardHeader className="flex justify-between items-center">
              <div className="inline-flex items-center gap-4">
                <BtnBackNextUi goTo="/app-module/kgb" title="Kembali" />
                <div className="flex flex-col">
                  <p className="text-xl flex flex-col">
                    <span className="uppercase font-bold">
                      Peremajaan Data PPPK
                    </span>
                    <span className="text-base">{$getNip}</span>
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
