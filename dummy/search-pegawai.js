"use server";

import { useSessionServer } from "@/app/app-module/server-session";

export const SearchPegawai = async ({jenis, nipnama}) => {
  const account = useSessionServer("USER_SILKA");
  const { nip } = account?.data
  const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;
  try {
    let res = await fetch(
      `${url}/services/PegawaiWithBasicAuth/searchPegawai`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apiKey": "bkpsdm6811",
          Authorization: 'Basic QmFsYW5nYW5rYWI6Ymtwc2RtQDIwMjI='
        },
        body: JSON.stringify({
          jenis,
          nipnama,
          account_login: nip
        })
      }
    );
    let json = await res.json();
    return json;
  } catch (err) {
    return {
      status: false,
      message: `Connection failed ${url} (${err})`,
      data: [],
    };
  }
};
