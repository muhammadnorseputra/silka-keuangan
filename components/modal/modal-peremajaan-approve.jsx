"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { AlertWarning } from "../alert";
export const ModalPeremajaanApprove = ({
  isOpenModal = false,
  onClose,
  handleApprove,
  isLoading,
}) => {
  return (
    <>
      <Modal
        size="lg"
        backdrop="opaque"
        isOpen={isOpenModal}
        onClose={onClose}
        isDismissable={false}
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
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Tidak
            </Button>
            <Button
              color="primary"
              isLoading={isLoading}
              isDisabled={isLoading}
              onPress={handleApprove}>
              Yakin
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
