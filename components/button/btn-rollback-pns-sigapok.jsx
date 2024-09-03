"use client";

import { DeletePNSSigapok } from "@/dummy/sigapok-delete-pns";
import { UserMinusIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const BtnRollBackPNSSigapok = ({ sigapok, data }) => {
  const router = useRouter();
  const { mutate: rollbackFn, isPending: rollbackIsPending } = useMutation({
    mutationKey: ["rollback.pns.sigapok"],
    mutationFn: async (req) => {
      const res = await DeletePNSSigapok(sigapok.access_token, req);
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
    };
    // @ts-ignore
    rollbackFn(RAWJSON, {
      onSuccess: (response) => {
        if (response.success === false || !response.success) {
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
      fullWidth
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
