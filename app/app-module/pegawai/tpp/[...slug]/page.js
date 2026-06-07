// @ts-nocheck
import { BtnBackNextUi } from "@/components/button/btn-back";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { hasSessionServer, getSessionServer } from "../../../server-session";
import { redirect } from "next/navigation";
import RenderSilkaService from "./silka";
import RenderGapokServices from "./sigapok";
import { ShowProfile } from "@/helpers/profile";
import { decrypt } from "@/helpers/encrypt";
import { Suspense } from "react";
import { PlaceholderBar } from "@/components/skeleton/placeholder-bar";
import { BtnRefreshQuery } from "@/components/button/btn-reload";

export const revalidate = 0;

export default async function Page({ params }) {
  const session = hasSessionServer("USER_GAPOK");
  const sigapok = await getSessionServer("USER_GAPOK");
  if (session === false) {
    return redirect("/app-integrasi/dashboard");
  }

  const NIP = decrypt(params?.slug[0], "bkpsdm");
  return (
    <>
      <div className="w-full h-screen bg-blue-400 dark:bg-slate-800">
        <div className="mx-auto">
          <Card
            shadow="none"
            radius="none"
            className="h-screen max-h-screen my-auto overflow-y-auto">
            <CardHeader className="flex items-center justify-between">
              <div className="inline-flex items-center gap-4">
                <BtnBackNextUi goTo="/app-module/kgb" title="Kembali" />
                <div className="flex flex-col">
                  <div className="flex flex-col text-xl">
                    <span className="font-bold uppercase">
                      Tambahan Penghasilan Pegawai
                    </span>
                    <ShowProfile jenis="PNS" nipnama={NIP} />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col items-start justify-between md:flex-row gap-x-6 gap-y-3">
                {/* Get Data Silka */}
                <Card fullWidth>
                  <CardHeader className="flex items-center justify-between gap-3 bg-blue-50">
                    <div className="flex flex-col">
                      <p className="text-md dark:text-blue-900">SILKa Online</p>
                      <p className="text-small text-default-500">
                        Data Tambahan Penghasilan Pegawai
                      </p>
                    </div>
                    <BtnRefreshQuery queryKey={["silka.tpp.nip", NIP]} />
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex flex-col px-8 py-8 gap-y-4">
                    <RenderSilkaService nip={NIP} sigapok={sigapok} />
                  </CardBody>
                </Card>
                {/* Get Data Gapok */}
                <Card fullWidth>
                  <CardHeader className="flex gap-3 bg-amber-100">
                    <div className="flex flex-col">
                      <p className="text-md dark:text-amber-900">Sigapok</p>
                      <p className="text-small text-default-500">
                        Data Badan Keuangan Daerah
                      </p>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex flex-col px-8 py-8 gap-y-8">
                    <Suspense fallback={<PlaceholderBar />}>
                      <RenderGapokServices nip={NIP} sigapok={sigapok} />
                    </Suspense>
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
