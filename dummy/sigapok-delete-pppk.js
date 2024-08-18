"use server";
import { sigapok_headers } from "@/lib/req-headers";

export const DeleteP3k = async (token, nipppk) => {
  const url = process.env.NEXT_PUBLIC_GAPOK_BASE_URL;
  const path = process.env.NEXT_PUBLIC_GAPOK_PATH;
  const headers = sigapok_headers(token);
  const req = await fetch(`${url}/${path}/hapusP3K/${nipppk}`, {
    method: "DELETE",
    cache: "no-store",
    headers,
  });

  const result = await req.json();
  return result;
};
