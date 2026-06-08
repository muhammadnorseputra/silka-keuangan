import { BtnBackNextUi } from "@/components/button/btn-back";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { getSessionServer } from "../../../server-session";
import { decrypt } from "@/helpers/encrypt";
import { FormPeremajaan } from "@/components/forms/form-peremajaan";
import { ShowProfile } from "@/helpers/profile";

export default async function Page({ params }) {
  const sigapok = await getSessionServer("USER_GAPOK");
  const silka = await getSessionServer("USER_PEGAWAI");

  const nip = decrypt(params?.slug[0], "bkpsdm");

  return (
    <>
      <div className="w-full h-screen bg-blue-400 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <Card
            radius="none"
            shadow="lg"
            className="max-h-screen overflow-y-auto">
            <CardHeader className="flex flex-col items-start justify-between gap-y-3">
              <div className="inline-flex items-start gap-4">
                <BtnBackNextUi goTo="/app-module/kgb" title="Kembali" />
                <div className="flex flex-col">
                  <div className="flex flex-col text-xl">
                    <span className="font-bold uppercase">
                      Peremajaan Data Pegawai
                    </span>
                    <ShowProfile jenis="PNS" nipnama={nip} />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody className="h-screen overflow-y-auto">
              <FormPeremajaan sigapok={sigapok} silka={silka} nip={nip} />
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
