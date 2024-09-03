import { BtnBackNextUi } from "@/components/button/btn-back";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useSessionServer } from "../../../server-session";
import { decrypt } from "@/helpers/encrypt";
import { getPegawaiByNip } from "@/dummy/data-pegawai-by-nip";
import VervalSigapokPegawai from "./sigapok";
import VervalSilkaPegawai from "./silka";
export const revalidate = 0;

export default async function Page({ params }) {
  const sigapok = useSessionServer("USER_GAPOK");
  const silkaonline = useSessionServer("USER_SILKA");

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
                  <p className="text-xl flex flex-col">
                    <span className="uppercase">
                      Verifikasi & Validasi Data Peremajaan
                    </span>
                    {/* <span className="text-base">{namalengkap}</span> */}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col md:flex-row justify-between items-start gap-x-6 gap-y-3">
                {/* Get Data Silka */}
                <Card fullWidth className="relative">
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                      <p className="text-md">SILKa Online</p>
                      <p className="text-small text-default-500">
                        Data Verifikasi & Validasi Data Peremajaan
                      </p>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex flex-col gap-y-4 px-8 py-8">
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
