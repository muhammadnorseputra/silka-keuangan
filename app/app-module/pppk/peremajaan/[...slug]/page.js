import { BtnBackNextUi } from "@/components/button/btn-back";
import { FormPeremajaan } from "@/components/forms/form-peremajaan-pppk";
import { decrypt } from "@/helpers/encrypt";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { redirect } from "next/navigation";
import { hasSessionServer, getSessionServer } from "../../../server-session";
import { polaNIP } from "@/helpers/polanip";
import { ShowProfile } from "@/helpers/profile";

export default async function Page({ params }) {
  const session = hasSessionServer("USER_GAPOK");
  const sigapok = getSessionServer("USER_GAPOK");
  const session_silka = getSessionServer("USER_SILKA");
  if (session === false) {
    return redirect("/app-integrasi/dashboard");
  }
  const nipppk = decrypt(params?.slug[0], "bkpsdm");

  return (
    <>
      <div className="w-full h-screen bg-blue-400 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <Card
            radius="none"
            shadow="none"
            className="max-h-screen overflow-y-auto">
            <CardHeader className="flex items-center justify-between">
              <div className="inline-flex items-center gap-4">
                <BtnBackNextUi goTo="/app-module/kgb" title="Kembali" />
                <div className="flex flex-col">
                  <div className="flex flex-col text-xl">
                    <span className="font-bold uppercase">
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
