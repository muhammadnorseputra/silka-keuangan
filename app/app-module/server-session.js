"use server";
import { cookies } from "next/headers";
import { AES, enc } from "crypto-js";

const hasSessionServer = (req) => {
  let user = cookies().get(req);
  if (user) {
    return true;
  }
  return false;
};

const useSessionServer = (req) => {
  let user = cookies().get(req);
  if (user) {
    const decode = AES.decrypt(user?.value, process.env.NEXT_PUBLIC_SECRET_KEY);
    return JSON.parse(decode.toString(enc.Utf8));
  }
  return null;
};

export { hasSessionServer, useSessionServer };
