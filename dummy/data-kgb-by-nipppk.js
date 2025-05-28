import { HeaderWithAuth } from "@/lib/req-headers";

export const getKgbPPPK = async (nipppk, access_token) => {
  const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;
  try {
    const req = await fetch(`${url}/services/v2/kgb/pppk?nipppk=${nipppk}`, {
      method: "GET",
      cache: "no-store",
      headers: HeaderWithAuth(access_token),
    });

    const result = await req.json();
    return result;
  } catch (err) {
    return {
      status: false,
      message: `Gagal koneksi ke server ${url} (${err})`,
    };
  }
};
