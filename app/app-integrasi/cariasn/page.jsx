import { BtnBackNextUi } from "@/components/button/btn-back";
import CariASN from "@/components/search/cariasn";
import { Stars } from "react-bootstrap-icons";

export const metadata = {
  title: "Cari ASN | SILKa - INEXIS",
};

export default function Page() {
  return (
    <>
      <div className="flex justify-center w-full mt-10">
        <div className="inline-flex items-center justify-between gap-x-4">
          <BtnBackNextUi />
          <div className="inline-flex gap-x-3 text-2xl font-bold">
            Cari ASN <Stars className="text-yellow-400" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full mt-5">
        <CariASN />
      </div>
    </>
  );
}
