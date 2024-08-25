"use client";

export const SearchPegawai = async ({ jenis, nipnama }) => {
  const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;
  try {
    let res = await fetch(
      `${url}/services/PegawaiWithBasicAuth/searchPegawai?jenis=${jenis}&nipnama=${nipnama}&apiKey=bkpsdm6811`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let json = await res.json();
    return json;
  } catch (err) {
    return {
      status: false,
      message: `Connection failed ${url} (${err})`,
      data: [],
    };
  }
};
