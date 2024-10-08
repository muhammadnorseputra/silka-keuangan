import { headers } from "@/lib/req-headers";

export const getKgbByNip = async (nip_pegawai) => {
  const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;
  try {
    const req = await fetch(`${url}/services/kgb/index?nip=${nip_pegawai}`, {
      method: "GET",
      cache: "no-store",
      headers,
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
