"use server";
import { headers } from "@/lib/req-headers";

export const getPegawaiByUnor = async (unorid) => {
  const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;
  try {
    const req = await fetch(
      `${url}/services/PegawaiWithBasicAuth/getPegawaiByUnor`,
      {
        method: "POST",
        cache: "no-store",
        headers,
        body: JSON.stringify({
          unor_id: unorid,
        }),
        next: { tags: ["datapegawai"] },
      }
    );

    const result = await req.json();
    return result;
  } catch (err) {
    return {
      status: false,
      message: `Gagal menghubungkan ke server ${url} (${err})`,
      data: [],
    };
  }
};

export const dataPegawaiByUnor = async (unorid) => {
  const responses = await getPegawaiByUnor(unorid);
  return responses;
};

export const getASNByUnor = async (unorid) => {
  const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;
  try {
    const req = await fetch(
      `${url}/services/tpp/index/jumlahasn?id=${unorid}`,
      {
        method: "GET",
        cache: "force-cache",
        headers,
        next: { tags: ["get.asn.by.unor"] },
      }
    );

    const result = await req.json();
    return result;
  } catch (err) {
    return {
      status: false,
      message: `Gagal menghubungkan ke server ${url} (${err})`,
      data: [],
    };
  }
};
