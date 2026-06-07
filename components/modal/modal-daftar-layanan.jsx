"use client";

import { cx } from "@/helpers/cx";
import { encrypt } from "@/helpers/encrypt";
import { useModalDaftarLayananContext } from "@/lib/context/modal-daftar-layanan-context";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import {
  UserPlusIcon,
  DocumentCheckIcon,
  DocumentCurrencyDollarIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  SquaresPlusIcon,
  ArrowRightIcon,
  ChevronRightIcon,
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
  Spinner,
} from "@nextui-org/react";
import { useRouter } from "next-nprogress-bar";
import { useTransition } from "react";
import toast from "react-hot-toast";

export default function ModalLayanan({ isOpenModal = false, onClose }) {
  const { data, jenis } = useModalDaftarLayananContext();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  if (data === null) {
    return;
  }

  const { nip } = data;

  return (
    <>
      <Modal
      scrollBehavior="inside"
        aria-hidden="true"
        backdrop="blur"
        isOpen={isOpenModal}
        onClose={onClose}
        size="xl"
        // radius="lg"
        shadow="lg"
        placement="center"
        isDismissable={false}
        isKeyboardDismissDisabled={false}
        classNames={{
          closeButton:
            "top-4 right-5 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-200/50 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 focus:outline-none focus:ring-offset-2 data-[state=open]:bg-gray-100/50",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex items-center justify-start gap-x-4 ">
            <div className="inline-flex items-center justify-center p-2 text-center bg-blue-100 rounded-lg">
              <SquaresPlusIcon className="text-blue-500 w-7 h-7" />
            </div>
            <div className="flex flex-col items-start justify-start">
              <div>Pilih Layanan Integrasi</div>
              <div className="text-sm font-normal text-gray-400">
                Silahkan pilih layanan yang tersedia.
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <section>
              <p className="text-xs font-bold text-blue-600">LAYANAN PEREMAJAAN DATA</p>
              <div className="grid w-full grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
                <Button
                  size="lg"
                  startContent={
                    <div className="p-3 bg-blue-100 rounded-full">
                        <UserPlusIcon className="text-blue-600 size-8" />
                    </div>
                  }
                  endContent={
                    isPending ? <Spinner size="sm" /> : <ChevronRightIcon className="text-gray-800 size-8" />
                  }
                  variant="bordered"
                  color="primary"
                  disableAnimation
                  className="px-4 py-12 border-gray-200 rounded-lg shadow-sm border-1"
                  onPress={() => {
                    startTransition(() => {
                      if (jenis === "PNS") {
                        return router.push(
                          `/app-module/pegawai/peremajaan/${encrypt(
                            nip,
                            "bkpsdm",
                          )}`,
                        );
                      }
                      router.push(
                        `/app-module/pppk/peremajaan/${encrypt(nip, "bkpsdm")}`,
                      );
                    });
                  }}
                  isDisabled={isPending}
                >
                  <div className="flex flex-col items-start justify-start text-start">
                    <span className="text-sm font-bold text-gray-800">
                      Peremajaan Data
                    </span>
                    <span className="text-xs text-gray-500 text-wrap">
                      Peremajaan dan pemutakhiran data pegawai
                    </span>
                  </div>
                </Button>
                <Button
                  size="lg"
                  startContent={
                    <div className="p-3 bg-green-100 rounded-full">
                      <DocumentCheckIcon className="text-green-600 size-8" />
                    </div>
                  }
                  endContent={
                    isPending ? <Spinner size="sm" /> : <ChevronRightIcon className="text-gray-800 size-8" />
                  }
                  variant="bordered"
                  color="primary"
                  disableAnimation
                  className="px-4 py-12 border-gray-200 rounded-lg shadow-sm border-1"
                  onPress={() => {
                    startTransition(() => {
                      if (jenis === "PNS") {
                        return router.push(
                          `/app-module/pegawai/verval/${encrypt(nip, "bkpsdm")}`,
                        );
                      }
                      router.push(
                        `/app-module/pppk/verval/${encrypt(nip, "bkpsdm")}`,
                      );
                    });
                  }}
                  isDisabled={isPending}
                >
                  <div className="flex flex-col items-start justify-start text-start">
                    <span className="text-sm font-bold text-gray-800">
                      Verval Data
                    </span>
                    <span className="text-xs text-gray-500 text-wrap">
                      Verifikasi dan validasi data pegawai
                    </span>
                  </div>
                </Button>
              </div>
            </section>
            <section className="mt-2">
              <p className="text-xs font-bold text-purple-600">
                LAYANAN INTEGRASI
              </p>
              <div className="flex flex-col items-center w-full mt-2">
                <Button
                  size="lg"
                  startContent={
                    <div className="p-2 bg-red-100 rounded-lg">
                      <DocumentCurrencyDollarIcon className="text-red-400 size-8" />
                    </div>
                  }
                  endContent={
                    isPending ? <Spinner size="sm" /> : <ChevronRightIcon className="text-gray-800 size-5" />
                  }
                  variant="bordered"
                  color="primary"
                  disableAnimation
                  className="inline-flex flex-row items-center justify-between w-full px-2 py-10 border-gray-200 rounded-t-lg rounded-b-none shadow-sm border-1"
                  onPress={() => {
                    startTransition(() => {
                      if (jenis === "PNS") {
                        return router.push(
                          `/app-module/pegawai/kgb/${encrypt(nip, "bkpsdm")}`,
                        );
                      }
                      router.push(
                        `/app-module/pppk/kgb/${encrypt(nip, "bkpsdm")}`,
                      );
                    });
                  }}
                  isDisabled={isPending}
                >
                  <div className="flex flex-col items-start justify-start text-start">
                    <span className="text-sm font-bold text-gray-800">
                      Proses KGB
                    </span>
                    <span className="text-xs text-gray-500 text-wrap">
                      Verifikasi dan pengiriman data untuk proses kenaikan gaji
                      berkala pegawai
                    </span>
                  </div>
                </Button>
                <Button
                  size="lg"
                  startContent={
                    <div className="p-2 rounded-lg bg-amber-100">
                      <SparklesIcon className="text-amber-400 size-8" />
                    </div>
                  }
                  endContent={
                    isPending && jenis === "PNS" ? <Spinner size="sm" /> : <ChevronRightIcon className="text-gray-800 size-5" />
                  }
                  variant="bordered"
                  color="primary"
                  disableAnimation
                  className={cx(`inline-flex flex-row items-center justify-between w-full px-2 py-10 border-gray-200 rounded-none shadow-sm border-1`,
                    jenis === "PPPK" && "cursor-not-allowed before:content-['(Unavailable)'] before:font-bold before:absolute before:inset-0 before:flex before:items-center before:justify-center before:text-xs before:text-black before:bg-white/80 before:backdrop-blur-lg"
                  )}
                  isDisabled={jenis === "PPPK" || isPending}
                  onPress={() => {
                    startTransition(() => {
                    if (jenis === "PNS") {
                      return router.push(
                        `/app-module/pegawai/pangkat/${encrypt(nip, "bkpsdm")}`,
                      );
                    }

                    router.push(
                      `/app-module/pppk/kgb/${encrypt(nip, "bkpsdm")}`,
                    );
                    });
                  }}
                >
                  <div className="flex flex-col items-start justify-start text-start">
                    <span className="text-sm font-bold text-gray-800">
                      Proses Kenaikan Pangkat
                    </span>
                    <span className="pr-4 text-xs text-gray-500">
                      Verifikasi dan pengiriman data untuk proses kenaikan
                      pangkat pegawai
                    </span>
                  </div>
                </Button>
                <Button
                  size="lg"
                  startContent={
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CurrencyDollarIcon className="text-green-400 size-8" />
                    </div>
                  }
                  endContent={
                    isPending ? <Spinner size="sm" /> : <ChevronRightIcon className="text-gray-800 size-5" />
                  }
                  variant="bordered"
                  color="primary"
                  disableAnimation
                  className="inline-flex flex-row items-center justify-between w-full px-2 py-10 border-gray-200 rounded-t-none rounded-b-lg shadow-sm text-start border-1"
                  onPress={() => {
                    startTransition(() => {
                    if (jenis === "PNS") {
                      return router.push(
                        `/app-module/pegawai/tpp/${encrypt(nip, "bkpsdm")}`,
                      );
                    }
                    router.push(
                      `/app-module/pppk/tpp/${encrypt(nip, "bkpsdm")}`,
                    );
                    });
                  }}
                  isDisabled={isPending}
                >
                  <div className="flex flex-col items-start justify-start text-start">
                    <span className="text-sm font-bold text-gray-800">
                      Proses TPP
                    </span>
                    <span className="text-xs text-gray-500 text-wrap">
                      Verifikasi dan pengiriman data untuk proses tambahan
                      penghasilan pegawai
                    </span>
                  </div>
                </Button>
              </div>
            </section>
            {/* <Listbox
              aria-label="Actions"
              variant="bordered"
              color="primary"
              selectionMode="single">
              <ListboxSection title="PEREMAJAAN DATA">
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
                  <span className="text-gray-800">Peremajaan Data</span>
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
            </Listbox> */}
          </ModalBody>
          <ModalFooter className="flex items-center justify-between mt-2 rounded-b-xl bg-blue-50 dark:bg-blue-800/30">
            <div className="inline-flex items-center gap-x-3">
              <InformationCircleIcon className="text-blue-400 size-5" />
              <span className="text-xs text-gray-400 dark:text-gray-400">
                Pilih salah satu layanan.
              </span>
            </div>
            <Button
              color="primary"
              variant="bordered"
              onPress={onClose}
              className="border-1 border-blue-500/50"
            >
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
