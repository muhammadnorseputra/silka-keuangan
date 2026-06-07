import { BtnBackNextUi } from "@/components/button/btn-back";
import { BtnProfile } from "@/components/button/btn-profile";
// import { Error500 } from "@/components/errors/500";
import { TablePegawai } from "@/components/tables/table-pegawai";
import { getPegawaiByUnor } from "@/dummy/data-pegawai-by-unor";
import { dataUnorByRole } from "@/dummy/data-unor-by-role";
import { decrypt } from "@/helpers/encrypt";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { getSessionServer } from "../server-session";
import NoInternet from "@/components/errors/NoInternet";
// import ProgresTpp from "@/components/proggres/tpp";

async function Page({ searchParams }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const sigapok = await getSessionServer("USER_GAPOK");
  const silka_session = await getSessionServer("USER_SILKA");
  const { unker, unker_id } = silka_session?.data?.pegawai;
  const { nip, level } = silka_session?.data;
  // @ts-ignore
  const getIdUnker = searchParams.unor_id
    ? decrypt(searchParams.unor_id, "bkpsdm@6811")
    : unker_id;
  const getUnorByRole = await dataUnorByRole(nip, level);
  const getPegawaiByUnorId = await getPegawaiByUnor(getIdUnker);
  const renderBody = () => {
    if (getUnorByRole.status === false) {
      return <NoInternet message={getUnorByRole.message} />;
    }
    return (
      <>
        <TablePegawai unors={getUnorByRole} pegawais={getPegawaiByUnorId} />
      </>
    );
  };
  return (
    <>
      <section className="w-full h-screen bg-blue-400 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <Card
            radius="none"
            shadow="lg"
            className="h-screen max-h-screen overflow-y-auto">
            <CardHeader className="flex items-start justify-between sm:items-center">
              <div className="inline-flex items-start gap-3 sm:items-center">
                <BtnBackNextUi goTo="/app-integrasi/dashboard" />
                <div className="flex flex-col">
                  <div className="text-xl uppercase">DATA Pegawai</div>
                  <div className="pr-5 text-small text-default-500 sm:pr-0">
                    {unker}
                  </div>
                </div>
              </div>
              <BtnProfile profile={silka_session} />
            </CardHeader>
            <CardBody>
              {/* <ProgresTpp KODE_SKPD_SIMPEG={getIdUnker} sigapok={sigapok} /> */}
              {renderBody()}
            </CardBody>
          </Card>
        </div>
      </section>
    </>
  );
}

export default Page;
