"use server";

import { headers } from "@/lib/req-headers";
export const getPegawaiByNip = async (nip) => {
  const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;

  try {
    const req = await fetch(
      `${url}/services/PegawaiWithBasicAuth/getProfileByNip?nip=${nip}`,
      {
        method: "GET",
        cache: "no-store",
        headers,
        next: { tags: ["dataPegawaiByNip"] },
      }
    );

    const result = await req.json();
    return result;
  } catch (err) {
    return {
      status: false,
      message: `Gagal koneksi ke server ${url} (${err})`,
    };
  }
};
