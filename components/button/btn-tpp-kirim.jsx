"use client";

import { UpdateSync } from "@/dummy/post-data-tpp";
import { kirimTPP } from "@/dummy/sigapok-post-tpp";
import { getCurrentDate } from "@/helpers/datetime";
import revalidateTag from "@/lib/revalidateTags";
import { Button, Divider } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CloudArrowUp } from "react-bootstrap-icons";
import toast from "react-hot-toast";

export const BtnKirimTPP = ({
  access_token,
  id,
  nip,
  nipppk,
  bulan,
  tahun,
  tpp_diterima,
  real_bk,
  real_pk,
  real_kk,
  real_kp,
  jml_pph,
  jml_bpjs,
  jml_iwp,
  jml_pot,
  total_kotor,
  simgaji_id_skpd,
  simgaji_id_satker,
  silka,
  jenis_asn,
  ...args
}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (body) => {
      // Kirim TPP ke sigapok
      const response = await kirimTPP(access_token, body);
      if (response.success === true) {
        // Update status is_sync pada table tppng (silka)
        await UpdateSync({
          id,
          is_sync: "1",
        });
      }
      return response;
    },
    mutationKey: ["KirimTPP"],
  });

  useEffect(() => {
    if (isPending) {
      toast.loading(`Mengirim data ...`, {
        id: "Toaster",
      });
    }
  }, [isPending]);

  function handleKirim() {
    const PERIODE_TPP = `${bulan.toString().padStart(2, "0")}${tahun}`;
    // TGL BAYAR MENGGUNAKAN PERIODE SILKA
    const TGL_BAYAR = `${tahun}-${bulan.toString().padStart(2, "0")}-${bulan
      .toString()
      .padStart(2, "0")}`;
    // TGL BAYAR SESUAI TGL KIRIM
    const TGL_KIRIM = getCurrentDate();
    const BODY = {
      NIP: jenis_asn === "PPPK" ? nipppk : nip,
      PERIODE_TPP,
      TGL_BAYAR: TGL_KIRIM,
      KD_SKPD: simgaji_id_skpd,
      KD_SATKER: simgaji_id_satker,
      JML_TPP: tpp_diterima,
      BEBAN_KERJA: real_bk,
      PRESTASI_KERJA: real_pk,
      KONDISI_KERJA: real_kk,
      KELANGKAAN: real_kp,
      TJ_PPH: jml_pph,
      TJ_BPJS: jml_bpjs,
      KOTOR: total_kotor,
      POT_PPH: jml_pph,
      POT_BPJS: jml_bpjs,
      POT_IWP1: jml_iwp,
      JLH_POT: jml_pot,
      ADDUSER: silka?.data.nip,
      STATUS: "0",
    };
    // @ts-ignore
    mutate(BODY, {
      onSuccess: (data) => {
        if (data.success === false || !data.success) {
          toast.error(`${data.status} (${JSON.stringify(data.message)})`, {
            id: "Toaster",
          });
          return;
        }
        toast.success(data.message, {
          id: "Toaster",
        });
        queryClient.invalidateQueries({
          queryKey: ["queryTPP"],
        });
        queryClient.invalidateQueries({
          queryKey: ["queryTPPPK"],
        });
        queryClient.invalidateQueries({
          queryKey: ["count.sigapok.tpp"],
        });
        revalidateTag("datapegawai");
        revalidateTag("datap3k");
      },
      onError: (err) => {
        toast.error(err.message, {
          id: "Toaster",
        });
      },
    });
  }

  return (
    <>
      <Button
        {...args}
        color="primary"
        variant="shadow"
        onPress={handleKirim}
        isLoading={isPending}
        isDisabled={isPending}>
        <CloudArrowUp className="text-white size-5" />
        <Divider orientation="vertical" />
        Kirim
      </Button>
    </>
  );
};
