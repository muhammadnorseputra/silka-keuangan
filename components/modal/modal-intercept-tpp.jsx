"use client";
import { getTppByNip, getTppByNipppk } from "@/dummy/data-tpp-by-nip-v2";
import {
  formatRupiahManual,
  formatRupiahManualVersiDesember,
} from "@/helpers/cx";
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
  Divider,
  ScrollShadow,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";
import { useCallback } from "react";
import { PlaceholderBar } from "../skeleton/placeholder-bar";
import { BtnKirimTPP } from "../button/btn-tpp-kirim";
import {
  CalculatorIcon,
  ChartBarIcon,
  InboxIcon,
} from "@heroicons/react/24/solid";
import { AlertDanger, AlertInfo, AlertSuccess, AlertWarning } from "../alert";
import DetailKalkulasi from "@/app/app-module/pppk/tpp/[...slug]/detailKalkulasi";
// @ts-ignore
import SquaresPlusIcon from "@heroicons/react/24/outline/SquaresPlusIcon";
import {
  BookmarkIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  // @ts-ignore
  ChartPieIcon,
  CheckBadgeIcon,
  CheckCircleIcon,
  Cog6ToothIcon,
  // @ts-ignore
  DocumentCurrencyDollarIcon,
  DocumentMinusIcon,
  IdentificationIcon,
  MinusCircleIcon,
  ShieldCheckIcon,
  StarIcon,
  UserIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { Download } from "react-bootstrap-icons";

// @ts-ignore
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

  const renderActionHasil = useCallback(
    // @ts-ignore
    (onClose) => {
      if (isLoading || isFetching) return;
      if (queryTPP?.data[0].is_sync_simgaji !== "1") return;
      return (
        <>
          <Button
            // radius="none"
            className="disabled:cursor-not-allowed"
            isDisabled={queryTPP?.data[0].is_sync_simgaji !== "1"}
            color="success"
            variant="flat"
            startContent={<Download color="text-green-800" size={12} />}
            onPress={() => window.location.reload()}
          >
            Hasil Sinkronisasi
          </Button>
          <Button
            color="primary"
            variant="bordered"
            onPress={onClose}
            className="border-1 border-blue-500/50"
          >
            Tutup
          </Button>
        </>
      );
    },
    [isFetching, isLoading, queryTPP?.data],
  );

  const renderActionKirim = useCallback(() => {
    // ? jika loading data dan fetching data
    if (isLoading || isFetching) return;
    // ? jika sudah melakukan sinkronisasi
    if (queryTPP?.data[0].is_sync_simgaji === "1") return;
    // jika status data tpp tidak sama dengan APPROVE dan CETAK
    if (["4", "5"].includes(queryTPP?.data[0].fid_status)) return;
    // jika status data tpp sudah cetak
    if (queryTPP?.data[0].fid_status === "5") return;
    // jika status data peremajaan masih verifikasi, entri, null
    if (["VERIFIKASI", "ENTRI", null].includes(queryTPP?.data[0].is_peremajaan))
      return;
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
      // @ts-ignore
      real_bk,
      // @ts-ignore
      real_pk,
      // @ts-ignore
      real_kk,
      // @ts-ignore
      real_tb,
      // @ts-ignore
      real_kp,
      jml_pph,
      jml_iwp,
      jml_bpjs,
      jml_pot,
      total_kotor,
      // @ts-ignore
      total_bersih,
      // @ts-ignore
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
        <div className="flex flex-col p-6 my-4 border border-gray-200 rounded-lg gap-y-5">
          <div className="inline-flex flex-col justify-start sm:flex-row gap-x-8 gap-y-6">
            <div className="inline-flex items-start justify-start gap-x-4">
              <IdentificationIcon className="text-blue-600 size-6" />
              <div className="inline-flex flex-col">
                <div className="text-xs text-gray-400">NIP</div>
                <div className="text-sm font-semibold">
                  {polaNIP(nip) ?? "-"}
                </div>
              </div>
            </div>
            <div className="inline-flex items-start justify-start gap-x-4">
              <UserIcon className="text-blue-600 size-6" />
              <div className="inline-flex flex-col">
                <div className="text-xs text-gray-400">NAMA</div>
                <div className="text-sm font-semibold">
                  {`${gelar_depan} ${nama} ${gelar_belakang}`}
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex flex-col justify-start sm:flex-row gap-x-8 gap-y-8">
            <div className="inline-flex items-start justify-start gap-x-4">
              <BriefcaseIcon className="text-blue-600 size-6" />
              <div className="inline-flex flex-col">
                <div className="text-xs text-gray-400">JABATAN</div>
                <div className="text-sm font-semibold">{jabatan ?? "-"}</div>
              </div>
            </div>
          </div>
          <Divider />
          <div className="inline-flex flex-col justify-start sm:flex-row gap-x-8 gap-y-6">
            <div className="inline-flex items-start justify-start gap-x-4">
              <CalendarDaysIcon className="text-blue-600 size-6" />
              <div className="inline-flex flex-col">
                <div className="text-xs text-gray-400">BULAN</div>
                <div className="text-sm font-semibold">{bulan ?? "-"}</div>
              </div>
            </div>
            <div className="inline-flex items-start justify-start gap-x-4">
              <CalendarDaysIcon className="text-blue-600 size-6" />
              <div className="inline-flex flex-col">
                <div className="text-xs text-gray-400">TAHUN</div>
                <div className="text-sm font-semibold">{tahun ?? "-"}</div>
              </div>
            </div>
          </div>
        </div>
        <Accordion
          variant="light"
          defaultExpandedKeys={["1", "2"]}
          selectionMode="multiple"
        >
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title="Ringkasan TPP"
            startContent={<ChartBarIcon className="text-blue-600 size-6" />}
          >
            <div className="flex flex-col justify-start sm:flex-row gap-x-2 gap-y-8">
              <div className="inline-flex items-center justify-start flex-1 px-4 py-5 border border-blue-100 rounded-lg gap-x-4 bg-blue-50">
                <div className="p-2 bg-blue-100 rounded-full">
                  <CalendarDaysIcon className="text-blue-600 size-5" />
                </div>
                <div className="inline-flex flex-col">
                  <div className="text-xs text-gray-400">JUMLAH KOTOR</div>
                  <div className="text-lg font-semibold text-gray-600">
                    {formatRupiahManual(total_kotor) ?? "-"}
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center justify-start flex-1 px-4 py-3 border border-red-100 rounded-lg gap-x-4 bg-red-50">
                <div className="p-2 bg-red-100 rounded-full">
                  <MinusCircleIcon className="text-red-600 size-5" />
                </div>
                <div className="inline-flex flex-col">
                  <div className="text-xs text-gray-400">TOTAL POTONGAN</div>
                  <div className="text-lg font-semibold text-red-600">
                    {formatRupiahManual(jml_pot) ?? "-"}
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center justify-start flex-1 px-4 py-3 border border-green-100 rounded-lg bg-green-50 gap-x-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircleIcon className="text-green-500 size-5" />
                </div>
                <div className="inline-flex flex-col">
                  <div className="text-xs text-gray-400">TAKE HOME PAY</div>
                  <div className="text-lg font-semibold text-green-500">
                    {formatRupiahManual(tpp_diterima) ?? "-"}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-start w-full px-4 py-5 my-4 rounded-lg gap-x-4 bg-amber-50 border-amber-100">
              <div className="p-2 rounded-full bg-amber-100">
                <CheckBadgeIcon className="text-amber-600 size-5" />
              </div>
              <div className="inline-flex flex-col">
                <div className="text-xs text-gray-400">TERBILANG</div>
                <div className="text-sm italic text-black capitalize">
                  {terbilangRupiah(tpp_diterima) ?? "-"}
                </div>
              </div>
            </div>
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            title="Detail Kalkulasi TPP"
            startContent={<CalculatorIcon className="text-blue-600 size-6" />}
          >
            <div className="flex flex-col justify-start sm:flex-row gap-x-2 gap-y-2">
              <div className="inline-flex items-center justify-start flex-1 px-2 py-3 border rounded-lg bg-gray-50 gap-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <BriefcaseIcon className="text-blue-500 size-5" />
                </div>
                <div className="inline-flex flex-col">
                  <div className="text-xs text-gray-400">BEBAN KERJA</div>
                  <div className="font-semibold">
                    {formatRupiahManual(basic_bk) ?? "-"}
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center justify-start flex-1 px-2 py-3 border rounded-lg bg-gray-50 gap-x-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <BookmarkIcon className="text-purple-500 size-5" />
                </div>
                <div className="inline-flex flex-col">
                  <div className="text-xs text-gray-400">PRESTASI KERJA</div>
                  <div className="font-semibold">
                    {formatRupiahManual(basic_pk) ?? "-"}
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center justify-start flex-1 px-2 py-3 border rounded-lg bg-gray-50 gap-x-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <Cog6ToothIcon className="text-green-500 size-5" />
                </div>
                <div className="inline-flex flex-col">
                  <div className="text-xs text-gray-400">KONDISI KERJA</div>
                  <div className="font-semibold">
                    {formatRupiahManual(basic_kk) ?? "-"}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-start mt-2 sm:flex-row gap-x-2 gap-y-2">
              <div className="inline-flex items-center justify-start flex-1 px-2 py-3 border rounded-lg gap-x-3">
                <div className="p-2 rounded-full bg-amber-100">
                  <StarIcon className="text-amber-500 size-5" />
                </div>
                <div className="inline-flex flex-col">
                  <div className="text-xs text-gray-400 text-nowrap">
                    KELANGKAAN PROFESI
                  </div>
                  <div className="text-sm font-semibold">
                    {formatRupiahManual(basic_kp) ?? "-"}
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center justify-start flex-1 px-2 py-3 border rounded-lg gap-x-3">
                <div className="p-2 rounded-full bg-cyan-100">
                  <DocumentMinusIcon className="text-cyan-500 size-5" />
                </div>
                <div className="inline-flex flex-col">
                  <div className="text-xs text-gray-400">POT. PPH21</div>
                  <div className="text-sm font-semibold">
                    {formatRupiahManualVersiDesember(jml_pph, bulan) ?? "-"}
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center justify-start flex-1 px-2 py-3 border rounded-lg gap-x-3">
                <div className="p-2 bg-pink-100 rounded-full">
                  <ShieldCheckIcon className="text-pink-500 size-5" />
                </div>
                <div className="inline-flex flex-col">
                  <div className="text-xs text-gray-400">POT. BPJS</div>
                  <div className="text-sm font-semibold">
                    {formatRupiahManual(jml_bpjs) ?? "-"}
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center justify-start flex-1 px-2 py-3 border rounded-lg gap-x-3">
                <div className="p-2 rounded-full bg-lime-100">
                  <BuildingOffice2Icon className="text-lime-500 size-5" />
                </div>
                <div className="inline-flex flex-col">
                  <div className="text-xs text-gray-400">POT. IWP</div>
                  <div className="text-sm font-semibold">
                    {formatRupiahManual(jml_iwp) ?? "-"}
                  </div>
                </div>
              </div>
            </div>
          </AccordionItem>
        </Accordion>
      </>
    );
  }, [isLoading, isFetching, queryTPP?.data]);

  if (!queryTPP?.status) {
    return (
      <>
        <Modal
          size="2xl"
          backdrop="blur"
          isOpen={true}
          scrollBehavior="inside"
          onClose={() => router.back()}
          classNames={{
            closeButton:
              "top-4 right-6 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-200/50 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 focus:outline-none focus:ring-offset-2 data-[state=open]:bg-gray-100/50",
          }}
        >
          <ModalContent>
            <ModalHeader className="flex items-center justify-start gap-x-4 ">
              <div className="inline-flex items-center justify-center p-2 text-center bg-blue-100 rounded-lg">
                <WalletIcon className="text-blue-500 w-7 h-7" />
              </div>
              <div className="flex flex-col items-start justify-start">
                <div>Sinkronisasi TPP</div>
                <div className="text-sm font-normal text-gray-400">
                  Data TPP SILKa Online
                </div>
              </div>
            </ModalHeader>
            <ModalBody className="flex items-center justify-center flex-column gap-y-3">
              <div className="p-3 bg-gray-50 rounded-xl">
                <InboxIcon className="text-gray-300 size-8 dark:text-gray-700" />
              </div>
              <p className="text-gray-300">Data TPP Tidak Ditemukan</p>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }
  return (
    <>
      <Modal
        size="3xl"
        backdrop="blur"
        isOpen={true}
        scrollBehavior="normal"
        onClose={() => router.back()}
        classNames={{
          closeButton:
            "top-4 right-6 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-200/50 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 focus:outline-none focus:ring-offset-2 data-[state=open]:bg-gray-100/50",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-start gap-x-4 ">
                <div className="inline-flex items-center justify-center p-2 text-center bg-blue-100 rounded-lg">
                  <WalletIcon className="text-blue-500 w-7 h-7" />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <div>Sinkronisasi TPP</div>
                  <div className="text-sm font-normal text-gray-400">
                    Data TPP SILKa Online
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <ScrollShadow>{renderTPP()}</ScrollShadow>
              </ModalBody>
              <ModalFooter className="flex items-center justify-between px-8 mt-2 rounded-b-xl bg-gray-50 dark:bg-blue-800/30">
                {renderActionHasil(onClose)} {renderActionKirim()}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

// @ts-ignore
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
      // @ts-ignore
      fid_status,
    } = queryTPP?.data[0];
    return (
      <>
        {queryTPP?.data[0].is_sync_simgaji !== "1" && (
          <AlertInfo title="Informasi">
            TPP belum dikirim, silahkan kirim data
          </AlertInfo>
        )}

        {!["4", "5"].includes(queryTPP?.data[0].fid_status) && (
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

        {["ENTRI", null].includes(queryTPP?.data[0].is_peremajaan) && (
          <AlertWarning
            title="Perhatian"
            message="Data Pegawai belum diremajakan, silahkan melakukan peremajaan data terlebih dahulu"
          />
        )}

        {queryTPP?.data[0].is_peremajaan === "VERIFIKASI" && (
          <AlertWarning
            title="Perhatian"
            message="Peremajaan data belum verifikasi oleh pengelola kepegawaian."
          />
        )}

        <div className="flex flex-col p-6 my-4 border-2 border-gray-200 rounded-lg gap-y-5">
          <div className="inline-flex flex-col justify-start sm:flex-row gap-x-8 gap-y-6">
            <div className="inline-flex items-start justify-start gap-x-4">
              <IdentificationIcon className="text-blue-600 size-6" />
              <div className="inline-flex flex-col">
                <div className="text-xs text-gray-400">NIP</div>
                <div className="text-sm font-semibold">
                  {polaNIP(nipppk) ?? "-"}
                </div>
              </div>
              <div className="inline-flex items-start justify-start gap-x-4">
                <UserIcon className="text-blue-600 size-6" />
                <div className="inline-flex flex-col">
                  <div className="text-xs text-gray-400">NAMA</div>
                  <div className="text-sm font-semibold">
                    {`${gelar_depan} ${nama} ${gelar_belakang}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex flex-col justify-start sm:flex-row gap-x-8 gap-y-8">
            <div className="inline-flex items-start justify-start gap-x-4">
              <BriefcaseIcon className="text-blue-600 size-6" />
              <div className="inline-flex flex-col">
                <div className="text-xs text-gray-400">JABATAN</div>
                <div className="text-sm font-semibold">{jabatan ?? "-"}</div>
              </div>
            </div>
          </div>
          <Divider />
          <div className="inline-flex flex-col justify-start sm:flex-row gap-x-8 gap-y-6">
            <div className="inline-flex items-start justify-start gap-x-4">
              <CalendarDaysIcon className="text-blue-600 size-6" />
              <div className="inline-flex flex-col">
                <div className="text-xs text-gray-400">BULAN</div>
                <div className="text-sm font-semibold">{bulan ?? "-"}</div>
              </div>
            </div>
            <div className="inline-flex items-start justify-start gap-x-4">
              <CalendarDaysIcon className="text-blue-600 size-6" />
              <div className="inline-flex flex-col">
                <div className="text-xs text-gray-400">TAHUN</div>
                <div className="text-sm font-semibold">{tahun ?? "-"}</div>
              </div>
            </div>
          </div>
        </div>
        <DetailKalkulasi data={queryTPP?.data[0]} />
      </>
    );
  }, [isFetching, isLoading, queryTPP?.data]);

  const renderActionHasil = useCallback(
    // @ts-ignore
    (onClose) => {
      if (isLoading || isFetching) return;
      if (queryTPP?.data[0].is_sync_simgaji !== "1") return;
      return (
        <>
          <Button
            // radius="none"
            className="disabled:cursor-not-allowed"
            isDisabled={queryTPP?.data[0].is_sync_simgaji !== "1"}
            color="success"
            variant="flat"
            startContent={<Download color="text-green-800" size={12} />}
            onPress={() => window.location.reload()}
          >
            Hasil Sinkronisasi
          </Button>
          <Button
            color="primary"
            variant="bordered"
            onPress={onClose}
            className="border-1 border-blue-500/50"
          >
            Tutup
          </Button>
        </>
      );
    },
    [isFetching, isLoading, queryTPP?.data],
  );

  const renderActionKirim = useCallback(() => {
    if (isLoading || isFetching) return;
    if (queryTPP?.data[0].is_sync_simgaji === "1") return;
    if (["4", "5"].includes(queryTPP?.data[0].fid_status)) return;
    if (queryTPP?.data[0].fid_status === "5") return;
    // jika status data peremajaan masih verifikasi, entri, null
    if (["VERIFIKASI", "ENTRI", null].includes(queryTPP?.data[0].is_peremajaan))
      return;

    return (
      <div className="inline-flex items-center justify-between w-full gap-x-3">
        <Button color="danger" variant="light" onPress={() => router.back()}>
          Batal
        </Button>
        <BtnKirimTPP {...sigapok} {...queryTPP?.data[0]} silka={silka} />
      </div>
    );
  }, [isFetching, isLoading, queryTPP?.data, router, sigapok, silka]);

  if (!queryTPP?.status) {
    return (
      <>
        <Modal
          size="2xl"
          backdrop="blur"
          isOpen={true}
          scrollBehavior="outside"
          onClose={() => router.back()}
          classNames={{
            closeButton:
              "top-4 right-6 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-200/50 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 focus:outline-none focus:ring-offset-2 data-[state=open]:bg-gray-100/50",
          }}
        >
          <ModalContent>
            <ModalHeader className="flex items-center justify-start gap-x-4 ">
              <div className="inline-flex items-center justify-center p-2 text-center bg-blue-100 rounded-lg">
                <WalletIcon className="text-blue-500 w-7 h-7" />
              </div>
              <div className="flex flex-col items-start justify-start">
                <div>Sinkronisasi TPP</div>
                <div className="text-sm font-normal text-gray-400">
                  Data TPP SILKa Online
                </div>
              </div>
            </ModalHeader>
            <ModalBody className="flex items-center justify-center flex-column gap-y-3">
              <div className="p-3 bg-gray-50 rounded-xl">
                <InboxIcon className="text-gray-300 size-8 dark:text-gray-700" />
              </div>
              <p className="text-gray-300">Data TPP Tidak Ditemukan</p>
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
        size="3xl"
        backdrop="blur"
        isOpen={true}
        scrollBehavior="outside"
        onClose={() => router.back()}
        classNames={{
          closeButton:
            "top-4 right-6 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-200/50 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 focus:outline-none focus:ring-offset-2 data-[state=open]:bg-gray-100/50",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-start gap-x-4 ">
                <div className="inline-flex items-center justify-center p-2 text-center bg-blue-100 rounded-lg">
                  <WalletIcon className="text-blue-500 w-7 h-7" />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <div>Sinkronisasi TPP</div>
                  <div className="text-sm font-normal text-gray-400">
                    Data TPP SILKa Online
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <ScrollShadow>{renderTPP()}</ScrollShadow>
              </ModalBody>
              <ModalFooter className="flex items-center justify-between px-8 mt-2 rounded-b-xl bg-gray-50 dark:bg-blue-800/30">
                {renderActionHasil(onClose)} {renderActionKirim()}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
