"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressProviders = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="6px"
        color="#D22B2B"
        options={{ showSpinner: true }}
        shallowRouting={true}
      />
    </>
  );
};

export default ProgressProviders;
