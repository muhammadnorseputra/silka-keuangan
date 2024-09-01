"use server";
import { headers } from "@/lib/req-headers";

export const getPeriodeTPP = async () => {
  const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;

  const req = await fetch(`${url}/services/tpp/index/periode`, {
    method: "GET",
    cache: "no-store",
    headers,
    next: {
      tags: ["getPriodeTpp"],
    },
  });

  const result = await req.json();
  return result;
};
