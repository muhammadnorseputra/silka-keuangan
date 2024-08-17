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
import { useSpinnerContext } from "@/lib/context/spinner-context";

export const ModalPeremajaanApprove = ({
  isOpenModal = false,
  onClose,
  handleApprove,
}) => {
  const { isSpinner } = useSpinnerContext();
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
              isLoading={isSpinner}
              isDisabled={isSpinner}
              onPress={handleApprove}>
              Yakin
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
