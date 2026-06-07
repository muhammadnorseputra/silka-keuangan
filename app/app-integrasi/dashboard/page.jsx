import { CardModule } from "@/components/cards/card-module";

import { encrypt } from "@/helpers/encrypt";
import { getSessionServer } from "@/app/app-module/server-session";
import { SparklesIcon } from "@heroicons/react/24/solid";

export const metadata = {
  title: "Dashboard | SILKa - INEXIS",
};

export default async function Page() {
  let getProfile = await getSessionServer("USER_SILKA");
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
          color="bg-blue-400"
          bgIconColor="bg-blue-100/50 dark:bg-blue-100/30"
          description="Pencarian data ASN SILKa meggunakan NIP atau Nama"
        />
        <CardModule
          title="Nominatif PNS"
          icon="PersonVcard"
          iconColor="text-green-400 dark:text-green-200"
          path="/app-module/pegawai"
          color="bg-green-500"
          bgIconColor="bg-green-100/50 dark:bg-green-100/30"
          description="Kelola data nominatif PNS yang terintegrasi dengan SILKa"
        />
        <CardModule
          title="Nominatif PPPK"
          icon="Postcard"
          iconColor="text-purple-400 dark:text-purple-200"
          path="/app-module/pppk"
          color="bg-purple-400"
          bgIconColor="bg-purple-100/50 dark:bg-purple-100/30"
          description="Kelola data nominatif PPPK yang terintegrasi dengan SILKa"
        />
        <CardModule
          title="Tanya AI !"
          icon="Stars"
          iconColor="text-orange-400 dark:text-orange-50"
          path="/app-integrasi/generative-ai"
          color="bg-orange-400"
          bgIconColor="bg-orange-100/50 dark:bg-orange-100/30"
          description="Tanya seputar kepegawaian dengan bantuan AI yang cerdas"
        />
      </>
    );
  };
  return (
    <>
      <div className="w-full">
        <div className="inline-flex flex-col items-start justify-start w-full p-6 mt-4 bg-[url('/bg-dashboard-kantor.png')] bg-cover bg-no-repeat bg-bottom rounded-lg shadow-none min-h-[380px] 2xl:min-h-[420px]">
          <div className="inline-flex flex-col items-start justify-start mt-6 ml-8 2xl:mt-10 gap-y-4">
            <span className="text-lg font-medium text-blue-700">Selamat Datang, {level}</span>
            <h1 className="text-4xl font-bold text-black">Pilih Layanan Integrasi</h1>
            <p className="text-gray-600">Akses layanan kepegawaian terintegrasi dengan SILKa dalam satu portal.</p>
          </div>
        </div>
        <section className="grid grid-flow-row grid-cols-1 mx-2 -mt-24 gap-x-2 gap-y-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 group">
          {renderModule()}
        </section>
        <footer className="p-6 mx-2 mt-6 text-sm text-gray-400 bg-white rounded-lg shadow-lg dark:text-gray-300 dark:bg-slate-600">
          &copy; 2024 - SILKa INEXIS | BKPSDM Kab. Balangan
        </footer>
      </div>
    </>
  );
}
