import { BtnBackNextUi } from "@/components/button/btn-back";
import { FormPeremajaan } from "@/components/forms/form-peremajaan-pppk";
import { decrypt } from "@/helpers/encrypt";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { redirect } from "next/navigation";
import { hasSessionServer, useSessionServer } from "../../../server-session";
import { polaNIP } from "@/helpers/polanip";

export default async function Page({ params }) {
  const session = hasSessionServer("USER_GAPOK");
  const sigapok = useSessionServer("USER_GAPOK");
  if (session === false) {
    return redirect("/app-integrasi/dashboard");
  }
  const nipppk = decrypt(params?.slug[0], "bkpsdm");

  return (
    <>
      <div className="w-full bg-blue-500 dark:bg-slate-800 h-screen">
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
                    <span className="text-base">{polaNIP(nipppk)} </span>
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <FormPeremajaan sigapok={sigapok} nipppk={nipppk} />
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
