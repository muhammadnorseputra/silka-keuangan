"use server";
import { sigapok_headers } from "@/lib/req-headers";

export const kirimTPP = async (token, body) => {
  const url = process.env.NEXT_PUBLIC_GAPOK_BASE_URL;
  const path = process.env.NEXT_PUBLIC_GAPOK_PATH;
  const headers = sigapok_headers(token);
  const req = await fetch(`${url}/${path}/insert-kolaborasi-tpp`, {
    method: "POST",
    cache: "no-store",
    headers,
    body,
    next: {
      tags: ["InsertKolaborasiTPP"],
    },
  });

  const result = await req.json();
  return result;
};
