import { sigapok_headers } from "@/lib/req-headers";

export const getTppSigapok = async (
  token,
  nip,
  periode,
  kode_skpd,
  kode_satker
) => {
  const url = process.env.NEXT_PUBLIC_GAPOK_BASE_URL;
  const path = process.env.NEXT_PUBLIC_GAPOK_PATH;
  const headers = sigapok_headers(token);
  try {
    const req = await fetch(
      `${url}/${path}/getPerubahanData?NIP=${nip}&PERIODE_TPP=${periode}&KD_SKPD=${kode_skpd}&KD_SATKER=${kode_satker}`,
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
