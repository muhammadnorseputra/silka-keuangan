"use client";

import { kirimTPP } from "@/dummy/sigapok-post-tpp";
import revalidateTag from "@/lib/revalidateTags";
import { Button, Divider } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CloudArrowUp } from "react-bootstrap-icons";
import toast from "react-hot-toast";

export const BtnKirimTPP = ({
  access_token,
  nip,
  bulan,
  tahun,
  tpp_diterima,
  simgaji_id_skpd,
  simgaji_id_satker,
  silka,
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (body) => {
      const response = await kirimTPP(access_token, body);
      return response;
    },
    mutationKey: ["KirimTPP"],
  });

  useEffect(() => {
    if (isPending) {
      toast.loading(`Sending ...`, {
        id: "Toaster",
      });
    }
  }, [isPending]);

  function handleKirim() {
    const PERIODE_TPP = `${bulan.toString().padStart(2, "0")}${tahun}`;
    const TGL_BAYAR = `${tahun}-${bulan.toString().padStart(2, "0")}-${bulan
      .toString()
      .padStart(2, "0")}`;
    const BODY = {
      NIP: nip,
      PERIODE_TPP,
      TGL_BAYAR,
      KD_SKPD: simgaji_id_skpd,
      KD_SATKER: simgaji_id_satker,
      JML_TPP: tpp_diterima,
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
        revalidateTag("getTppSigapok");
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
        color="primary"
        variant="shadow"
        onPress={handleKirim}
        isLoading={isPending}
        isDisabled={isPending}>
        <CloudArrowUp className="size-5 text-white" />
        <Divider orientation="vertical" />
        Kirim
      </Button>
    </>
  );
};
