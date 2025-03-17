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
import { InboxIcon } from "@heroicons/react/24/solid";
import { AlertDanger, AlertInfo, AlertSuccess, AlertWarning } from "../alert";
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
    // ? jika loading data dan fetching data
    if (isLoading || isFetching) return "";
    // ? jika sudah melakukan sinkronisasi
    if (queryTPP?.data.is_sync_simgaji === "1") return null;
    // jika status data tpp tidak sama dengan APPROVE dan CETAK
    if (queryTPP?.data.fid_status !== "4" && queryTPP?.data.fid_status !== "5")
      return null;
    // jika status data tpp sudah cetak
    if (queryTPP?.data.fid_status === "5") return null;
    // jika status data peremajaan masih verifikasi, entri, null
    if (
      queryTPP?.data.is_peremajaan === "VERIFIKASI" ||
      queryTPP?.data.is_peremajaan === "ENTRI" ||
      queryTPP?.data.is_peremajaan === null
    )
      return null;
    // * jika semua terpenuhi tampilkan tombol kirim
    return (
      <div className="inline-flex items-center justify-between w-full gap-x-3">
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
          <AlertInfo title="Informasi">
            TPP belum dikirim, silahkan kirim data
          </AlertInfo>
        )}
        {queryTPP?.data.fid_status !== "4" &&
          queryTPP?.data.fid_status !== "5" && (
            <AlertDanger
              title="Perhatian"
              message="TPP masih dalam proses perhitungan atau belum disetujui."
            />
          )}
        {(queryTPP?.data.is_peremajaan === "ENTRI" ||
          queryTPP?.data.is_peremajaan === null) && (
          <AlertWarning
            title="Perhatian"
            message="Data Pegawai belum diremajakan, silahkan melakukan peremajaan data terlebih dahulu"
          />
        )}
        {queryTPP?.data.is_peremajaan === "VERIFIKASI" && (
          <AlertWarning title="Perhatian">
            Peremajaan data belum verifikasi oleh pengelola kepegawaian.
          </AlertWarning>
        )}
        <div className="inline-flex flex-col justify-start sm:flex-row gap-x-8 gap-y-6">
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
        <div className="inline-flex flex-col justify-start sm:flex-row gap-x-8 gap-y-8">
          <div>
            <div className="text-gray-400">JABATAN</div>
            <div className="font-bold">{jabatan ?? "-"}</div>
          </div>
        </div>
        <div className="inline-flex flex-col justify-start sm:flex-row gap-x-8 gap-y-6">
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
              <div className="text-2xl font-bold text-green-600">
                {formatRupiahManual(tpp_diterima) ?? "-"}
              </div>
            </div>
            <div>
              <div className="text-gray-400">TERBILANG</div>
              <div className="italic font-bold text-gray-400 uppercase">
                {terbilangRupiah(tpp_diterima) ?? "-"}
              </div>
            </div>
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            title="Detail Kalkulasi TPP">
            <div className="inline-flex flex-col justify-start sm:flex-row gap-x-12 gap-y-8">
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
            <div className="inline-flex flex-col justify-start mt-4 sm:flex-row gap-x-6 gap-y-8">
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
          scrollBehavior="outside"
          onClose={() => router.back()}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1 bg-gray-100 dark:bg-blue-900 rounded-t-xl">
              SINKRONISASI TPP{" "}
              <div className="text-sm font-normal text-gray-400">
                Data TPP SILKa Online
              </div>
            </ModalHeader>
            <ModalBody className="flex items-center justify-center flex-column gap-y-3 rounded-b-xl">
              <InboxIcon className="text-gray-300 size-8 dark:text-gray-700" />
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
        scrollBehavior="outside"
        onClose={() => router.back()}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 bg-gray-100 dark:bg-blue-900 rounded-t-xl">
                SINKRONISASI TPP{" "}
                <div className="text-sm font-normal text-gray-400">
                  Data TPP SILKa Online
                </div>
              </ModalHeader>
              <ModalBody>{renderTPP()}</ModalBody>
              <ModalFooter className="items-start justify-between bg-gray-100 dark:bg-blue-900 rounded-b-xl">
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
          <AlertInfo title="Informasi">
            TPP belum dikirim, silahkan kirim data
          </AlertInfo>
        )}
        {queryTPP?.data.fid_status !== "4" &&
          queryTPP?.data.fid_status !== "5" && (
            <AlertDanger
              title="Perhatian"
              message="TPP masih dalam proses perhitungan atau belum disetujui."
            />
          )}
        {queryTPP?.data.fid_status === "5" && (
          <AlertSuccess title="Perhatian">
            TPP sudah selesai cetak pada silka online
          </AlertSuccess>
        )}
        {(queryTPP?.data.is_peremajaan === "ENTRI" ||
          queryTPP?.data.is_peremajaan === null) && (
          <AlertWarning
            title="Perhatian"
            message="Data Pegawai belum diremajakan, silahkan melakukan peremajaan data terlebih dahulu"
          />
        )}
        {queryTPP?.data.is_peremajaan === "VERIFIKASI" && (
          <AlertWarning title="Perhatian">
            Peremajaan data belum verifikasi oleh pengelola kepegawaian.
          </AlertWarning>
        )}
        <div className="inline-flex flex-col justify-start sm:flex-row gap-x-8 gap-y-6">
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
        <div className="inline-flex flex-col justify-start sm:flex-row gap-x-8 gap-y-8">
          <div>
            <div className="text-gray-400">JABATAN</div>
            <div className="font-bold">{jabatan ?? "-"}</div>
          </div>
        </div>
        <div className="inline-flex flex-col justify-start sm:flex-row gap-x-8 gap-y-6">
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
    // jika status data peremajaan masih verifikasi, entri, null
    if (
      queryTPP?.data.is_peremajaan === "VERIFIKASI" ||
      queryTPP?.data.is_peremajaan === "ENTRI" ||
      queryTPP?.data.is_peremajaan === null
    )
      return null;

    return (
      <div className="inline-flex items-center justify-between w-full gap-x-3">
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
          scrollBehavior="outside"
          onClose={() => router.back()}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1 bg-gray-100 dark:bg-blue-900 rounded-t-xl">
              SINKRONISASI TPP{" "}
              <div className="text-sm font-normal text-gray-400">
                Data TPP SILKa Online
              </div>
            </ModalHeader>
            <ModalBody className="flex items-center justify-center flex-column gap-y-3">
              <InboxIcon className="text-gray-300 size-8 dark:text-gray-700" />
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
        scrollBehavior="outside"
        onClose={() => router.back()}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 bg-gray-100 dark:bg-blue-900 rounded-t-xl">
                SINKRONISASI TPP{" "}
                <div className="text-sm font-normal text-gray-400">
                  Data TPP SILKa Online
                </div>
              </ModalHeader>
              <ModalBody>{renderTPP()}</ModalBody>
              <ModalFooter className="items-start justify-between">
                {renderActionHasil()} {renderActionKirim()}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
