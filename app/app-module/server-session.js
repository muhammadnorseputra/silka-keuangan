import { cookies } from "next/headers";

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
    return JSON.parse(user?.value);
  }
  return null;
};

export { hasSessionServer, useSessionServer };
