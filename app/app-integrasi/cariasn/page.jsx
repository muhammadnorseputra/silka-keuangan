import CariASN from "@/components/search/cariasn";
import { Stars } from "react-bootstrap-icons";

export default function Page() {
  return (
    <>
      <div className="flex justify-center w-full mt-10">
        <h3 className="inline-flex gap-x-3 text-2xl font-bold">
          Cari ASN <Stars className="text-yellow-400" />
        </h3>
      </div>
      <div className="flex justify-center w-full mt-5">
        <CariASN />
      </div>
    </>
  );
}
