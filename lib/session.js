import { getCookie } from "cookies-next";
import { AES, enc } from "crypto-js";

const hasSession = (req) => {
  let user = getCookie(req);
  if (user) {
    return true;
  }
  return false;
};

const useSession = (req) => {
  let user = getCookie(req);
  if (user) {
    const decode = AES.decrypt(user, process.env.NEXT_PUBLIC_SECRET_KEY);
    return JSON.parse(decode.toString(enc.Utf8));
  }
  return null;
};

export { useSession, hasSession };
