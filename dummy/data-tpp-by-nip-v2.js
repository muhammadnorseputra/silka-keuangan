"use server";
import { HeaderWithAuth } from "@/lib/req-headers";

export const getTppByNip = async (nip_pegawai, access_token) => {
  const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;

  try {
    const req = await fetch(
      `${url}/services/v2/pns/${nip_pegawai}/tpp?limit=1&orderBy=desc`,
      {
        method: "GET",
        cache: "no-store",
        headers: HeaderWithAuth(access_token),
        next: {
          tags: ["getTppByNip"],
        },
      }
    );

    const result = await req.json();
    return result;
  } catch (error) {
    return { status: false, message: `Error fetching data: ${error.message}` };
  }
};

export const getTppByNipppk = async (nip_pppk, access_token) => {
  const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;

  const req = await fetch(
    `${url}/services/v2/pppk/${nip_pppk}/tpp?limit=1&orderBy=desc`,
    {
      method: "GET",
      cache: "no-store",
      headers: HeaderWithAuth(access_token),
      next: {
        tags: ["getTPPByNipppk"],
      },
    }
  );

  const result = await req.json();
  return result;
};
