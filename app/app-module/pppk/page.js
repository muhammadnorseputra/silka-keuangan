import { BtnBackNextUi } from "@/components/button/btn-back";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { redirect } from "next/navigation";
import { hasSessionServer, useSessionServer } from "../server-session";
import { BtnProfile } from "@/components/button/btn-profile";
import { TablePppk } from "@/components/tables/table-pppk";
import { dataUnorByRole } from "@/dummy/data-unor-by-role";
import { getPppkByUnor } from "@/dummy/data-pppk-by-unor";
import { decrypt } from "@/helpers/encrypt";
import NoInternet from "@/components/errors/NoInternet";
import ProgresTpp from "@/components/proggres/tpp";

async function Page({ searchParams }) {
  const session = hasSessionServer("USER_GAPOK");
  const sigapok = useSessionServer("USER_GAPOK");
  const silka_session = useSessionServer("USER_SILKA");

  if (session === false) {
    return redirect("/app-integrasi/dashboard");
  }

  const { unker, unker_id } = silka_session?.data?.pegawai;
  const { nip, level } = silka_session?.data;

  const getUnorByRole = await dataUnorByRole(nip, level);
  const getIdUnker = searchParams.unor_id
    ? decrypt(searchParams.unor_id, "bkpsdm@6811")
    : unker_id;
  const pegawais = await getPppkByUnor(getIdUnker);

  const renderTable = () => {
    if (getUnorByRole.status === false) {
      return <NoInternet message={getUnorByRole.message} />;
    }
    return (
      <TablePppk
        silka={silka_session}
        unorlist={getUnorByRole}
        pegawais={pegawais}
      />
    );
  };
  return (
    <>
      <section className="w-full bg-blue-600 dark:bg-slate-800 h-screen">
        <div className="max-w-6xl mx-auto">
          <Card
            radius="none"
            shadow="lg"
            className="max-h-screen overflow-y-auto h-screen">
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
              <ProgresTpp KODE_SKPD_SIMPEG={getIdUnker} sigapok={sigapok}/>
              {renderTable()}
            </CardBody>
          </Card>
        </div>
      </section>
    </>
  );
}

export default Page;
