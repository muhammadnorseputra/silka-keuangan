import { headers } from "@/lib/req-headers";

export const getUnorByRole = async (nip, role) => {
  const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;

  try {
    const req = await fetch(
      `${url}/services/PegawaiWithBasicAuth/getUnorByRole`,
      {
        method: "POST",
        cache: "force-cache",
        headers,
        body: JSON.stringify({
          nip,
          role,
        }),
        next: {
          tags: ["getUnorByRole"],
        },
      }
    );

    const result = await req.json();
    return result;
  } catch (err) {
    return {
      status: false,
      message: `Gagal koneksi ke ${url} (${err})`,
      data: [],
    };
  }
};

export const dataUnorByRole = async (nip, role) => {
  const responses = await getUnorByRole(nip, role);
  return responses;
};
