"use server";
export const PostDataPPPK = async (body) => {
  const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;
  try {
    const req = await fetch(`${url}/services/simgaji/SavePegawai/pppk`, {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: "Basic QmFsYW5nYW5rYWI6Ymtwc2RtQDIwMjI=",
        "Content-Type": "application/x-www-form-urlencoded",
        apiKey: "bkpsdm6811",
      },
      body: new URLSearchParams(body),
      next: {
        tags: ["postDataPegawaiP3K"],
      },
    });

    const result = await req.json();
    return result;
  } catch (err) {
    return {
      status: false,
      message: `Connection failed ${url} (${err})`,
      data: [],
    };
  }
};
