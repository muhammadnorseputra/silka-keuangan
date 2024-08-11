"use client";

import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children, ...args }) {
  return <NextUIProvider {...args}>{children}</NextUIProvider>;
}
