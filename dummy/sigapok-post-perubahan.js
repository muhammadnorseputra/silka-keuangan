"use server";
import { sigapok_headers } from "@/lib/req-headers";

export const savePerubahanData = async (token, body) => {
  const url = process.env.NEXT_PUBLIC_GAPOK_BASE_URL;
  const path = process.env.NEXT_PUBLIC_GAPOK_PATH;
  const headers = sigapok_headers(token);
  try {
    const req = await fetch(`${url}/${path}/SavePerubahanData`, {
      method: "POST",
      cache: "no-store",
      headers,
      body,
      next: {
        tags: ["savePerubahanData"],
      },
    });

    const result = await req.json();
    return result;
  } catch (err) {
    return {
      status: false,
      message: `Gagal menghubungkan ke server ${url} (${err})`,
    };
  }
};
