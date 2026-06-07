import { AES } from "crypto-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { version as uuidVersion, validate as uuidValidate } from "uuid";

// validasi uuid jika query uuid bukan versi 7 dan valid
function uuidValidateV7(uuid) {
  return uuidValidate(uuid) && uuidVersion(uuid) === 7;
}

export async function GET(req) {
  const { host, protocol, searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const scope = searchParams.get("scope");

  const fullHost = `${protocol}//${host}`; // Contoh: http://localhost:3000

  if (!code) {
    return Response.json(
      { status: false, message: "Kode tidak ditemukan" },
      { status: 400 }
    );
  }

  if (
    !state ||
    state !== req.cookies.get("sso_state_silkainexis")?.value ||
    !uuidValidateV7(state)
  ) {
    return Response.json(
      {
        status: false,
        message:
          "state expired, silahkan buat state authorize baru atau kembali ke halaman login",
        backAuthorize: `${fullHost}/auth`,
      },
      { status: 401 }
    );
  }

  // verify code
  const response = await getAccessTokenWithCode(code, scope);
  // const response = await codeVerify(code, scope);

  if(!response.response.status)
  {
    const res = NextResponse.redirect(
      `${fullHost}/auth/callback?status=gagal`, 302
    );
    // @ts-ignore
    res.cookies.set("callback_data_sso_silkainexis", JSON.stringify(response.response));
    return res;
  }

  // get profile if access_token valid
  const profile = await userinfos(response.response.access_token)
  
  cookies().set(
    "USER_SILKA",
    AES.encrypt(
      // @ts-ignore
      JSON.stringify({
        data: profile.response.data,
        access_token: response.response.access_token,
      }),
      "Bkpsdm@6811#"
    ).toString(),
    {
      maxAge: 3600,
    }
  );

  const res = NextResponse.redirect(
    `${fullHost}/auth/callback?status=success`, 302
  );
  res.cookies.set("callback_data_sso_silkainexis", JSON.stringify({
      status: response.response.status,
      message: response.response.message
  }));
  return res;
}

export const codeVerify = async (code, scope) => {
  const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;
  try {
    const req = await fetch(`${url}/services/v2/oauth/sso/code_verify`, {
      method: "POST",
      cache: "no-store",
      headers: {
        apiKey: process.env.SSO_APIKEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, scope }),
    });

    const result = await req.json();
    return {
      response: result,
    };
  } catch (err) {
    return {
      response: {
        status: false,
        message: `Gagal menghubungi server ${url} (${err.message})`,
      },
    };
  }
};

export const getAccessTokenWithCode = async (code, scope) => {
  const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;
  try {
    const req = await fetch(`${url}/services/v2/oauth/sso/access_token`, {
      method: "POST",
      cache: "no-store",
      headers: {
        apiKey: process.env.SSO_APIKEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, scope }),
    });

    const result = await req.json();
    return {
      response: result,
    };
  } catch (err) {
    return {
      response: {
        status: false,
        message: `Gagal menghubungi server ${url} (${err.message})`,
      },
    };
  }
};

// @ts-ignore
export const userinfos = async (access_token) => {
  const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;
  try {
    const req = await fetch(`${url}/services/v2/oauth/sso/userinfo`, {
      method: "POST",
      headers: {
        apiKey: process.env.SSO_APIKEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token
      })
    });

    const result = await req.json();
    return {
      response: result,
    };
  } catch (err) {
    return {
      response: {
        status: false,
        message: `Gagal menghubungi server ${url} (${err.message})`,
      },
    };
  }
};
