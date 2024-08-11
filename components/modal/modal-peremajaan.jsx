"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Code,
} from "@nextui-org/react";
import { AlertInfo, AlertWarning } from "../alert";

export const ModalPeremajaan = ({
  isOpenModal = false,
  onClose,
  handlePeremajaan,
}) => {
  return (
    <>
      <Modal
        size="lg"
        backdrop="opaque"
        isOpen={isOpenModal}
        onClose={onClose}
        isDismissable={false}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        isKeyboardDismissDisabled={true}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            System says !
          </ModalHeader>
          <ModalBody>
            <AlertWarning
              title="Confirm"
              message="Apakah anda yakin data tersebut sudah benar ?"
            />
            <AlertInfo title="Info">
              Data yang anda kirim akan dikunci sementara dan dilakukan validasi
              oleh admin SKPD, Klik tombol <Code color="primary">Yakin</Code>{" "}
              untuk melanjutkan ...
            </AlertInfo>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Tidak
            </Button>
            <Button color="primary" onPress={handlePeremajaan}>
              Yakin
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
