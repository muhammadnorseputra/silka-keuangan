"use client";

import { Icon } from "@/public/assets/lotties";
import dynamic from "next/dynamic";
import { Reload } from "../button/btn-reload";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });
// @ts-ignore
function NoInternet({ message, ...args }) {
  return (
    <div className="flex flex-col gap-y-4 items-center justify-center">
      <DynamicLottie style={{width: 400}} animationData={Icon.NoInternet} loop {...args} />
      <span className="font-bold text-xl">{message}</span>
      <Reload />
    </div>
  );
}

export default NoInternet;
