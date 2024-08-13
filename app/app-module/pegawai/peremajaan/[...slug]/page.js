"use server";
import { BtnBackNextUi } from "@/components/button/btn-back";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { useSessionServer } from "../../../server-session";
import { decrypt } from "@/helpers/encrypt";
import { FormPeremajaan } from "@/components/forms/form-peremajaan";
import { getPegawaiByNip } from "@/dummy/data-pegawai-by-nip";
import DataNotFound from "@/components/errors/DataNotFound";
// import { Error500 } from "@/components/errors/500";

export default async function Page({ params, searchParams }) {
  const sigapok = useSessionServer("USER_GAPOK");

  const getNip = decrypt(params?.slug[0], "bkpsdm");

  const getPegawais = await getPegawaiByNip(getNip);

  const { nama, nip, gelar_depan, gelar_belakang } = getPegawais;
  const renderForm = () => {
    if (getPegawais.status === false) {
      return (
        <Card className="w-full h-screen">
          <CardBody className="flex flex-col items-center justify-center gap-6">
            <DataNotFound message={getPegawais.message} />
          </CardBody>
        </Card>
      );
    }

    return <FormPeremajaan sigapok={sigapok} pegawais={getPegawais} />;
  };

  return (
    <>
      <div className="w-full bg-gray-100  dark:bg-gray-900 h-screen">
        <div className="max-w-6xl mx-auto">
          <Card shadow="none" className="max-h-screen overflow-y-auto">
            <CardHeader className="flex justify-between items-center">
              <div className="inline-flex items-center gap-4">
                <BtnBackNextUi goTo="/app-module/kgb" title="Kembali" />
                <div className="flex flex-col">
                  <p className="text-xl flex flex-col">
                    <span className="uppercase font-bold">
                      Peremajaan Data Pegawai
                    </span>
                    <span className="text-base">
                      {gelar_depan} {nama} {gelar_belakang} {nip}
                    </span>
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody>{renderForm()}</CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
