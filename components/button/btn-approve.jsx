"use client";

import { useSpinnerContext } from "@/lib/context/spinner-context";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { Button, Divider } from "@nextui-org/react";
import { useModalContext } from "@/lib/context/modal-context";
import { ModalPeremajaanApprove } from "../modal/modal-peremajaan-approve";
import toast from "react-hot-toast";

export const BtnApprove = () => {
  const { isOpen, setIsOpen } = useModalContext();
  const { setIsSpinner } = useSpinnerContext();

  async function handleApprove(e) {
    setIsSpinner(true);
    toast.loading("Sending ...", {
      id: "Toaster",
    });
    setTimeout(() => {
      setIsSpinner(false);
      toast.success("Data berhasil dikirim", {
        id: "Toaster",
      });
    }, 5000);
  }
  return (
    <>
      <ModalPeremajaanApprove
        isOpenModal={isOpen}
        onClose={() => setIsOpen(false)}
        handleApprove={handleApprove}
      />
      <Button color="primary" variant="shadow" onPress={() => setIsOpen(true)}>
        <HandThumbUpIcon className="size-5 text-white" />
        <Divider orientation="vertical" />
        Approve
      </Button>
    </>
  );
};
