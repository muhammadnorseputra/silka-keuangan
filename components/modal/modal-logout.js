"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function ModalLogout({
  isOpenModal = false,
  onClose,
  handleLogout,
}) {
  return (
    <>
      <Modal
        aria-hidden="true"
        backdrop="blur"
        isOpen={isOpenModal}
        onClose={onClose}
        isDismissable={false}
        isKeyboardDismissDisabled={true}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            System says !
          </ModalHeader>
          <ModalBody>
            <p>Apakah anda yakin akan keluar dari system ?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Tidak
            </Button>
            <Button color="primary" onPress={handleLogout}>
              Yakin
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
