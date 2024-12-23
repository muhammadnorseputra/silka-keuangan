import { sigapok_headers } from "@/lib/req-headers";

export const getGapokByPangkat = async (token, body) => {
  const url = process.env.NEXT_PUBLIC_GAPOK_BASE_URL;
  const path = process.env.NEXT_PUBLIC_GAPOK_PATH;
  const headers = sigapok_headers(token);
  try {
    const req = await fetch(`${url}/${path}/getGapokByPangkat`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(body),
      headers,
      next: {
        tags: ["getGapok"],
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
