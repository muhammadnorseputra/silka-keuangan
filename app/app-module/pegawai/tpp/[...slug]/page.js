// @ts-nocheck
import { BtnBackNextUi } from "@/components/button/btn-back";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { hasSessionServer } from "../../../server-session";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { PlaceholderBar } from "@/components/skeleton/placeholder-bar";
import RenderSilkaService from "./silka";
import RenderGapokServices from "./sigapok";

export const revalidate = 0;

export default async function Page({ params }) {
  const session = hasSessionServer("USER_GAPOK");
  if (session === false) {
    return redirect("/app-integrasi/dashboard");
  }

  return (
    <>
      <div className="w-full bg-blue-500 dark:bg-slate-800 h-screen">
        <div className="max-w-6xl mx-auto">
          <Card
            shadow="lg"
            radius="none"
            className="max-h-screen overflow-y-auto my-auto h-screen">
            <CardHeader className="flex justify-between items-center">
              <div className="inline-flex items-center gap-4">
                <BtnBackNextUi goTo="/app-module/kgb" title="Kembali" />
                <div className="flex flex-col">
                  <p className="text-xl flex flex-col">
                    <span className="uppercase font-bold">
                      Tambahan Penghasilan Pegawai
                    </span>
                    {/* <span className="text-base">{namalengkap}</span> */}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col md:flex-row justify-between items-start gap-x-6 gap-y-3">
                {/* Get Data Silka */}
                <Card fullWidth>
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                      <p className="text-md">SILKa Online</p>
                      <p className="text-small text-default-500">
                        Data Tambahan Penghasilan Pegawai
                      </p>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex flex-col gap-y-8 px-8 py-8">
                    <Suspense fallback={<PlaceholderBar />}>
                      <RenderSilkaService {...params} />
                    </Suspense>
                  </CardBody>
                </Card>
                {/* Get Data Gapok */}
                <Card fullWidth>
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                      <p className="text-md">Sigapok</p>
                      <p className="text-small text-default-500">
                        Data Badan Keuangan Daerah
                      </p>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex flex-col gap-y-8 px-8 py-8">
                    <Suspense fallback={<PlaceholderBar />}>
                      <RenderGapokServices {...params} />
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
