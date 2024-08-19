"use server";
import { headers } from "@/lib/req-headers";

export const getProfilePppk = async (nipppk) => {
  const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;

  try {
    const req = await fetch(
      `${url}/services/PegawaiWithBasicAuth/getProfileByNipppk?nipppk=${nipppk}`,
      {
        method: "GET",
        cache: "no-store",
        headers,
        next: { tags: ["dataPppkByNipppk"] },
      }
    );
    const result = await req.json();
    return result;
  } catch (err) {
    return {
      status: false,
      message: `Gagal koneksi ke server ${url} (${err})`,
    };
  }
};
