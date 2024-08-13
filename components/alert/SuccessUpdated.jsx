"use client";

import { Icon } from "@/public/assets/lotties";
import dynamic from "next/dynamic";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });
// @ts-ignore
function SuccessUpdated({ children, ...args }) {
  return (
    <div className="flex flex-col gap-y-4 items-center justify-center">
      <DynamicLottie animationData={Icon.SuccessUpdated} loop {...args} />
      {children}
    </div>
  );
}

export default SuccessUpdated;
