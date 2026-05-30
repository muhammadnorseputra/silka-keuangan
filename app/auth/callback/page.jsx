"use client";

import { Spinner } from "@nextui-org/react";
import { useEffect } from "react";
import { getCookie } from "cookies-next";

export default function Page() {
  const getCookieData = getCookie("callback_data_sso_silkainexis");
  const data = getCookieData ? JSON.parse(getCookieData.toString()) : null;

  useEffect(() => {
    // contoh simpan token/session di sini

    if (window.opener) {
      if (!data?.status) {
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
  }, [data?.status]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-xl">
      <Spinner className="mr-2" />
      {data.status ? data?.message : 'Login Gagal'}
    </div>
  );
}
