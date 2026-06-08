import { BtnBackNextUi } from "@/components/button/btn-back";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { hasSessionServer, getSessionServer } from "../../../server-session";
import { redirect } from "next/navigation";
import { decrypt } from "@/helpers/encrypt";
import { getPegawaiByNip } from "@/dummy/data-pegawai-by-nip";
import { BtnApprove } from "@/components/button/btn-approve";
import SigapokDataP3k from "./sigapok";
import SilkaDataP3k from "./silka";
import { ShowProfile } from "@/helpers/profile";

export const revalidate = 0;

export default async function Page({ params }) {
  const session = hasSessionServer("USER_GAPOK");
  const sigapok = getSessionServer("USER_GAPOK");
  const silkaonline = getSessionServer("USER_SILKA");
  if (session === false) {
    return redirect("/app-integrasi/dashboard");
  }
  const NIP = decrypt(params?.slug[0], "bkpsdm");

  return (
    <>
      <div className="w-full h-screen bg-blue-400 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <Card
            radius="none"
            shadow="lg"
            className="max-h-screen my-auto overflow-y-auto">
            <CardHeader className="flex items-center justify-between">
              <div className="inline-flex items-center gap-4">
                <BtnBackNextUi goTo="/app-module/kgb" title="Kembali" />
                <div className="flex flex-col">
                  <div className="flex flex-col text-xl">
                    <span className="font-bold uppercase">
                      Verifikasi & Validasi Data Peremajaan
                    </span>
                    <ShowProfile jenis="PPPK" nipnama={NIP}/>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col items-start justify-between md:flex-row gap-x-6 gap-y-3">
                {/* Get Data Silka PPPK */}
                <Card fullWidth>
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                      <p className="text-md">SILKa Online</p>
                      <p className="text-small text-default-500">
                        Data Verifikasi & Validasi Data Peremajaan
                      </p>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex flex-col px-8 py-8 gap-y-4">
                    <SilkaDataP3k {...sigapok} nip={NIP} />
                  </CardBody>
                </Card>
                {/* Get Data Sigapok PPPK */}
                <Card fullWidth>
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                      <p className="text-md">Sigapok Service</p>
                      <p className="text-small text-default-500">
                        Data Badan Keuangan Daerah (SIMGAJI)
                      </p>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex flex-col px-8 py-8 gap-y-4">
                    <SigapokDataP3k sigapok={sigapok} nip={NIP} />
                  </CardBody>
                </Card>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
