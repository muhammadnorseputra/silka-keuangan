"use server";
import { cookies } from "next/headers";
import { AES, enc } from "crypto-js";
import UserInfo from "@/dummy/post-data-user-info";

// @ts-ignore
const hasSessionServer = (req) => {
  let user = cookies().get(req);
  if (user) {
    return true;
  }
  return false;
};

// @ts-ignore
const getSessionServer = (req) => {
  let user = cookies().get(req);
  if (user) {
    const decode = AES.decrypt(user?.value, "Bkpsdm@6811#");
    return JSON.parse(decode.toString(enc.Utf8));
  }
  return null;
};

// @ts-ignore
const getSessionDatabase = async (token) => {
  
  const sessionDB = await UserInfo({
    access_token: token,
  });

  if (!sessionDB.response.status) {
    return {
      status: sessionDB.response.status,
      message: sessionDB.response.message
    };
  }

  return sessionDB.response;
}

export { hasSessionServer, getSessionServer, getSessionDatabase };
