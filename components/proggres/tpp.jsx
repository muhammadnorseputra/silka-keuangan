"use client";
import { getTppSigapokBySkpd } from "@/dummy/sigapok-get-tpp";
import { useQuery } from "@tanstack/react-query";
import { Progress } from "@nextui-org/react";
import { getASNByUnor } from "@/dummy/data-pegawai-by-unor";
import { getPeriodeTPP } from "@/dummy/data-tpp-periode";

export default function ProgresTpp({ KODE_SKPD_SIMPEG, sigapok }) {
  // get periode tpp
  const { data: periode, isLoading: isLoadingPeriode } = useQuery({
    queryKey: ["periode.tpp", KODE_SKPD_SIMPEG],
    queryFn: async () => {
      const res = await getPeriodeTPP();
      return res;
    },
    enabled: !!KODE_SKPD_SIMPEG,
  });

  const PERIODE_TPP = `${periode?.bulan.toString().padStart(2, "0")}${
    periode?.tahun
  }`;

  // get jumlah pns berdasarkan skpd
  const {
    data: querySilkaCountPns,
    isLoading: isLoadingSilka,
    isError: isErrorSilka,
    error: errorMessageSilka,
  } = useQuery({
    queryKey: ["count.silka.tpp", KODE_SKPD_SIMPEG],
    queryFn: async () => {
      const getPegawaiByUnorId = await getASNByUnor(KODE_SKPD_SIMPEG);
      return getPegawaiByUnorId;
    },
    enabled: !!PERIODE_TPP,
  });

  // get jumlah tpp sudah dikirim
  const {
    data: querySigapokCountTpp,
    isLoading: isLoadingSigapok,
    isError: isErrorSigapok,
    error: errorMessageSigapok,
  } = useQuery({
    queryKey: ["count.sigapok.tpp", querySilkaCountPns?.data.id_skpd_simgaji],
    queryFn: async () => {
      const getJumlahTpp = await getTppSigapokBySkpd(
        sigapok.access_token,
        querySilkaCountPns?.data.id_skpd_simgaji, //bkpsdm
        PERIODE_TPP
      );
      return getJumlahTpp;
    },
    enabled: !!querySilkaCountPns?.data.id_skpd_simgaji,
  });

  if (periode?.status !== "OPEN") {
    return null;
  }

  if (isErrorSilka || isErrorSigapok)
    return (
      <p className="mb-4 text-red-500">
        {errorMessageSigapok.message || errorMessageSilka.message}
      </p>
    );
  if (isLoadingPeriode || isLoadingSigapok || isLoadingSilka)
    return <p className="mb-4">Memuat Data ...</p>;

  let percent = Math.round(
    (querySigapokCountTpp?.data?.length / querySilkaCountPns?.data?.total) * 100
  );

  return (
    <>
      <div className="flex items-center justify-center mb-4">
        <Progress
          size="md"
          radius="lg"
          color="success"
          label={`Progress Sinkronisasi TPP (${PERIODE_TPP}) ${
            querySigapokCountTpp?.data?.length ?? 0
          } / ${querySilkaCountPns?.data?.total}`}
          value={percent === Infinity ? 0 : percent}
          showValueLabel={true}
        />
      </div>
    </>
  );
}
