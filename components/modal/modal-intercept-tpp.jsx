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
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";
import { useCallback } from "react";
import { PlaceholderBar } from "../skeleton/placeholder-bar";
import { BtnKirimTPP } from "../button/btn-tpp-kirim";
import { InboxIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import { AlertDanger, AlertInfo, AlertSuccess } from "../alert";
import DetailKalkulasi from "@/app/app-module/pppk/tpp/[...slug]/detailKalkulasi";

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
    enabled: !!NIP,
  });

  const renderActionHasil = useCallback(() => {
    if (isLoading || isFetching) return "";
    return queryTPP?.data.is_sync_simgaji !== "1" ? null : (
      <Button
        // radius="none"
        className="disabled:cursor-not-allowed"
        isDisabled={queryTPP?.data.is_sync_simgaji !== "1"}
        color="success"
        variant="shadow"
        onPress={() => window.location.reload()}>
        Hasil Sinkronisasi
      </Button>
    );
  }, [isFetching, isLoading, queryTPP?.data?.is_sync_simgaji]);

  const renderActionKirim = useCallback(() => {
    if (isLoading || isFetching) return "";
    if (queryTPP?.data.is_sync_simgaji === "1") return null;
    if (queryTPP?.data.fid_status !== "4" && queryTPP?.data.fid_status !== "5")
      return null;
    if (queryTPP?.data.fid_status === "5") return null;

    return (
      <div className="inline-flex w-full justify-between items-center gap-x-3">
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
      jabatan,
      tpp_diterima,
      tahun,
      bulan,
      basic_bk,
      basic_pk,
      basic_kk,
      basic_kp,
      jml_pph,
      jml_iwp,
      jml_bpjs,
      fid_status,
    } = queryTPP?.data;
    return (
      <>
        {queryTPP?.data.is_sync_simgaji !== "1" && (
          <AlertDanger title="Perhatian" message="Data belum tersenkronisasi" />
        )}
        {queryTPP?.data.fid_status !== "4" &&
          queryTPP?.data.fid_status !== "5" && (
            <AlertDanger title="Perhatian">
              TPP masih dalam proses perhitungan atau belum disetujui.
            </AlertDanger>
          )}
        {queryTPP?.data.fid_status === "5" && (
          <AlertSuccess title="Perhatian">
            TPP sudah selesai cetak pada silka online
          </AlertSuccess>
        )}
        <div className="inline-flex flex-col sm:flex-row justify-start gap-x-8 gap-y-6">
          <div>
            <div className="text-gray-400">NIP</div>
            <div className="font-bold">{polaNIP(nip) ?? "-"}</div>
          </div>
          <div>
            <div className="text-gray-400">NAMA</div>
            <div className="font-bold">
              {`${gelar_depan} ${nama} ${gelar_belakang}`}
            </div>
          </div>
        </div>
        <div className="inline-flex flex-col sm:flex-row justify-start gap-x-8 gap-y-8">
          <div>
            <div className="text-gray-400">JABATAN</div>
            <div className="font-bold">{jabatan ?? "-"}</div>
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
        <Accordion
          variant="bordered"
          defaultExpandedKeys={["1", "2"]}
          selectionMode="multiple">
          <AccordionItem key="1" aria-label="Accordion 1" title="Take Home Pay">
            <div className="mb-3">
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
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            title="Detail Kalkulasi TPP">
            <div className="inline-flex flex-col sm:flex-row justify-start gap-x-12 gap-y-8">
              <div>
                <div className="text-gray-400">BEBAN KERJA</div>
                <div className="font-bold">
                  {formatRupiahManual(basic_bk) ?? "-"}
                </div>
              </div>
              <div>
                <div className="text-gray-400">PRESTASI KERJA</div>
                <div className="font-bold">
                  {formatRupiahManual(basic_pk) ?? "-"}
                </div>
              </div>
              <div>
                <div className="text-gray-400">KONDISI KERJA</div>
                <div className="font-bold">
                  {formatRupiahManual(basic_kk) ?? "-"}
                </div>
              </div>
            </div>
            <div className="inline-flex flex-col sm:flex-row justify-start gap-x-6 gap-y-8 mt-4">
              <div>
                <div className="text-gray-400">KELANGKAAN PROFESI</div>
                <div className="font-bold">
                  {formatRupiahManual(basic_kp) ?? "-"}
                </div>
              </div>
              <div>
                <div className="text-gray-400">PPH21</div>
                <div className="font-bold">
                  {formatRupiahManual(jml_pph) ?? "-"}
                </div>
              </div>
              <div>
                <div className="text-gray-400">IWP</div>
                <div className="font-bold">
                  {formatRupiahManual(jml_iwp) ?? "-"}
                </div>
              </div>
              <div>
                <div className="text-gray-400">BPJS</div>
                <div className="font-bold">
                  {formatRupiahManual(jml_bpjs) ?? "-"}
                </div>
              </div>
            </div>
          </AccordionItem>
        </Accordion>
      </>
    );
  }, [isFetching, isLoading, queryTPP?.data]);

  if (queryTPP?.status === false) {
    return (
      <>
        <Modal
          size="2xl"
          backdrop="blur"
          isOpen={true}
          onClose={() => router.back()}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1 bg-gray-100 dark:bg-blue-900">
              SINKRONISASI TPP{" "}
              <div className="text-sm text-gray-400 font-normal">
                Data TPP SILKa Online
              </div>
            </ModalHeader>
            <ModalBody className="flex flex-column justify-center items-center gap-y-3">
              <InboxIcon className="size-8 text-gray-300 dark:text-gray-700" />
              <p>Data TPP Tidak Ditemukan</p>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
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
      jabatan,
      tahun,
      bulan,
      fid_status,
    } = queryTPP?.data;
    return (
      <>
        {queryTPP?.data.is_sync_simgaji !== "1" && (
          <AlertDanger title="Perhatian" message="Data belum tersenkronisasi" />
        )}
        {queryTPP?.data.fid_status !== "4" &&
          queryTPP?.data.fid_status !== "5" && (
            <AlertDanger title="Perhatian">
              TPP masih dalam proses perhitungan atau belum disetujui.
            </AlertDanger>
          )}
        {queryTPP?.data.fid_status === "5" && (
          <AlertSuccess title="Perhatian">
            TPP sudah selesai cetak pada silka online
          </AlertSuccess>
        )}
        <div className="inline-flex flex-col sm:flex-row justify-start gap-x-8 gap-y-6">
          <div>
            <div className="text-gray-400">NIP</div>
            <div className="font-bold">{polaNIP(nip) ?? "-"}</div>
          </div>
          <div>
            <div className="text-gray-400">NAMA</div>
            <div className="font-bold">
              {`${gelar_depan} ${nama} ${gelar_blk}`}
            </div>
          </div>
        </div>
        <div className="inline-flex flex-col sm:flex-row justify-start gap-x-8 gap-y-8">
          <div>
            <div className="text-gray-400">JABATAN</div>
            <div className="font-bold">{jabatan ?? "-"}</div>
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
        <DetailKalkulasi data={queryTPP?.data} />
      </>
    );
  }, [isFetching, isLoading, queryTPP?.data]);

  const renderActionHasil = useCallback(() => {
    if (isLoading || isFetching) return "";
    return queryTPP?.data.is_sync_simgaji !== "1" ? null : (
      <Button
        // radius="none"
        className="disabled:cursor-not-allowed"
        isDisabled={queryTPP?.data.is_sync_simgaji !== "1"}
        color="success"
        variant="shadow"
        onPress={() => window.location.reload()}>
        Hasil Sinkronisasi
      </Button>
    );
  }, [isFetching, isLoading, queryTPP?.data?.is_sync_simgaji]);

  const renderActionKirim = useCallback(() => {
    if (isLoading || isFetching) return "";
    if (queryTPP?.data.is_sync_simgaji === "1") return null;
    if (queryTPP?.data.fid_status !== "4" && queryTPP?.data.fid_status !== "5")
      return null;

    if (queryTPP?.data.fid_status === "5") return null;

    return (
      <div className="inline-flex w-full justify-between items-center gap-x-3">
        <Button color="danger" variant="light" onPress={() => router.back()}>
          Batal
        </Button>
        <BtnKirimTPP {...sigapok} {...queryTPP?.data} silka={silka} />
      </div>
    );
  }, [isFetching, isLoading, queryTPP?.data, router, sigapok, silka]);

  if (queryTPP?.status === false) {
    return (
      <>
        <Modal
          size="2xl"
          backdrop="blur"
          isOpen={true}
          onClose={() => router.back()}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1 bg-gray-100 dark:bg-blue-900">
              SINKRONISASI TPP{" "}
              <div className="text-sm text-gray-400 font-normal">
                Data TPP SILKa Online
              </div>
            </ModalHeader>
            <ModalBody className="flex flex-column justify-center items-center gap-y-3">
              <InboxIcon className="size-8 text-gray-300 dark:text-gray-700" />
              <p>Data TPP Tidak Ditemukan</p>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
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
