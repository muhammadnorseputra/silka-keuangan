"use client";

import { deleteCookie, hasCookie } from "cookies-next";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import ModalLogout from "../modal/modal-logout";
import { useModalContext } from "@/lib/context/modal-context";
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
      <Dropdown placement="bottom-end">
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
        <DropdownMenu aria-label="Profile Actions" variant="flat">
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

      <ModalLogout
        isOpenModal={isOpen}
        onClose={() => setIsOpen(false)}
        handleLogout={handleLogout}
      />
    </>
  );
};
