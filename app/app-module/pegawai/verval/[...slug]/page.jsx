import { BtnBackNextUi } from "@/components/button/btn-back";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useSessionServer } from "../../../server-session";
import { decrypt } from "@/helpers/encrypt";
import VervalSigapokPegawai from "./sigapok";
import VervalSilkaPegawai from "./silka";
import { ShowProfile } from "@/helpers/profile";
import { BtnRefreshQuery } from "@/components/button/btn-reload";
export const revalidate = 0;

export default async function Page({ params }) {
  const sigapok = await useSessionServer("USER_GAPOK");
  const silkaonline = await useSessionServer("USER_SILKA");

  const NIP = decrypt(params?.slug[0], "bkpsdm");

  return (
    <>
      <div className="w-full bg-blue-500 dark:bg-slate-800 h-screen">
        <div className="max-w-6xl mx-auto">
          <Card
            radius="none"
            shadow="lg"
            className="max-h-screen overflow-y-auto my-auto">
            <CardHeader className="flex justify-between items-center">
              <div className="inline-flex items-center gap-4">
                <BtnBackNextUi goTo="/app-module/kgb" title="Kembali" />
                <div className="flex flex-col">
                  <div className="text-xl flex flex-col">
                    <span className="uppercase font-bold">
                      Verifikasi & Validasi Data Peremajaan
                    </span>
                    <ShowProfile jenis="PNS" nipnama={NIP} />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col md:flex-row justify-between items-start gap-x-6 gap-y-3">
                {/* Get Data Silka */}
                <Card fullWidth className="lg:sticky top-0">
                  <CardHeader className="flex justify-between items-center gap-3">
                    <div className="flex flex-col">
                      <p className="text-md">SILKa Online</p>
                      <p className="text-small text-default-500">
                        Data Verifikasi & Validasi Data Peremajaan
                      </p>
                    </div>
                    <BtnRefreshQuery queryKey={["verval.silka.pegawai", NIP]} />
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex flex-col gap-y-4 pb-8">
                    <VervalSilkaPegawai
                      sigapok={sigapok}
                      silka={silkaonline}
                      nip={NIP}
                    />
                  </CardBody>
                </Card>
                {/* Get Data Sigapok */}
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
                  <CardBody className="flex flex-col gap-y-4 px-8 py-8">
                    <VervalSigapokPegawai sigapok={sigapok} nip={NIP} />
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
