import { CardModule } from "@/components/cards/card-module";

import { encrypt } from "@/helpers/encrypt";
import { useSessionServer } from "@/app/app-module/server-session";

export default async function Page() {
  let getProfile = useSessionServer("USER_SILKA");
  const { level, nip } = getProfile?.data;

  const renderModule = () => {
    if (level === "PNS") {
      return (
        <CardModule
          title="Peremajaan Data"
          icon="PersonVcard"
          path={`/app-module/pegawai/peremajaan/${encrypt(nip, "bkpsdm")}`}
        />
      );
    }
    return (
      <>
        <CardModule
          title="Daftar PNS"
          icon="PersonVcard"
          path="/app-module/pegawai"
        />
        <CardModule
          title="Daftar PPPK"
          icon="Postcard"
          path="/app-module/pppk"
        />
        <CardModule
          title="Cari ASN"
          icon="Search"
          path="/app-integrasi/cariasn"
        />
      </>
    );
  };
  return (
    <>
      <div className="w-full">
        <h1 className="text-2xl text-center font-bold ml-8 mt-8">
          Pilih Module 🔥
        </h1>
        <section className="flex flex-wrap justify-center items-center gap-4 p-8">
          {renderModule()}
        </section>
      </div>
    </>
  );
}
