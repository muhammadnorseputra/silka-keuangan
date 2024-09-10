"use client";
import { getTppByNip, getTppByNipppk } from "@/dummy/data-tpp-by-nip";
import { formatRupiahManual } from "@/helpers/cx";
import { decrypt } from "@/helpers/encrypt";
import { polaNIP } from "@/helpers/polanip";
import { terbilangRupiah } from "@/helpers/rupiah";
import { useSession } from "@/lib/session";
import {
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
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

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
    refetchOnWindowFocus: false,
    enabled: !!NIP
  });


  const renderActionHasil = useCallback(() => {
    if (isLoading || isFetching) return "";
    return queryTPP?.data.is_sync_simgaji !== "1" ? (
      <p className="text-red-500 border-b-1 border-red-500 py-2 hover:cursor-not-allowed inline-flex items-center justify-start gap-x-2">
        <InformationCircleIcon className="size-5 text-red-300" />
        <span>Belum Sinkron</span>
      </p>
    ) : (
      <Button
      radius="none"
        className="disabled:cursor-not-allowed"
        isDisabled={queryTPP?.data.is_sync_simgaji !== "1"}
        color="success"
        variant="bordered"
        onPress={() => window.location.reload()}>
        Hasil Sinkronisasi
      </Button>
    );
  }, [isFetching, isLoading, queryTPP?.data?.is_sync_simgaji]);

  const renderActionKirim = useCallback(() => {
    if (isLoading || isFetching) return "";
    if(queryTPP?.data.fid_status !== "4" && queryTPP?.data.fid_status !== "5") {
      return (
        <p className="text-red-500 border-1 border-red-500 p-2 hover:cursor-not-allowed select-none inline-flex items-center justify-center gap-x-2">
          <InformationCircleIcon className="size-5 text-red-300" />
          TPP masih dalam proses perhitungan atau belum disetujui.
        </p>
      ) 
    }

    if(queryTPP?.data.fid_status === "5") {
      return (
        <p className="text-green-500 border-1 border-green-500 p-2 hover:cursor-not-allowed select-none inline-flex items-center justify-center gap-x-2">
          <InformationCircleIcon className="size-5 text-green-500" />
          TPP sudah selesai cetak
        </p>
      ) 
    }

    return (
      <div className="inline-flex items-center gap-x-3">
        <Button color="danger" variant="light" onPress={() => router.back()}>
          Batal
        </Button>
        <BtnKirimTPP {...sigapok} {...queryTPP?.data} silka={silka} />
      </div>
    );
  }, [isFetching, isLoading, queryTPP?.data, router, sigapok, silka]);

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
        <div className="inline-flex flex-col sm:flex-row justify-start gap-x-8 gap-y-6">
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
        <div className="inline-flex flex-col sm:flex-row justify-start gap-x-8 gap-y-6">
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
  
  if(queryTPP?.status === false) {
    return (
      <>
        <Modal
          size="2xl"
          backdrop="blur"
          isOpen={true}
          onClose={() => router.back()}>
          <ModalContent>
          <ModalBody><p>Data TPP Tidak Ditemukan</p></ModalBody>
            
          </ModalContent>
        </Modal>
      </>
    )
  }
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
                {renderActionHasil()} {renderActionKirim()}
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
        <div className="inline-flex flex-col sm:flex-row justify-start gap-x-8 gap-y-6">
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
        <div className="inline-flex flex-col sm:flex-row justify-start gap-x-8 gap-y-6">
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
  const renderActionHasil = useCallback(() => {
    if (isLoading || isFetching) return "";
    return queryTPP?.data.is_sync_simgaji !== "1" ? (
      <p className="text-red-500 border-b-1 border-red-500 py-2 hover:cursor-not-allowed inline-flex items-center justify-start gap-x-2">
        <InformationCircleIcon className="size-5 text-red-300" />
        <span>Belum Sinkron</span>
      </p>
    ) : (
      <Button
      radius="none"
        className="disabled:cursor-not-allowed"
        isDisabled={queryTPP?.data.is_sync_simgaji !== "1"}
        color="success"
        variant="bordered"
        onPress={() => window.location.reload()}>
        Hasil Sinkronisasi
      </Button>
    );
  }, [isFetching, isLoading, queryTPP?.data.is_sync_simgaji]);

  const renderActionKirim = useCallback(() => {
    if (isLoading || isFetching) return "";

    if(queryTPP?.data.fid_status !== "4" && queryTPP?.data.fid_status !== "5") {
      return (
        <p className="text-red-500 border-1 border-red-500 p-2 hover:cursor-not-allowed select-none inline-flex items-center justify-center gap-x-2">
          <InformationCircleIcon className="size-5 text-red-300" />
          TPP masih dalam proses perhitungan atau belum disetujui.
        </p>
      ) 
    }

    if(queryTPP?.data.fid_status === "5") {
      return (
        <p className="text-green-500 border-1 border-green-500 p-2 hover:cursor-not-allowed select-none inline-flex items-center justify-center gap-x-2">
          <InformationCircleIcon className="size-5 text-green-500" />
          TPP sudah selesai cetak
        </p>
      ) 
    }

    return (
      <div className="inline-flex items-center gap-x-3">
        <Button color="danger" variant="light" onPress={() => router.back()}>
          Batal
        </Button>
        <BtnKirimTPP {...sigapok} {...queryTPP?.data} silka={silka} />
      </div>
    );
  }, [isFetching, isLoading, queryTPP?.data, router, sigapok, silka]);

  if(queryTPP?.status === false) {
    return (
      <>
        <Modal
          size="2xl"
          backdrop="blur"
          isOpen={true}
          onClose={() => router.back()}>
          <ModalContent>
          <ModalBody><p>Data TPP Tidak Ditemukan</p></ModalBody>
            
          </ModalContent>
        </Modal>
      </>
    )
  }
  
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
                {renderActionHasil()} {renderActionKirim()}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
