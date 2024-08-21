"use server";
import { AES } from "crypto-js";
import { cookies } from "next/headers";

export const loginSigapok = async () => {
  const account = {
    username: process.env.NEXT_PUBLIC_GAPOK_USERNAME,
    password: process.env.NEXT_PUBLIC_GAPOK_PASSWORD,
    kddati1: process.env.NEXT_PUBLIC_GAPOK_KDDATI1,
    kddati2: process.env.NEXT_PUBLIC_GAPOK_KDDATI2,
  };
  try {
    const getUserSigapok = await fetch(
      `${process.env.NEXT_PUBLIC_GAPOK_BASE_URL}/${process.env.NEXT_PUBLIC_GAPOK_PATH}/login`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(account),
      }
    );
    const response = await getUserSigapok.json();
    if (response.success === true) {
      cookies().set(
        "USER_GAPOK",
        AES.encrypt(
          JSON.stringify(response),
          process.env.NEXT_PUBLIC_SECRET_KEY
        ).toString(),
        {
          maxAge: 3600,
        }
      );
    }

    return response;
  } catch (err) {
    // throw new Error(`Gagal koneksi ke server (${err})`);
    return {
      status: false,
      message: `Gagal menghubungkan ke server ${process.env.NEXT_PUBLIC_GAPOK_BASE_URL} (${err})`,
      data: [],
    };
  }
};
