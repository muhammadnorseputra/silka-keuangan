import { sigapok_headers } from "@/lib/req-headers";

export const getSatkerSigapok = async (token) => {
  const url = process.env.NEXT_PUBLIC_GAPOK_BASE_URL;
  const path = process.env.NEXT_PUBLIC_GAPOK_PATH;
  const headers = sigapok_headers(token);
  try {
    const req = await fetch(`${url}/${path}/getSatker`, {
      method: "GET",
      cache: "force-cache",
      headers,
      next: {
        tags: ["getSatkerSigapok"],
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

export const getSatkerByIdSigapok = async (token, id_satker) => {
  const url = process.env.NEXT_PUBLIC_GAPOK_BASE_URL;
  const path = process.env.NEXT_PUBLIC_GAPOK_PATH;
  const headers = sigapok_headers(token);
  try {
    const req = await fetch(`${url}/${path}/getSatkerByID/${id_satker}`, {
      method: "GET",
      cache: "force-cache",
      headers,
      next: {
        tags: ["getSatkerSigapok"],
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
