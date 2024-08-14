'use client'
import { useModalContext } from "@/lib/context/modal-context";
import { ModalKgbProses } from "@/components/modal/modal-kgb-proses";
import { Button, Divider } from "@nextui-org/react";
import { CloudArrowUp } from "react-bootstrap-icons";

export default function BtnKgbConfirm({dataSilka}) {
    const { isOpen, setIsOpen } = useModalContext();

    function isConfirm() {
        setIsOpen(true)
    }
  
    async function handleSubmit(e) {
      alert('Oke')
    }

    const disabled = dataSilka.status === false ?? true;
  return (
    <>
    <ModalKgbProses dataSilka={dataSilka} isOpenModal={isOpen} onClose={() => setIsOpen(false)} handleSubmit={handleSubmit} />

    <Button onPress={isConfirm} color="primary" variant="shadow" isDisabled={disabled}>
        <CloudArrowUp className="size-5 text-white" />
        <Divider orientation="vertical" />
        Verifikasi
    </Button>
    </>
  )
}
