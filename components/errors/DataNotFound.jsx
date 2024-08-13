"use client";

import { Icon } from "@/public/assets/lotties";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });
// @ts-ignore
function DataNotFound({ message, ...args }) {
  return (
    <div className="flex flex-col gap-y-4 items-center justify-center">
      <DynamicLottie animationData={Icon.DataEmpty} loop {...args} />
      <span className="font-bold text-xl">{message}</span>
    </div>
  );
}

export default DataNotFound;
