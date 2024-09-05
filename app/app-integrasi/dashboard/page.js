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
          title="Cari ASN"
          icon="Search"
          path="/app-integrasi/cariasn"
        />
        <CardModule
          title="Nominatif PNS"
          icon="PersonVcard"
          path="/app-module/pegawai"
        />
        <CardModule
          title="Nominatif PPPK"
          icon="Postcard"
          path="/app-module/pppk"
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
        <section className="grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-4 p-8 group">
          {renderModule()}
        </section>
      </div>
    </>
  );
}
