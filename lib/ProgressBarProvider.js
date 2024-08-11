"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressProviders = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="5px"
        color="#89b5e5"
        options={{ showSpinner: false }}
        shallowRouting={false}
      />
    </>
  );
};

export default ProgressProviders;
