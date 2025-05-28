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
// import dynamic from "next/dynamic";
import { AlertInfo, AlertWarning } from "../alert";
import { formatRupiah, formatTanggalIndonesia } from "@/helpers/cx";
import { DocumentCurrencyDollarIcon } from "@heroicons/react/24/solid";

// const MyPDF = dynamic(
//   () => import("../pdf/viewer").then((mod) => mod.PDFViewer),
//   {
//     ssr: false,
//     loading: () => (
//       <Skeleton className="rounded-lg">
//         <div className="w-full rounded-lg h-36 bg-default-300"></div>
//       </Skeleton>
//     ),
//   }
// );

export const ModalKgbProses = ({
  dataSilka,
  isOpenModal = false,
  onClose,
  handleSubmit,
  isPending,
  isJenisPegawai = "PNS",
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
          <ModalHeader className="flex flex-col items-center gap-1 shadow-lg sm:flex-row">
            <DocumentCurrencyDollarIcon className="size-8" />{" "}
            <div>VERIFIKASI USULAN KGB</div>
          </ModalHeader>
          <ModalBody>
            {/* <MyPDF src={berkas} /> */}
            {/* <MyPDF src={berkas} /> */}
            {/* <iframe
              allowFullScreen={true}
              height={600}
              src={`${berkas}#zoom=FitH`}
              sandbox="allow-scripts"
            /> */}
            <div className="grid grid-flow-row-dense grid-cols-4 gap-4 p-6">
              <div className="col-span-4 md:col-span-1">
                <div className="text-gray-400">GAJI BARU</div>
                <div className="text-xl font-bold text-green-600">
                  Rp. {formatRupiah(dataSilka.data.gapok_baru) ?? "-"}
                </div>
              </div>
              <div className="col-span-4 md:col-span-1">
                <div className="text-gray-400">GOLONGAN RUANG</div>
                <div className="font-bold">
                  {isJenisPegawai == "PNS"
                    ? dataSilka.data.pangkat_nama
                    : dataSilka.data.id_pangkat ?? "-"}{" "}
                  (
                  {isJenisPegawai == "PNS"
                    ? dataSilka.data.golru_nama
                    : dataSilka.data.nama_pangkat ?? "-"}
                  )
                </div>
              </div>
              <div className="col-span-4 md:col-span-1">
                <div className="text-gray-400">MASA KERJA TAHUN</div>
                <div className="font-bold">{dataSilka.data.mk_thn ?? "-"}</div>
              </div>
              <div className="col-span-4 md:col-span-1">
                <div className="text-gray-400">MASA KERJA BULAN</div>
                <div className="font-bold">{dataSilka.data.mk_bln ?? "-"}</div>
              </div>
              <div className="col-span-4 md:col-span-1">
                <div className="text-gray-400">TMT GAJI BARU</div>
                <div className="font-bold">
                  {formatTanggalIndonesia(dataSilka.data.tmt) ?? "-"}
                </div>
              </div>
              <div className="col-span-4 md:col-span-1">
                <div className="text-gray-400">TMT BERKALA BERIKUTNYA</div>
                <div className="font-bold">
                  {formatTanggalIndonesia(
                    isJenisPegawai == "PNS"
                      ? dataSilka.data.tmt_berikutnya
                      : dataSilka.data.tmt_gaji_berikutnya
                  ) ?? "-"}
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
