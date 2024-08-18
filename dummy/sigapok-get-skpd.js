import { sigapok_headers } from "@/lib/req-headers";

export const getSkpdSigapok = async (token) => {
  const url = process.env.NEXT_PUBLIC_GAPOK_BASE_URL;
  const path = process.env.NEXT_PUBLIC_GAPOK_PATH;
  const headers = sigapok_headers(token);
  try {
    const req = await fetch(`${url}/${path}/getUnorAntara`, {
      method: "GET",
      cache: "no-store",
      headers,
      next: {
        tags: ["getSkpdSigapok"],
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
