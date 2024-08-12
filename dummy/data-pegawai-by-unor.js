import { headers } from "@/lib/req-headers";

export const getPegawaiByUnor = async (unorid) => {
  const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;

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
};

export const dataPegawaiByUnor = async (unorid) => {
  const responses = await getPegawaiByUnor(unorid);
  return responses;
};
