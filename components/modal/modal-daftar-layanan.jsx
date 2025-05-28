"use client";

import { encrypt } from "@/helpers/encrypt";
import { useModalDaftarLayananContext } from "@/lib/context/modal-daftar-layanan-context";
import {
  UserPlusIcon,
  DocumentCheckIcon,
  DocumentCurrencyDollarIcon,
  SparklesIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Listbox,
  ListboxItem,
  ListboxSection,
} from "@nextui-org/react";
import { useRouter } from "next-nprogress-bar";

export default function ModalLayanan({ isOpenModal = false, onClose }) {
  const { data, jenis } = useModalDaftarLayananContext();
  const router = useRouter();

  if (data === null) {
    return;
  }

  const { nip } = data;

  return (
    <>
      <Modal
        aria-hidden="true"
        backdrop="opaque"
        classNames={{
          backdrop: "bg-white/95 dark:bg-blue-800/90 backdrop-opacity-20",
        }}
        isOpen={isOpenModal}
        onClose={onClose}
        size="lg"
        // radius="none"
        shadow="lg"
        placement="center"
        isDismissable={false}
        isKeyboardDismissDisabled={false}>
        <ModalContent>
          <ModalHeader className="flex flex-col bg-gray-50 dark:bg-gray-800">
            <div>Pilih Layanan Integrasi</div>
            <div className="text-sm font-normal text-gray-400">
              Silahkan pilih menu layanan yang tersedia.
            </div>
          </ModalHeader>
          <ModalBody>
            <Listbox
              aria-label="Actions"
              variant="bordered"
              color="primary"
              selectionMode="single">
              <ListboxSection title="Peremajaan" showDivider>
                <ListboxItem
                  key="peremajaan"
                  onClick={() => {
                    if (jenis === "PNS") {
                      return router.push(
                        `/app-module/pegawai/peremajaan/${encrypt(
                          nip,
                          "bkpsdm"
                        )}`
                      );
                    }
                    router.push(
                      `/app-module/pppk/peremajaan/${encrypt(nip, "bkpsdm")}`
                    );
                  }}
                  description="Peremajaan Data"
                  startContent={
                    <UserPlusIcon className="text-blue-600 size-8" />
                  }>
                  Peremajaan
                </ListboxItem>
                <ListboxItem
                  key="verval"
                  onPressUp={() => {
                    return;
                  }}
                  onClick={() => {
                    if (jenis === "PNS") {
                      return router.push(
                        `/app-module/pegawai/verval/${encrypt(nip, "bkpsdm")}`
                      );
                    }
                    router.push(
                      `/app-module/pppk/verval/${encrypt(nip, "bkpsdm")}`
                    );
                  }}
                  description="Verifikasi dan Validasi"
                  startContent={
                    <DocumentCheckIcon className="text-green-500 size-8" />
                  }>
                  Verval Data
                </ListboxItem>
              </ListboxSection>
              <ListboxSection title="Layanan Integrasi">
                <ListboxItem
                  hideSelectedIcon={jenis === "PPPK"}
                  key="kgb"
                  onClick={() => {
                    if (jenis === "PNS") {
                      return router.push(
                        `/app-module/pegawai/kgb/${encrypt(nip, "bkpsdm")}`
                      );
                    }

                    router.push(
                      `/app-module/pppk/kgb/${encrypt(nip, "bkpsdm")}`
                    );
                  }}
                  description="Verifikasi dan Kirim"
                  startContent={
                    <DocumentCurrencyDollarIcon className="text-red-400 size-8" />
                  }>
                  Proses Kenaikan Gaji Berkala
                </ListboxItem>
                <ListboxItem
                  isDisabled={jenis === "PPPK"}
                  hideSelectedIcon={jenis === "PPPK"}
                  key="kp"
                  onClick={() => {
                    if (jenis === "PNS") {
                      return router.push(
                        `/app-module/pegawai/pangkat/${encrypt(nip, "bkpsdm")}`
                      );
                    }

                    router.push(
                      `/app-module/pppk/kgb/${encrypt(nip, "bkpsdm")}`
                    );
                  }}
                  description="Verifikasi dan Kirim"
                  startContent={
                    <SparklesIcon className="size-8 text-amber-400" />
                  }>
                  Proses Kenaikan Pangkat
                </ListboxItem>
                <ListboxItem
                  key="tpp"
                  onClick={() => {
                    if (jenis === "PNS") {
                      return router.push(
                        `/app-module/pegawai/tpp/${encrypt(nip, "bkpsdm")}`
                      );
                    }
                    router.push(
                      `/app-module/pppk/tpp/${encrypt(nip, "bkpsdm")}`
                    );
                  }}
                  description="Proses Tambahan Penghasilan Pegawai"
                  startContent={
                    <CurrencyDollarIcon className="text-green-400 size-8" />
                  }>
                  Proses TPP
                </ListboxItem>
              </ListboxSection>
            </Listbox>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
