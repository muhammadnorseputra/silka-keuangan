import { getCookie } from "cookies-next";

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
    return JSON.parse(user);
  }
  return null;
};

export { useSession, hasSession };
