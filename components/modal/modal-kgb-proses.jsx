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
} from "@nextui-org/react";
import { AlertInfo, AlertWarning } from "../alert";
import { formatRupiahManual, formatTanggalIndonesia } from "@/helpers/cx";
import { DocumentCurrencyDollarIcon } from "@heroicons/react/24/solid";

export const ModalKgbProses = ({
  dataSilka,
  isOpenModal = false,
  onClose,
  handleSubmit,
  isLoading = false,
}) => {
  const { gapok_baru, golru_nama, berkas, pangkat_nama, mk_thn, mk_bln, tmt_berikutnya } = dataSilka.data
  return (
    <>
      <Modal
        size="5xl"
        backdrop="blur"
        isOpen={isOpenModal}
        onClose={onClose}
        placement="center"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col sm:flex-row items-center gap-1 shadow-lg">
            <DocumentCurrencyDollarIcon className="size-8"/> <span>VERIFIKASI USULAN KGB</span>
          </ModalHeader>
          <ModalBody>
          <iframe allowFullScreen={true} height={500} src={`${berkas}#zoom=FitH`} />
          <div className="flex flex-col sm:flex-row justify-around items-start gap-4 border border-red-800 p-6">
            <div>
              <div className="text-gray-400">GAJI BARU</div>
              <div className="font-bold">{formatRupiahManual(gapok_baru) ?? "-"}</div>
            </div>
            <div>
              <div className="text-gray-400">GOLONGAN RUANG</div>
              <div className="font-bold">{pangkat_nama ?? "-"} ({golru_nama ?? "-"})</div>
            </div>
            <div>
              <div className="text-gray-400">MASA KERJA BULAN</div>
              <div className="font-bold">{mk_thn ?? "-"}</div>
            </div>
            <div>
              <div className="text-gray-400">MASA KERJA TAHUN</div>
              <div className="font-bold">{mk_bln ?? "-"}</div>
            </div>
            <div>
              <div className="text-gray-400">TMT BERKALA BERIKUTNYA</div>
              <div className="font-bold">{formatTanggalIndonesia(tmt_berikutnya) ?? "-"}</div>
            </div>
          </div>
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
              isLoading={isLoading}
              isDisabled={isLoading}
              onPress={handleSubmit}
            >
              Kirim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
