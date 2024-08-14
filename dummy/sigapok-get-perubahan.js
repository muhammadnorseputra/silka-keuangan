import { sigapok_headers } from "@/lib/req-headers";

export const getPerubahanData = async (
  token,
  jenis_kenaikan = 2,
  nip_pegawai,
  tmt_sk,
  status_peg_id = 2
) => {
  const url = process.env.NEXT_PUBLIC_GAPOK_BASE_URL;
  const path = process.env.NEXT_PUBLIC_GAPOK_PATH;
  const headers = sigapok_headers(token);
  try{
    const req = await fetch(
      `${url}/${path}/getPerubahanData?jenis_kenaikan=${jenis_kenaikan}&nip_baru=${nip_pegawai}&tmt_sk=${tmt_sk}&status_pegawai_id=${status_peg_id}`,
      {
        method: "GET",
        cache: "no-store",
        headers,
        next: {
          tags: ["getPerubahanData"],
        },
      }
    );
  
    const result = await req.json();
    return result;
  
  } catch(err) {
    return {
      status: false,
      message: `Gagal menghubungkan ke server ${url} (${err})`
    }
  }
};
