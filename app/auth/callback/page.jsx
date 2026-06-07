"use client";

import { Spinner } from "@nextui-org/react";
import { useEffect } from "react";
import { getCookie } from "cookies-next";

export default function Page(req) {
  const getCookieCallbackSSO = getCookie("callback_data_sso_silkainexis");
  const data = getCookieCallbackSSO ? JSON.parse(getCookieCallbackSSO.toString()) : null;
  const { status } = req.searchParams;

  useEffect(() => {
    // contoh simpan token/session di sini
    if (window.opener) {
      if (status === 'gagal' && !data?.status) {
        return window.opener.postMessage(
          {
            type: "SSO_FAILED",
          },
          "*",
        );
      }

      window.opener.postMessage(
        {
          type: "SSO_SUCCESS",
        },
        "*",
      );
    }

    window.close();
  }, [data?.status, status]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-xl text-white">
      <Spinner className="mr-2" color="white" />
      {data?.message}
    </div>
  );
}
