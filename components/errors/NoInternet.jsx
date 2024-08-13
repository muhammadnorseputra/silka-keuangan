"use client";

import { Icon } from "@/public/assets/lotties";
import dynamic from "next/dynamic";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });
// @ts-ignore
function NoInternet({ message, ...args }) {
  return (
    <div className="flex flex-col gap-y-4 items-center justify-center">
      <DynamicLottie animationData={Icon.NoInternet} loop {...args} />
      <span className="font-bold text-xl">{message}</span>
    </div>
  );
}

export default NoInternet;
