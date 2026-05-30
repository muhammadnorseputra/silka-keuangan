"use server";

export default async function RevokeToken(uid, access_token) {
  try {
    const base_url = `${process.env.NEXT_PUBLIC_SILKA_BASE_URL}/services/v2/oauth/sso/revoke_token?user_id=${uid}`;
    const response = await fetch(base_url, {
      method: "DELETE",
      cache: "no-store",
      headers: {
        apiKey: process.env.SSO_APIKEY,
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
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