"use client";
import { getTppByNip, getTppByNipppk } from "@/dummy/data-tpp-by-nip";
import { formatRupiahManual } from "@/helpers/cx";
import { decrypt } from "@/helpers/encrypt";
import { polaNIP } from "@/helpers/polanip";
import { terbilangRupiah } from "@/helpers/rupiah";
import { useSession } from "@/lib/session";
import {
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";
import { useCallback } from "react";
import { PlaceholderBar } from "../skeleton/placeholder-bar";
import { BtnKirimTPP } from "../button/btn-tpp-kirim";

export default function ModalInterceptTppPegawai({ params }) {
  const router = useRouter();

  const sigapok = useSession("USER_GAPOK");
  const silka = useSession("USER_SILKA");

  const [slug] = params.slug;

  const NIP = decrypt(slug, "bkpsdm");
  const {
    data: queryTPP,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["queryTPP", slug],
    queryFn: async () => {
      const resultDataTpp = await getTppByNip(NIP);
      return resultDataTpp;
    },
  });

  const renderTPP = useCallback(() => {
    if (isLoading || isFetching) return <PlaceholderBar />;
    const {
      nip,
      nama,
      gelar_depan,
      gelar_belakang,
      tpp_diterima,
      tahun,
      bulan,
      fid_status,
    } = queryTPP?.data;
    return (
      <>
        <div className="inline-flex flex-col sm:flex-row justify-start gap-x-8 gap-y-12">
          <div>
            <div className="text-gray-400">NIP</div>
            <div className="font-bold">{polaNIP(nip) ?? "-"}</div>
          </div>
          <div>
            <div className="text-gray-400">NAMA</div>
            <div className="font-bold">
              {`${gelar_depan} ${nama} ${gelar_belakang}` ?? "-"}
            </div>
          </div>
        </div>
        <div className="inline-flex flex-col sm:flex-row justify-start gap-x-8 gap-y-12">
          <div>
            <div className="text-gray-400">BULAN</div>
            <div className="font-bold">{bulan ?? "-"}</div>
          </div>
          <div>
            <div className="text-gray-400">TAHUN</div>
            <div className="font-bold">{tahun ?? "-"}</div>
          </div>
        </div>
        <div>
          <div className="text-gray-400">JUMLAH TPP DI TERIMA</div>
          <div className="font-bold text-green-600 text-2xl">
            {formatRupiahManual(tpp_diterima) ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">TERBILANG</div>
          <div className="font-bold text-gray-400 italic uppercase">
            {terbilangRupiah(tpp_diterima) ?? "-"}
          </div>
        </div>
      </>
    );
  }, [isFetching, isLoading, queryTPP?.data]);

  return (
    <>
      <Modal
        size="2xl"
        backdrop="blur"
        isOpen={true}
        onClose={() => router.back()}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 bg-gray-100 dark:bg-blue-900">
                SINKRONISASI TPP{" "}
                <div className="text-sm text-gray-400 font-normal">
                  Data TPP SILKa Online
                </div>
              </ModalHeader>
              <ModalBody>{renderTPP()}</ModalBody>
              <ModalFooter className="justify-between items-start">
                <Button
                  className="disabled:cursor-not-allowed"
                  isDisabled={queryTPP?.data.is_sync_simgaji !== "1"}
                  color="success"
                  variant="bordered"
                  onPress={() => window.location.reload()}>
                  Hasil Sinkronisasi
                </Button>
                <div className="inline-flex items-center gap-x-3">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Batal
                  </Button>
                  <BtnKirimTPP {...sigapok} {...queryTPP?.data} silka={silka} />
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export const ModalInterceptTppPppk = ({ params }) => {
  const router = useRouter();

  const sigapok = useSession("USER_GAPOK");
  const silka = useSession("USER_SILKA");

  const [slug] = params.slug;

  const NIP = decrypt(slug, "bkpsdm");
  const {
    data: queryTPP,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["queryTPPPK", slug],
    queryFn: async () => {
      const resultDataTpp = await getTppByNipppk(NIP);
      return resultDataTpp;
    },
  });

  const renderTPP = useCallback(() => {
    if (isLoading || isFetching) return <PlaceholderBar />;
    const {
      nip,
      nama,
      gelar_depan,
      gelar_blk,
      tpp_diterima,
      tahun,
      bulan,
      fid_status,
    } = queryTPP?.data;
    return (
      <>
        <div className="inline-flex flex-col sm:flex-row justify-start gap-x-8 gap-y-12">
          <div>
            <div className="text-gray-400">NIP</div>
            <div className="font-bold">{polaNIP(nip) ?? "-"}</div>
          </div>
          <div>
            <div className="text-gray-400">NAMA</div>
            <div className="font-bold">
              {`${gelar_depan} ${nama} ${gelar_blk}` ?? "-"}
            </div>
          </div>
        </div>
        <div className="inline-flex flex-col sm:flex-row justify-start gap-x-8 gap-y-12">
          <div>
            <div className="text-gray-400">BULAN</div>
            <div className="font-bold">{bulan ?? "-"}</div>
          </div>
          <div>
            <div className="text-gray-400">TAHUN</div>
            <div className="font-bold">{tahun ?? "-"}</div>
          </div>
        </div>
        <div>
          <div className="text-gray-400">JUMLAH TPP DI TERIMA</div>
          <div className="font-bold text-green-600 text-2xl">
            {formatRupiahManual(tpp_diterima) ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">TERBILANG</div>
          <div className="font-bold text-gray-400 italic uppercase">
            {terbilangRupiah(tpp_diterima) ?? "-"}
          </div>
        </div>
      </>
    );
  }, [isFetching, isLoading, queryTPP?.data]);

  return (
    <>
      <Modal
        aria-hidden="true"
        size="2xl"
        backdrop="blur"
        isOpen={true}
        onClose={() => router.back()}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 bg-gray-100 dark:bg-blue-900">
                SINKRONISASI TPP{" "}
                <div className="text-sm text-gray-400 font-normal">
                  Data TPP SILKa Online
                </div>
              </ModalHeader>
              <ModalBody>{renderTPP()}</ModalBody>
              <ModalFooter className="justify-between items-start">
                <Button
                  className="disabled:cursor-not-allowed"
                  isDisabled={queryTPP?.data.is_sync_simgaji !== "1"}
                  color="success"
                  variant="bordered"
                  onPress={() => window.location.reload()}>
                  Hasil Sinkronisasi
                </Button>
                <div className="inline-flex items-center gap-x-3">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Batal
                  </Button>
                  <BtnKirimTPP {...sigapok} {...queryTPP?.data} silka={silka} />
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
