"use client";

import { DeleteP3k } from "@/dummy/sigapok-delete-pppk";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Button, Divider } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const BtnRollBackPPPK = ({ sigapok, pppk }) => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async (req) => {
      const response = await DeleteP3k(sigapok.access_token, req);
      return response;
    },
  });
  useEffect(() => {
    if (isPending) {
      toast.loading("Processing ...", {
        id: "Toaster",
      });
    }
  }, [isPending]);

  const handleRollback = () => {
    mutate(pppk.NIP, {
      onSuccess: (res) => {
        if (res.success === false || !res.success) {
          toast.error(res.message, {
            id: "Toaster",
          });
          return;
        }

        toast.success(res.message, {
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
  };

  return (
    <Button
      onPress={handleRollback}
      isLoading={isPending}
      isDisabled={isPending}
      color="danger"
      variant="shadow"
      startContent={<TrashIcon className="size-6" />}>
      <Divider orientation="vertical" /> Rollback
    </Button>
  );
};
