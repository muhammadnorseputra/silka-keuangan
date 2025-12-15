import { CardModule } from "@/components/cards/card-module";

import { encrypt } from "@/helpers/encrypt";
import { useSessionServer } from "@/app/app-module/server-session";
import { SparklesIcon } from "@heroicons/react/24/solid";

export const metadata = {
  title: "Dashboard | SILKa - INEXIS",
};

export default async function Page() {
  let getProfile = await useSessionServer("USER_SILKA");
  const { level, nip } = getProfile?.data;

  const renderModule = () => {
    if (level === "PNS") {
      return (
        <>
          <CardModule
            title="Peremajaan Data"
            icon="PersonVcard"
            path={`/app-module/pegawai/peremajaan/${encrypt(nip, "bkpsdm")}`}
          />
          <CardModule
            title="Kirim TPP"
            icon="WalletFill"
            iconColor="text-green-600"
            path={`/app-integrasi/approval-tpp`}
          />
          <CardModule
            title="Kirim KGB"
            icon="Cash"
            iconColor="text-red-600"
            path={`/app-module/pegawai/kgb/${encrypt(nip, "bkpsdm")}`}
          />
          <CardModule
            title="Kirim KP"
            icon="Stars"
            iconColor="text-amber-300"
            path={`/app-module/pegawai/pangkat/${encrypt(nip, "bkpsdm")}`}
          />
        </>
      );
    }
    return (
      <>
        <CardModule
          title="Cari ASN"
          icon="Search"
          iconColor="text-blue-400 dark:text-blue-200"
          path="/app-integrasi/cariasn"
        />
        <CardModule
          title="Nominatif PNS"
          icon="PersonVcard"
          iconColor="text-green-400 dark:text-green-200"
          path="/app-module/pegawai"
        />
        <CardModule
          title="Nominatif PPPK"
          icon="Postcard"
          iconColor="text-purple-400 dark:text-purple-200"
          path="/app-module/pppk"
        />
        <CardModule
          title="Tanya AI !"
          icon="Stars"
          iconColor="text-orange-400 dark:text-orange-200"
          path="/app-integrasi/generative-ai"
        />
      </>
    );
  };
  return (
    <>
      <div className="w-full">
        <h1 className="inline-flex items-center justify-center w-full p-6 text-2xl font-bold text-center bg-amber-300 dark:bg-blue-800 gap-x-3">
          Pilih Layanan Integrasi
          <SparklesIcon className="text-amber-600 dark:text-yellow-300 size-7" />
        </h1>
        <section className="grid grid-flow-row grid-cols-1 gap-4 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 group">
          {renderModule()}
        </section>
      </div>
    </>
  );
}
