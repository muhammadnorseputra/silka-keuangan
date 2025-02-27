import { AES } from "crypto-js";
import { cookies } from "next/headers";
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
    state !== req.cookies.get("sso_state")?.value ||
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
  const response = await callback(code, scope);
  if (!response.response.status) return Response.json(response);

  cookies().set(
    "USER_SILKA",
    AES.encrypt(
      // @ts-ignore
      JSON.stringify({ data: response.response.data.userinfo }),
      "Bkpsdm@6811#"
    ).toString(),
    {
      maxAge: 3600,
    }
  );
  return Response.redirect(`${fullHost}/app-integrasi/dashboard`, 302);
  // return Response.json(response);
}

export const callback = async (code, scope) => {
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

export const exchange_access_token = async (code, scope) => {
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

export const userinfos = async ({ access_token }) => {
  const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;
  try {
    const req = await fetch(`${url}/services/v2/oauth/sso/userinfo`, {
      method: "POST",
      headers: {
        apiKey: process.env.SSO_APIKEY,
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
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
