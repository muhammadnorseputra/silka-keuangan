"use client";
import { getTppByNip, getTppByNipppk } from "@/dummy/data-tpp-by-nip-v2";
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
    queryKey: ["queryTPP", slug, silka.access_token],
    queryFn: async () => {
      const resultDataTpp = await getTppByNip(NIP, silka?.access_token);
      return resultDataTpp;
    },
    refetchOnWindowFocus: false,
    enabled: !!NIP,
  });

  const renderActionHasil = useCallback(() => {
    if (isLoading || isFetching) return "";
    return queryTPP?.data[0].is_sync_simgaji !== "1" ? null : (
      <Button
        // radius="none"
        className="disabled:cursor-not-allowed"
        isDisabled={queryTPP?.data[0].is_sync_simgaji !== "1"}
        color="success"
        variant="shadow"
        onPress={() => window.location.reload()}>
        Hasil Sinkronisasi
      </Button>
    );
  }, [isFetching, isLoading, queryTPP?.data]);

  const renderActionKirim = useCallback(() => {
    // ? jika loading data dan fetching data
    if (isLoading || isFetching) return "";
    // ? jika sudah melakukan sinkronisasi
    if (queryTPP?.data[0].is_sync_simgaji === "1") return null;
    // jika status data tpp tidak sama dengan APPROVE dan CETAK
    if (
      queryTPP?.data[0].fid_status !== "4" &&
      queryTPP?.data[0].fid_status !== "5"
    )
      return null;
    // jika status data tpp sudah cetak
    if (queryTPP?.data[0].fid_status === "5") return null;
    // jika status data peremajaan masih verifikasi, entri, null
    if (
      queryTPP?.data[0].is_peremajaan === "VERIFIKASI" ||
      queryTPP?.data[0].is_peremajaan === "ENTRI" ||
      queryTPP?.data[0].is_peremajaan === null
    )
      return null;
    // * jika semua terpenuhi tampilkan tombol kirim
    return (
      <div className="inline-flex items-center justify-between w-full gap-x-3">
        <Button color="danger" variant="light" onPress={() => router.back()}>
          Batal
        </Button>
        <BtnKirimTPP {...sigapok} {...queryTPP?.data[0]} silka={silka} />
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
      real_bk,
      real_pk,
      real_kk,
      real_tb,
      real_kp,
      jml_pph,
      jml_iwp,
      jml_bpjs,
      jml_pot,
      total_kotor,
      total_bersih,
      fid_status,
    } = queryTPP?.data[0];
    return (
      <>
        {queryTPP?.data[0].is_sync_simgaji !== "1" && (
          <AlertInfo title="Informasi">
            TPP belum dikirim, silahkan kirim data
          </AlertInfo>
        )}
        {queryTPP?.data[0].fid_status !== "4" &&
          queryTPP?.data[0].fid_status !== "5" && (
            <AlertDanger
              title="Perhatian"
              message="TPP masih dalam proses perhitungan atau belum disetujui."
            />
          )}
        {(queryTPP?.data[0].is_peremajaan === "ENTRI" ||
          queryTPP?.data[0].is_peremajaan === null) && (
          <AlertWarning
            title="Perhatian"
            message="Data Pegawai belum diremajakan, silahkan melakukan peremajaan data terlebih dahulu"
          />
        )}
        {queryTPP?.data[0].is_peremajaan === "VERIFIKASI" && (
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
            <div className="inline-flex flex-col justify-start sm:flex-row gap-x-6 gap-y-8">
              <div>
                <div className="text-gray-400">JUMLAH KOTOR</div>
                <div className="text-xl font-bold text-gray-600">
                  {formatRupiahManual(total_kotor) ?? "-"}
                </div>
              </div>
              <div>
                <div className="text-gray-400">TOTAL POTONGAN</div>
                <div className="text-xl font-bold text-red-600">
                  {formatRupiahManual(jml_pot) ?? "-"}
                </div>
              </div>
            </div>
            <div className="pt-3 mt-3 mb-3 border-t border-gray-200 border-dashed">
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
                <div className="text-gray-400">POT. PPH21</div>
                <div className="font-bold">
                  {formatRupiahManual(jml_pph) ?? "-"}
                </div>
              </div>
              <div>
                <div className="text-gray-400">POT. BPJS</div>
                <div className="font-bold">
                  {formatRupiahManual(jml_bpjs) ?? "-"}
                </div>
              </div>
              <div>
                <div className="text-gray-400">POT. IWP</div>
                <div className="font-bold">
                  {formatRupiahManual(jml_iwp) ?? "-"}
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
  console.log("silka", silka);
  const [slug] = params.slug;

  const NIP = decrypt(slug, "bkpsdm");
  const {
    data: queryTPP,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["queryTPPPK", slug, silka.access_token],
    queryFn: async () => {
      const resultDataTpp = await getTppByNipppk(NIP, silka.access_token);
      return resultDataTpp;
    },
  });

  const renderTPP = useCallback(() => {
    if (isLoading || isFetching) return <PlaceholderBar />;
    const {
      nipppk,
      nama,
      gelar_depan,
      gelar_belakang,
      jabatan,
      tahun,
      bulan,
      fid_status,
    } = queryTPP?.data[0];
    return (
      <>
        {queryTPP?.data[0].is_sync_simgaji !== "1" && (
          <AlertInfo title="Informasi">
            TPP belum dikirim, silahkan kirim data
          </AlertInfo>
        )}
        {queryTPP?.data[0].fid_status !== "4" &&
          queryTPP?.data[0].fid_status !== "5" && (
            <AlertDanger
              title="Perhatian"
              message="TPP masih dalam proses perhitungan atau belum disetujui."
            />
          )}
        {queryTPP?.data[0].fid_status === "5" && (
          <AlertSuccess title="Perhatian">
            TPP sudah selesai cetak pada silka online
          </AlertSuccess>
        )}
        {(queryTPP?.data[0].is_peremajaan === "ENTRI" ||
          queryTPP?.data[0].is_peremajaan === null) && (
          <AlertWarning
            title="Perhatian"
            message="Data Pegawai belum diremajakan, silahkan melakukan peremajaan data terlebih dahulu"
          />
        )}
        {queryTPP?.data[0].is_peremajaan === "VERIFIKASI" && (
          <AlertWarning title="Perhatian">
            Peremajaan data belum verifikasi oleh pengelola kepegawaian.
          </AlertWarning>
        )}
        <div className="inline-flex flex-col justify-start sm:flex-row gap-x-8 gap-y-6">
          <div>
            <div className="text-gray-400">NIP</div>
            <div className="font-bold">{polaNIP(nipppk) ?? "-"}</div>
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
        <DetailKalkulasi data={queryTPP?.data[0]} />
      </>
    );
  }, [isFetching, isLoading, queryTPP?.data]);

  const renderActionHasil = useCallback(() => {
    if (isLoading || isFetching) return "";
    return queryTPP?.data[0].is_sync_simgaji !== "1" ? null : (
      <Button
        // radius="none"
        className="disabled:cursor-not-allowed"
        isDisabled={queryTPP?.data[0].is_sync_simgaji !== "1"}
        color="success"
        variant="shadow"
        onPress={() => window.location.reload()}>
        Hasil Sinkronisasi
      </Button>
    );
  }, [isFetching, isLoading, queryTPP?.data]);

  const renderActionKirim = useCallback(() => {
    if (isLoading || isFetching) return "";
    if (queryTPP?.data[0].is_sync_simgaji === "1") return null;
    if (
      queryTPP?.data[0].fid_status !== "4" &&
      queryTPP?.data[0].fid_status !== "5"
    )
      return null;
    if (queryTPP?.data[0].fid_status === "5") return null;
    // jika status data peremajaan masih verifikasi, entri, null
    if (
      queryTPP?.data[0].is_peremajaan === "VERIFIKASI" ||
      queryTPP?.data[0].is_peremajaan === "ENTRI" ||
      queryTPP?.data[0].is_peremajaan === null
    )
      return null;

    return (
      <div className="inline-flex items-center justify-between w-full gap-x-3">
        <Button color="danger" variant="light" onPress={() => router.back()}>
          Batal
        </Button>
        <BtnKirimTPP {...sigapok} {...queryTPP?.data[0]} silka={silka} />
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
