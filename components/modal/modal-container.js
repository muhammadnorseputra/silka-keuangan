"use client";

import { Modal } from "@nextui-org/react";

export default function ModalContainer({
  isOpenModal = false,
  onClose,
  children,
  ...args
}) {
  return (
    <>
      <Modal
        {...args}
        aria-hidden="true"
        isOpen={isOpenModal}
        onClose={onClose}
        isDismissable={false}
        isKeyboardDismissDisabled={true}>
        {children}
      </Modal>
    </>
  );
}
