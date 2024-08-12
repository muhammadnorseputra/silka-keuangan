import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const PostDataPegawai = async (body) => {
  const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;
  try {
    const response = await axios.post(
      `${url}/services/PegawaiWithBasicAuth/simpan_simgaji_pegawai`,
      body,
      {
        headers: {
          Authorization: "Basic QmFsYW5nYW5rYWI6Ymtwc2RtQDIwMjI=",
          "Content-Type": "application/json",
          apiKey: "bkpsdm6811",
        },
      }
    );
    return response;
    // const req = await fetch(
    //   `${url}/services/PegawaiWithBasicAuth/simpan_simgaji_pegawai`,
    //   {
    //     method: "OPTIONS",
    //     headers: {
    //       Authorization: "Basic QmFsYW5nYW5rYWI6Ymtwc2RtQDIwMjI=",
    //       "Content-Type": "application/json",
    //       apiKey: "bkpsdm6811",
    //     },
    //     body: '{"nip":"198104072009041002","nama":"WENDY A TEST 1223"}',
    //     next: {
    //       tags: ["postDataPegawai"],
    //     },
    //   }
    // );

    // const result = await req.json();
    // return result;
  } catch (err) {
    return {
      status: false,
      message: `Gagal koneksi ke ${url} (${err})`,
      data: [],
    };
  }
};

export const useActionPegawai = (body) => {
  return useMutation({
    mutationKey: ["updatePegawai"],
    mutationFn: async (body) => {
      const updatePegawai = await PostDataPegawai(body);
      return updatePegawai;
    },
  });
};
