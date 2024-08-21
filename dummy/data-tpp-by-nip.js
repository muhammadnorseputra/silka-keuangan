import { headers } from "@/lib/req-headers";

export const getTppByNip = async (nip_pegawai) => {
  const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;

  const req = await fetch(
    `${url}/services/tpp/index/getTppByNip?nip=${nip_pegawai}`,
    {
      method: "GET",
      cache: "no-store",
      headers,
    }
  );

  const result = await req.json();
  return result;
};

export const getTppByNipppk = async (nip_pppk) => {
  const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;

  const req = await fetch(`${url}/services/tpp/index/pppk?nipppk=${nip_pppk}`, {
    method: "GET",
    cache: "no-store",
    headers,
  });

  const result = await req.json();
  return result;
};
