import { BtnBackNextUi } from "@/components/button/btn-back";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useSessionServer } from "../../../server-session";
import { decrypt } from "@/helpers/encrypt";
import { FormPeremajaan } from "@/components/forms/form-peremajaan";
import { ShowProfile } from "@/helpers/profile";

export default async function Page({ params }) {
  const sigapok = await useSessionServer("USER_GAPOK");
  const silka = await useSessionServer("USER_PEGAWAI");

  const nip = decrypt(params?.slug[0], "bkpsdm");

  return (
    <>
      <div className="w-full bg-blue-500  dark:bg-gray-900 h-screen">
        <div className="max-w-6xl mx-auto">
          <Card
            radius="none"
            shadow="lg"
            className="max-h-screen overflow-y-auto">
            <CardHeader className="flex flex-col justify-between items-start gap-y-3">
              <div className="inline-flex items-start gap-4">
                <BtnBackNextUi goTo="/app-module/kgb" title="Kembali" />
                <div className="flex flex-col">
                  <div className="text-xl flex flex-col">
                    <span className="uppercase font-bold">
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
