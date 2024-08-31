"use client";
import { getTppSigapokBySkpd } from "@/dummy/sigapok-get-tpp";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/lib/session";
import { Progress, Skeleton } from "@nextui-org/react";
import { getPegawaiByUnor } from "@/dummy/data-pegawai-by-unor";
import { useEffect, useState } from "react";
import { getSkpdSigapokByKodeSimpeg } from "@/dummy/sigapok-get-skpd";

export default function ProgresTpp({ KODE_SKPD_SIMPEG }) {
  const [value, setValue] = useState(0);
  const sigapok = useSession("USER_GAPOK");
  // progress kirim tpp
  let monthYear =
    (new Date().getMonth() + 1).toString().padStart(2, "0") +
    new Date().getFullYear();

  const PERIODE_TPP = "072024";
  // get skpd_simgaji
  const {
    data: queryGetKodeSkpd,
    isLoading: isLoadingKodeSkpd,
    isSuccess,
  } = useQuery({
    queryKey: ["count.sigapok.kode_skpd", KODE_SKPD_SIMPEG],
    queryFn: async () => {
      const getKodeSkpd = getSkpdSigapokByKodeSimpeg(
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
    queryKey: ["count.sigapok.tpp", KODE_SKPD_SIMPEG],
    queryFn: async () => {
      const getJumlahTpp = await getTppSigapokBySkpd(
        sigapok.access_token,
        queryGetKodeSkpd?.data[0].id_skpd_gaji, //bkpsdm
        PERIODE_TPP
      );
      return getJumlahTpp;
    },
  });

  // get jumlah pns berdasarkan skpd
  const {
    data: querySilkaCountPns,
    isLoading: isLoadingSilka,
    isError: isErrorSilka,
    error: errorMessageSilka,
  } = useQuery({
    queryKey: ["count.silka.tpp"],
    queryFn: async () => {
      const getPegawaiByUnorId = await getPegawaiByUnor(
        queryGetKodeSkpd?.data[0].id_simpeg
      );
      return getPegawaiByUnorId;
    },
  });
  if (isErrorSilka || isErrorSigapok)
    return (
      <p className="mb-4 text-red-500">
        {errorMessageSigapok || errorMessageSilka}
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
          label={`Progress Sinkronisasi TPP (${PERIODE_TPP})`}
          value={percent === Infinity ? 0 : percent}
          showValueLabel={true}
        />
      </div>
    </>
  );
}
