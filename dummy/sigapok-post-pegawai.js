"use server";
import { sigapok_headers } from "@/lib/req-headers";

export const TambahPegawai = async (token, body) => {
  const url = process.env.NEXT_PUBLIC_GAPOK_BASE_URL;
  const path = process.env.NEXT_PUBLIC_GAPOK_PATH;
  const headers = sigapok_headers(token);
  const req = await fetch(`${url}/${path}/tambahPegawai`, {
    method: "POST",
    cache: "no-store",
    headers,
    body: JSON.stringify(body),
  });

  const result = await req.json();
  return result;
};
