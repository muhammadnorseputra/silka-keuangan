import { BtnBackNextUi } from "@/components/button/btn-back";
import { FormPeremajaan } from "@/components/forms/form-peremajaan-pppk";
import { decrypt } from "@/helpers/encrypt";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { redirect } from "next/navigation";
import { hasSessionServer, useSessionServer } from "../../../server-session";
import { polaNIP } from "@/helpers/polanip";
import { ShowProfile } from "@/helpers/profile";

export default async function Page({ params }) {
  const session = hasSessionServer("USER_GAPOK");
  const sigapok = useSessionServer("USER_GAPOK");
  const session_silka = useSessionServer("USER_SILKA");
  if (session === false) {
    return redirect("/app-integrasi/dashboard");
  }
  const nipppk = decrypt(params?.slug[0], "bkpsdm");

  return (
    <>
      <div className="w-full bg-blue-500 dark:bg-slate-800 h-screen">
        <div className="max-w-6xl mx-auto">
          <Card
            radius="none"
            shadow="none"
            className="max-h-screen overflow-y-auto">
            <CardHeader className="flex justify-between items-center">
              <div className="inline-flex items-center gap-4">
                <BtnBackNextUi goTo="/app-module/kgb" title="Kembali" />
                <div className="flex flex-col">
                  <div className="text-xl flex flex-col">
                    <span className="uppercase font-bold">
                      Peremajaan Data PPPK
                    </span>
                    <ShowProfile jenis="PPPK" nipnama={nipppk} />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <FormPeremajaan
                sigapok={sigapok}
                nipppk={nipppk}
                session_silka={session_silka}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
