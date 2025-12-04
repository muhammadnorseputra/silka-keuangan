"use client";

import { deleteCookie, hasCookie } from "cookies-next";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  useSwitch,
} from "@nextui-org/react";
import { useModalContext } from "@/lib/context/modal-context";
import ModalContainer from "../modal/modal-container";
import { MoonIcon, PhotoIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
export const BtnProfile = ({ profile, size = "md" }) => {
  const { isOpen, setIsOpen } = useModalContext();
  const { theme, setTheme } = useTheme();
  const { picture, nama_lengkap, level } = profile?.data;

  const handleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const handleLogout = () => {
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
        // backdrop="blur"
        closeOnSelect={true}>
        <DropdownTrigger>
          <Avatar
            showFallback
            fallback={
              <PhotoIcon
                className="animate-pulse size-8 text-default-500"
                fill="currentColor"
              />
            }
            isBordered
            as="button"
            className="transition-transform"
            color="default"
            name={nama_lengkap}
            // @ts-ignore
            size={size}
            src="/assets/user-286.svg"
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          aria-hidden="true"
          variant="solid"
          closeOnSelect={false}>
          <DropdownItem
            key="profile"
            className="gap-2 h-14"
            textValue="profile">
            <p className="font-semibold">Signed in as ({level})</p>
            <p className="font-semibold">{nama_lengkap}</p>
          </DropdownItem>
          <DropdownSection
            title="Preferences"
            aria-label="preferences"
            showDivider>
            <DropdownItem
              key="mode"
              color="default"
              closeOnSelect={false}
              textValue="mode">
              <Switch
                isSelected={theme === "dark" ? true : false}
                size="sm"
                color="warning"
                name="mode"
                onChange={handleTheme}
                thumbIcon={({ isSelected }) =>
                  isSelected ? (
                    <SunIcon className="size-6 text-amber-400" />
                  ) : (
                    <MoonIcon className="size-6" />
                  )
                }>
                Ubah Tampilan UI
              </Switch>
            </DropdownItem>
          </DropdownSection>
          <DropdownItem
            key="logout"
            color="danger"
            textValue="logout"
            onPress={() => setIsOpen(true)}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <ModalContainer
        backdrop="blur"
        placement="center"
        isOpenModal={isOpen}
        onClose={() => setIsOpen(false)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            System says !
          </ModalHeader>
          <ModalBody>
            <p>Apakah anda yakin akan keluar dari system ?</p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setIsOpen(false)}>
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
