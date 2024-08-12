export const PostDataPegawai = async (body) => {
  const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;

  try {
    const req = await fetch(
      `${url}/services/PegawaiWithBasicAuth/simpan_simgaji_pegawai?apiKey=bkpsdm6811`,
      {
        method: "POST",
        cache: "no-store",
        credentials: "include",
        mode: "no-cors",
        headers: {
          Authorization: "Basic QmFsYW5nYW5rYWI6Ymtwc2RtQDIwMjI=",
          "Content-Type": "application/www-form-urlencoded",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
        next: {
          tags: ["postDataPegawai"],
        },
      }
    );

    const result = await req.json();
    return result;
  } catch (err) {
    return {
      status: false,
      message: `Gagal koneksi ke ${url} (${err})`,
      data: [],
    };
  }
};
