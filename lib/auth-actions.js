"use server";

import { cookies } from "next/headers";
import { headers } from "./req-headers";
import { AES } from "crypto-js";

export async function proseslogin(formData) {
  try {
    let base_url = `${process.env.NEXT_PUBLIC_SILKA_BASE_URL}/services/auth/basic`;
    let account = {
      type: formData.type,
      username: formData.username,
      password: formData.password,
    };
    let response = await fetch(base_url, {
      cache: "no-store",
      method: "POST",
      headers,
      body: JSON.stringify(account),
    });
    let data = await response.json();
    if (data.status === true) {
      cookies().set(
        "USER_SILKA",
        AES.encrypt(JSON.stringify(data), "Bkpsdm@6811#").toString(),
        {
          maxAge: 3600,
        }
      );
    }
    return {
      response: data,
    };
  } catch (error) {
    return {
      response: {
        status: false,
        message: `Gagal menghubungi server ${process.env.NEXT_PUBLIC_SILKA_BASE_URL} (${error})`,
      },
    };
  }
}
