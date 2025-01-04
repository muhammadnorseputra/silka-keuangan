import { BtnBackNextUi } from "@/components/button/btn-back";
import { Stars } from "react-bootstrap-icons";
import { FormAI } from "./form";

export const metadata = {
  title: "Generative AI Collaborate | SILKa - INEXIS",
};

export default function Page() {
  return (
    <>
      <div className="flex justify-center w-full mt-10">
        <div className="inline-flex items-start justify-between gap-x-4">
          <BtnBackNextUi />
          <div className="inline-flex flex-col">
            <div className="inline-flex text-2xl font-bold gap-x-3">
              Generative AI <Stars className="text-yellow-400" />
            </div>
            <div className="text-gray-400">AI Collaborate 1.5 Model Flash</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full mt-5">
        <FormAI />
      </div>
    </>
  );
}
