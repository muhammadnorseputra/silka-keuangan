"use client";

import { kirimTPP } from "@/dummy/sigapok-post-tpp";
import { Button, Divider } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { CloudArrowUp } from "react-bootstrap-icons";
import toast from "react-hot-toast";

export const BtnKirimTPP = ({
  access_token,
  nip,
  bulan,
  tahun,
  tpp_diterima,
  silka,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: async (body) => {
      const response = await kirimTPP(access_token, body);
      return response;
    },
    mutationKey: ["KirimTPP"],
  });
  function handleKirim() {
    setIsLoading(true);
    if (isPending) {
      toast.loading("Sending ...", {
        id: "Toaster",
      });
      return;
    }
    const PERIODETPP = `${bulan}${tahun}`;
    const TGL_BAYAR = `${bulan}-${bulan}-${tahun}`;
    const BODY = {
      // NIP: nip,
      // PERIODETPP,
      // TGL_BAYAR,
      // KD_SKPD,
      // KD_SATKER,
      // JML_TPP: tpp_diterima,
      // ADDUSER: silka?.data.nip,
      // STATUS: "0"
    };
    // @ts-ignore
    mutate(BODY, {
      onSuccess: (data) => {
        setIsLoading(false);
      },
      onError: (err) => {
        setIsLoading(false);
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
        isDisabled={isLoading}>
        <CloudArrowUp className="size-5 text-white" />
        <Divider orientation="vertical" />
        Kirim
      </Button>
    </>
  );
};
