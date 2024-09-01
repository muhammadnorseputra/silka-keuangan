"use client";
import { getTppSigapokBySkpd } from "@/dummy/sigapok-get-tpp";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/lib/session";
import { Progress } from "@nextui-org/react";
import { getSkpdSigapokByKodeSimpeg } from "@/dummy/sigapok-get-skpd";
import { getPeriodeTPP } from "@/dummy/data-tpp-periode";
import { getPppkByUnor } from "@/dummy/data-pppk-by-unor";

export default function ProgresTpp({ KODE_SKPD_SIMPEG }) {
  const sigapok = useSession("USER_GAPOK");
  // get periode tpp
  const { data: periode } = useQuery({
    queryKey: ["periode.tpp"],
    queryFn: async () => {
      const res = await getPeriodeTPP();
      return res;
    },
  });
  const PERIODE_TPP = `${periode?.bulan.toString().padStart(2, "0")}${
    periode?.tahun
  }`;

  // get skpd_simgaji
  const { data: queryGetKodeSkpd, isLoading: isLoadingKodeSkpd } = useQuery({
    queryKey: ["count.sigapok.kode_skpd", KODE_SKPD_SIMPEG],
    queryFn: async () => {
      const getKodeSkpd = await getSkpdSigapokByKodeSimpeg(
        sigapok.access_token,
        KODE_SKPD_SIMPEG
      );
      return getKodeSkpd;
    },
  });

  // get jumlah tpp sudah dikirim
  const {
    data: querySigapokCountTpp,
    isLoading: isLoadingSigapok,
    isError: isErrorSigapok,
    error: errorMessageSigapok,
  } = useQuery({
    queryKey: ["count.sigapok.tpp", queryGetKodeSkpd?.data[0]],
    queryFn: async () => {
      const getJumlahTpp = await getTppSigapokBySkpd(
        sigapok.access_token,
        queryGetKodeSkpd?.data[0].id_skpd_gaji, //bkpsdm
        PERIODE_TPP
      );
      return getJumlahTpp;
    },
    enabled: !!queryGetKodeSkpd?.data[0],
  });

  // get jumlah pns berdasarkan skpd
  const {
    data: querySilkaCountPns,
    isLoading: isLoadingSilka,
    isError: isErrorSilka,
    error: errorMessageSilka,
  } = useQuery({
    queryKey: ["count.silka.tpp", queryGetKodeSkpd?.data[0]],
    queryFn: async () => {
      const getPegawaiByUnorId = await getPppkByUnor(
        queryGetKodeSkpd?.data[0].id_simpeg
      );
      return getPegawaiByUnorId;
    },
    enabled: !!queryGetKodeSkpd?.data[0],
  });
  console.log(querySilkaCountPns);

  if (periode?.status !== "OPEN") {
    return null;
  }

  if (isErrorSilka || isErrorSigapok)
    return (
      <p className="mb-4 text-red-500">
        {errorMessageSigapok.message || errorMessageSilka.message}
      </p>
    );
  if (isLoadingKodeSkpd || isLoadingSigapok || isLoadingSilka)
    return <p className="mb-4">Memuat Data ...</p>;

  let percent = Math.round(
    (querySigapokCountTpp?.data?.length / querySilkaCountPns?.data?.length) *
      100
  );

  return (
    <>
      <div className="flex items-center justify-center mb-4">
        <Progress
          size="md"
          radius="lg"
          color="success"
          label={`Progress Sinkronisasi TPP (${PERIODE_TPP}) ${querySigapokCountTpp?.data?.length} / ${querySilkaCountPns?.data?.length}`}
          value={percent === Infinity ? 0 : percent}
          showValueLabel={true}
        />
      </div>
    </>
  );
}
