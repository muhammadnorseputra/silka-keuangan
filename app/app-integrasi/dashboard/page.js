import Image from "next/image";
import { CardModule } from "@/components/cards/card-module";
import { BtnProfile } from "@/components/button/btn-profile";
import { encrypt } from "@/helpers/encrypt";
import { useSessionServer } from "@/app/app-module/server-session";

export default async function Page() {
  let getProfile = useSessionServer("USER_SILKA");
  const { level, nip } = getProfile?.data;
  const { unker } = getProfile?.data?.pegawai;

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
          title="Module PNS"
          icon="PersonVcard"
          path="/app-module/pegawai"
        />
        <CardModule
          title="Module PPPK"
          icon="Postcard"
          path="/app-module/pppk"
        />
        <CardModule
          title="(Comming Son)"
          icon="Stars"
          path="/app-module/cuti"
          isDisabled={true}
        />
      </>
    );
  };
  return (
    <>
      <div className="w-full md:w-8/12 bg-white dark:bg-slate-900">
        <div className="card">
          <div className="card-header bg-blue-700 border-0 py-4">
            <div className="flex flex-row justify-start md:justify-between md:items-center mx-8 pb-4">
              <div className="inline-flex flex-col sm:flex-row justify-start items-start gap-3 pt-3">
                <Image
                  className="img-fluid rounded mb-2 md:mb-0"
                  loading="lazy"
                  src="/logo-balangan.svg"
                  width="50"
                  height="50"
                  quality={90}
                  alt="Logo"
                />
                <div className="text-base text-white">
                  <p className="font-bold">
                    Sistem Informasi Layanan Kepegawaian
                  </p>
                  <p className="font-bold fs-6">Pemerintah Kab. Balangan</p>
                  <p>{unker}</p>
                </div>
              </div>
              <div className="inline-flex justify-start mt-4 md:mt-0">
                <BtnProfile size="lg" profile={getProfile} />
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="w-full">
              <h1 className="text-2xl text-center font-bold ml-8 mt-8">
                Module Integrasi 🔥
              </h1>
              <section className="flex flex-wrap justify-center items-center gap-4 p-8">
                {renderModule()}
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
