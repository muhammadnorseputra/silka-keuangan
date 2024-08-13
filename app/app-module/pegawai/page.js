import { BtnBackNextUi } from "@/components/button/btn-back";
import { BtnProfile } from "@/components/button/btn-profile";
import { Error500 } from "@/components/errors/500";
import { TablePegawai } from "@/components/tables/table-pegawai";
import { getPegawaiByUnor } from "@/dummy/data-pegawai-by-unor";
import { dataUnorByRole } from "@/dummy/data-unor-by-role";
import { decrypt } from "@/helpers/encrypt";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useSessionServer } from "../server-session";

async function Page({ searchParams }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const silka_session = useSessionServer("USER_SILKA");
  const { unker, unker_id } = silka_session?.data?.pegawai;
  const { nip, level } = silka_session?.data;
  // @ts-ignore
  const getIdUnker = searchParams.unor_id
    ? decrypt(searchParams.unor_id, "bkpsdm@6811")
    : unker_id;
  const getUnorByRole = await dataUnorByRole(nip, level);
  const getPegawaiByUnorId = await getPegawaiByUnor(getIdUnker);

  const renderBody = () => {
    // if (getUnorByRole.status === false || getPegawaiByUnorId.status === false) {
    //   return <Error500 />;
    // }
    return (
      <>
        <TablePegawai
          silka={silka_session}
          unors={getUnorByRole}
          pegawais={getPegawaiByUnorId}
        />
      </>
    );
  };

  return (
    <>
      <section className="w-full bg-gray-100 dark:bg-slate-800 h-screen">
        <div className="max-w-6xl mx-auto">
          <Card shadow="lg" className="max-h-screen overflow-y-auto my-auto">
            <CardHeader className="flex justify-between items-center">
              <div className="inline-flex items-center gap-3">
                <BtnBackNextUi goTo="/app-integrasi/dashboard" />
                <div className="flex flex-col">
                  <div className="text-xl uppercase">DATA Pegawai</div>
                  <div className="text-small text-default-500 pr-5 sm:pr-0">
                    {unker}
                  </div>
                </div>
              </div>
              <BtnProfile profile={silka_session} />
            </CardHeader>
            <CardBody>{renderBody()}</CardBody>
          </Card>
        </div>
      </section>
    </>
  );
}

export default Page;