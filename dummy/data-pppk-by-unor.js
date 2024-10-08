import { headers } from "@/lib/req-headers";

export const getPppkByUnor = async (unor_id) => {
  const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;
  try {
    const req = await fetch(`${url}/services/pppk`, {
      method: "POST",
      cache: "no-store",
      headers,
      body: JSON.stringify({
        unor_id,
      }),
      next: { tags: ["datap3k"] },
    });

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

export const datePppkByUnor = async (unor_id) => {
  const responses = await getPppkByUnor(unor_id);
  return responses;
};
