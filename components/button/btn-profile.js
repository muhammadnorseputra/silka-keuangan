"use client";

import { deleteCookie, hasCookie } from "cookies-next";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useModalContext } from "@/lib/context/modal-context";
import ModalContainer from "../modal/modal-container";
export const BtnProfile = ({ profile, size = "md" }) => {
  const { isOpen, setIsOpen } = useModalContext();
  const { picture, nama_lengkap, level } = profile?.data;
  const handleLogout = async () => {
    deleteCookie("USER_SILKA");
    let isCookie = hasCookie("USER_SILKA");
    if (isCookie == false) {
      window.location.replace("/auth");
      setIsOpen(false);
    }
  };

  return (
    <>
      <Dropdown
        aria-haspopup="dialog"
        aria-label="Menu"
        placement="bottom-end"
        backdrop="blur">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            name="Jason Hughes"
            // @ts-ignore
            size={size}
            src={picture}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="solid">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as ({level})</p>
            <p className="font-semibold">{nama_lengkap}</p>
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            onPress={() => setIsOpen(true)}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <ModalContainer
        backdrop="blur"
        placement="center"
        isOpenModal={isOpen}
        onClose={() => setIsOpen(false)}
      >
         <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            System says !
          </ModalHeader>
          <ModalBody>
            <p>Apakah anda yakin akan keluar dari system ?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => setIsOpen(false)}>
              Tidak
            </Button>
            <Button color="primary" onPress={handleLogout}>
              Yakin
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalContainer>
    </>
  );
};
