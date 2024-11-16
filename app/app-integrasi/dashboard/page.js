import { CardModule } from "@/components/cards/card-module";

import { encrypt } from "@/helpers/encrypt";
import { useSessionServer } from "@/app/app-module/server-session";
import { SparklesIcon } from "@heroicons/react/24/solid";

export default async function Page() {
  let getProfile = useSessionServer("USER_SILKA");
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
            title="Approval TPP"
            icon="BookmarkCheck"
            path={`/app-integrasi/approval-tpp`}
          />
        </>
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
        <h1 className="w-full inline-flex gap-x-3 items-center justify-center text-2xl text-center font-bold ml-8 mt-8">
          Pilih Layanan Integrasi
          <SparklesIcon className="size-7 text-amber-400" />
        </h1>
        <section className="grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-4 p-8 group">
          {renderModule()}
        </section>
      </div>
    </>
  );
}
