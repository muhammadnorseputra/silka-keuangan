import { BtnBackNextUi } from "@/components/button/btn-back";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { redirect } from "next/navigation";
import { hasSessionServer, useSessionServer } from "../server-session";
import { BtnProfile } from "@/components/button/btn-profile";
import { TablePppk } from "@/components/tables/table-pppk";
import { dataUnorByRole } from "@/dummy/data-unor-by-role";
import { getPppkByUnor } from "@/dummy/data-pppk-by-unor";

async function Page({ searchParams }) {
  const session = hasSessionServer("USER_GAPOK");
  if (session === false) {
    return redirect("/app-integrasi/dashboard");
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const silka_session = useSessionServer("USER_SILKA");
  const { unker, unker_id } = silka_session?.data?.pegawai;
  const { nip, level } = silka_session?.data;

  const getUnorByRole = await dataUnorByRole(nip, level);
  const getIdUnker = searchParams.unor_id ? searchParams.unor_id : unker_id;
  const pegawais = await getPppkByUnor(getIdUnker);
  return (
    <>
      <section className="w-full bg-gray-100 dark:bg-slate-800 h-screen">
        <div className="max-w-6xl mx-auto">
          <Card shadow="lg" className="max-h-screen overflow-y-auto">
            <CardHeader className="flex justify-between items-center">
              <div className="inline-flex items-center gap-3">
                <BtnBackNextUi goTo="/app-integrasi/dashboard" />
                <div className="flex flex-col">
                  <p className="text-xl uppercase">DATA PPPK</p>
                  <p className="text-small text-default-500 pr-5 sm:pr-0">
                    {unker}
                  </p>
                </div>
              </div>
              <BtnProfile profile={silka_session} />
            </CardHeader>
            <CardBody>
              <TablePppk
                silka={silka_session}
                unorlist={getUnorByRole}
                pegawais={pegawais}
              />
            </CardBody>
          </Card>
        </div>
      </section>
    </>
  );
}

export default Page;
