import { Search } from "react-bootstrap-icons";
import dynamic from "next/dynamic";
import { SparklesIcon } from "@heroicons/react/24/solid";

export const metadata = {
  title: "Cari ASN | SILKa - INEXIS",
};

const CariASN = dynamic(() => import("@/components/search/cariasn"), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      <div className="inline-flex flex-col items-start justify-start w-full p-6 mt-2 bg-[url('/bg-dashboard-kantor.png')] bg-cover bg-no-repeat bg-center rounded-lg shadow-none min-h-[310px] 2xl:min-h-[260px]">
        <div className="inline-flex items-start justify-start mt-12 ml-4 gap-x-3">
          <div className="p-4 rounded-2xl bg-blue-200/50 dark:bg-blue-100/30">
            <Search className="inline w-8 h-8 text-blue-400" />
          </div>
          <div className="inline-flex flex-col items-start justify-start gap-y-4">
            <h1 className="text-4xl font-bold text-black">
              Cari ASN{" "}
              <SparklesIcon className="inline w-8 h-8 ml-2 text-yellow-400" />
            </h1>
            <p className="max-w-sm text-gray-600 text-wrap">
              Temukan data asn dengan mengisi NIP atau Nama, kemudian pilih
              jenis pegawai.
            </p>
          </div>
        </div>
      </div>
      <CariASN />
    </>
  );
}
