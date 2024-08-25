"use client";

import { RollbackPegawai } from "@/dummy/post-data-pegawai";
import { UserMinusIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const BtnRollBackPNS = ({ data }) => {
  const router = useRouter();
  const { mutate: rollbackFn, isPending: rollbackIsPending } = useMutation({
    mutationKey: ["rollbackPegawaai"],
    mutationFn: async (body) => {
      const res = await RollbackPegawai(body);
      return res;
    },
  });

  useEffect(() => {
    if (rollbackIsPending) {
      toast.loading(`Sending ...`, {
        id: "Toaster",
      });
    }
  }, [rollbackIsPending]);

  function handleRollback() {
    const RAWJSON = {
      nip: data.nip,
      status: "ENTRI",
    };
    // @ts-ignore
    rollbackFn(RAWJSON, {
      onSuccess: (response) => {
        if (response.status === false || !response.status) {
          return toast.error(`Terjadi Kesalahan ${response.message}`, {
            id: "Toaster",
          });
        }
        toast.success(response.message, {
          id: "Toaster",
        });
        router.refresh();
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
        isLoading={rollbackIsPending}
        isDisabled={rollbackIsPending}
        color={rollbackIsPending ? "secondary" : "danger"}
        variant="shadow"
        onPress={() => handleRollback()}>
        <UserMinusIcon className="size-5 text-white" />
        Rollback
      </Button>
    </>
  );
};
