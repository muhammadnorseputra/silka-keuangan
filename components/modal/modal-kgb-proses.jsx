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
//         <div className="h-36 w-full rounded-lg bg-default-300"></div>
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
}) => {
  const {
    gapok_baru,
    golru_nama,
    berkas,
    pangkat_nama,
    mk_thn,
    mk_bln,
    tmt_berikutnya,
    tmt,
  } = dataSilka.data;
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
                <div className="font-bold text-green-600 text-xl">
                  Rp. {formatRupiah(gapok_baru) ?? "-"}
                </div>
              </div>
              <div className="col-span-4 md:col-span-1">
                <div className="text-gray-400">GOLONGAN RUANG</div>
                <div className="font-bold">
                  {pangkat_nama ?? "-"} ({golru_nama ?? "-"})
                </div>
              </div>
              <div className="col-span-4 md:col-span-1">
                <div className="text-gray-400">MASA KERJA TAHUN</div>
                <div className="font-bold">{mk_thn ?? "-"}</div>
              </div>
              <div className="col-span-4 md:col-span-1">
                <div className="text-gray-400">MASA KERJA BULAN</div>
                <div className="font-bold">{mk_bln ?? "-"}</div>
              </div>
              <div className="col-span-4 md:col-span-1">
                <div className="text-gray-400">TMT GAJI BARU</div>
                <div className="font-bold">
                  {formatTanggalIndonesia(tmt) ?? "-"}
                </div>
              </div>
              <div className="col-span-4 md:col-span-1">
                <div className="text-gray-400">TMT BERKALA BERIKUTNYA</div>
                <div className="font-bold">
                  {formatTanggalIndonesia(tmt_berikutnya) ?? "-"}
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
