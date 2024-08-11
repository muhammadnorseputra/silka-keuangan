import { sigapok_headers } from "@/lib/req-headers";

export const getBankSigapok = async (token) => {
  const url = process.env.NEXT_PUBLIC_GAPOK_BASE_URL;
  const path = process.env.NEXT_PUBLIC_GAPOK_PATH;
  const headers = sigapok_headers(token);
  try {
    const req = await fetch(`${url}/${path}/getBank`, {
      method: "GET",
      cache: "no-store",
      headers,
      next: {
        tags: ["getBankSigapok"],
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
