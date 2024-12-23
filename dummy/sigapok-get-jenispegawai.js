import { sigapok_headers } from "@/lib/req-headers";

export const getJenisPegawaiSigapok = async (token) => {
  const url = process.env.NEXT_PUBLIC_GAPOK_BASE_URL;
  const path = process.env.NEXT_PUBLIC_GAPOK_PATH;
  const headers = sigapok_headers(token);
  try {
    const req = await fetch(`${url}/${path}/getJenisPeg`, {
      method: "GET",
      cache: "force-cache",
      headers,
      next: {
        tags: ["getJenisPegawaiSigapok"],
      },
    });

    const result = await req.json();
    return result;
  } catch (err) {
    return {
      success: false,
      code: 500,
      status: "ERROR",
      message: `ERROR SERVER (${err})`,
      data: [],
    };
  }
};
