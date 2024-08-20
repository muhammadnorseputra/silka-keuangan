"use server";
import { sigapok_headers } from "@/lib/req-headers";

export const getTppSigapok = async (token, nip, periode) => {
  const url = process.env.NEXT_PUBLIC_GAPOK_BASE_URL;
  const path = process.env.NEXT_PUBLIC_GAPOK_PATH;
  const headers = sigapok_headers(token);
  try {
    const req = await fetch(
      `${url}/${path}/get-kolaborasi-tpp?NIP=${nip}&PERIODE_TPP=${periode}`,
      {
        method: "GET",
        cache: "no-store",
        headers,
        next: {
          tags: ["getTppSigapok"],
        },
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
