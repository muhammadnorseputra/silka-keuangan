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
  Chip,
  Skeleton,
} from "@nextui-org/react";
import dynamic from "next/dynamic";
import { AlertInfo, AlertWarning } from "../alert";
import { formatRupiah, formatTanggalIndonesia } from "@/helpers/cx";
import { DocumentCurrencyDollarIcon } from "@heroicons/react/24/solid";

const MyPDF = dynamic(
  () => import("../pdf/viewer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <Skeleton className="rounded-lg">
        <div className="h-36 w-full rounded-lg bg-default-300"></div>
      </Skeleton>
    ),
  }
);

export const ModalPangkatProses = ({
  PANGKAT,
  isOpenModal = false,
  onClose,
  handleSubmit,
  isPending,
}) => {
  return (
    <>
      <Modal
        aria-hidden="true"
        size="5xl"
        backdrop="blur"
        isOpen={isOpenModal}
        onClose={onClose}
        placement="center"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        shadow="lg"
        scrollBehavior="outside">
        <ModalContent>
          <ModalHeader className="flex flex-col sm:flex-row items-center gap-1 shadow-lg">
            <DocumentCurrencyDollarIcon className="size-8" />{" "}
            <div>VERIFIKASI USULAN KENAIKAN PANGKAT</div>
          </ModalHeader>
          <ModalBody>
            {/* <MyPDF src={berkas} /> */}
            <MyPDF src={PANGKAT.data.row.berkas} />
            {/* <iframe
              allowFullScreen={true}
              height={600}
              src={`${berkas}#zoom=FitH`}
              sandbox="allow-scripts"
            /> */}
            <div className="grid grid-flow-row-dense grid-cols-4 gap-4 p-6">
              <div className="col-span-4 md:col-span-1">
                <div className="text-gray-400">GAJI BARU</div>
                <div className="font-bold text-green-600 text-xl">
                  Rp. {formatRupiah(PANGKAT.data.row.gapok) ?? "-"}
                </div>
              </div>
              <div className="col-span-4 md:col-span-1">
                <div className="text-gray-400">GOLONGAN RUANG</div>
                <div className="font-bold">
                  {PANGKAT.data.row.nama_pangkat ?? "-"} (
                  {PANGKAT.data.row.nama_golru ?? "-"})
                </div>
              </div>
              <div className="col-span-4 md:col-span-1">
                <div className="text-gray-400">MASA KERJA BULAN</div>
                <div className="font-bold">
                  {PANGKAT.data.row.mkgol_thn ?? "-"}
                </div>
              </div>
              <div className="col-span-4 md:col-span-1">
                <div className="text-gray-400">MASA KERJA TAHUN</div>
                <div className="font-bold">
                  {PANGKAT.data.row.mkgol_bln ?? "-"}
                </div>
              </div>
              <div className="col-span-4 md:col-span-1">
                <div className="text-gray-400">TMT GAJI BARU</div>
                <div className="font-bold">
                  {formatTanggalIndonesia(PANGKAT.data.row.tmt) ?? "-"}
                </div>
              </div>
              <div className="col-span-4 md:col-span-1">
                <div className="text-gray-400">TGL SK</div>
                <div className="font-bold">
                  {formatTanggalIndonesia(PANGKAT.data.row.tgl_sk) ?? "-"}
                </div>
              </div>
            </div>
            <AlertWarning title="Confirm">
              Silahkan lakukan verifikasi jika data tersebut sudah benar, dengan
              klik tombol
              <Chip as="span" color="primary" variant="faded" className="mx-2">
                Kirim
              </Chip>{" "}
              untuk proses selanjutnya ke Badan Keuangan Daerah
            </AlertWarning>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Tidak
            </Button>
            <Button
              color="primary"
              isLoading={isPending}
              isDisabled={isPending}
              onPress={handleSubmit}>
              Kirim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
