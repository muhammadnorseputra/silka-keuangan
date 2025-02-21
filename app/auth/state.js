"use server";
import { cookies } from "next/headers";

// Server Action
export async function state({ uuid }) {
  cookies().set("sso_state", uuid, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600,
  });
  // ...
}
