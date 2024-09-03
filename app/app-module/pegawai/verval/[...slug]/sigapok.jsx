"use client";
import { BtnRollBackPNSSigapok } from "@/components/button/btn-rollback-pns-sigapok";
import { PlaceholderBar } from "@/components/skeleton/placeholder-bar";
import { getInfoPegawai } from "@/dummy/sigapok-get-pegawai";
import { formatTanggalIndonesia } from "@/helpers/cx";
import { polaNIP } from "@/helpers/polanip";
import {
  useNamaAgama,
  useNamaJenisPegawai,
  useNamaSKPD,
  useNamaStatusPegawai,
} from "@/lib/FetchQuery";
import { Divider, Skeleton } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { ExclamationCircle } from "react-bootstrap-icons";

export default function VervalSigapokPegawai({ sigapok, nip }) {
  const {
    data: row,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["verval.sigapok.pegawai", nip],
    queryFn: async () => {
      const getPegawai = await getInfoPegawai(sigapok.access_token, nip);
      return getPegawai;
    },
    refetchOnWindowFocus: false,
  });

  const {
    data: SKPD,
    isLoading: isLoadingSKPD,
    isFetching: isFetchingSKPD,
  } = useNamaSKPD(row?.KDSKPD);

  const {
    data: Agama,
    isLoading: isLoadingAgama,
    isFetching: isFetchingAgama,
  } = useNamaAgama(row?.AGAMA);

  const {
    data: JenisPegawai,
    isLoading: isLoadingJenisPegawai,
    isFetching: isFetchingJenisPegawai,
  } = useNamaJenisPegawai(row?.KD_JNS_PEG);

  const {
    data: StatusPegawai,
    isLoading: isLoadingStatusPegawai,
    isFetching: isFetchingStatusPegawai,
  } = useNamaStatusPegawai(row?.KDSTAPEG);

  if (isLoading || isFetching) return <PlaceholderBar />;

  if (!row?.NIP) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <ExclamationCircle className="size-8" />
        <p className="text-gray-400">{row?.message}</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="text-gray-400">NAMA</div>
        <div className="font-bold">
          {row?.GLRDEPAN} {row?.NAMA} {row?.GLRBELAKANG}
        </div>
      </div>
      <div>
        <div className="text-gray-400">NIP</div>
        <div className="font-bold">{polaNIP(row?.NIP)}</div>
      </div>
      <div>
        <div className="text-gray-400">GELAR DEPAN</div>
        <div className="font-bold">{row?.GLRDEPAN}</div>
      </div>
      <div>
        <div className="text-gray-400">GELAR BELAKANG</div>
        <div className="font-bold">{row?.GLRBELAKANG}</div>
      </div>
      <div>
        <div className="text-gray-400">PENDIDIKAN</div>
        <div className="font-bold">{row?.PENDIDIKAN}</div>
      </div>
      <div>
        <div className="text-gray-400">TEMPAT LAHIR</div>
        <div className="font-bold">{row?.TEMPATLHR}</div>
      </div>
      <div>
        <div className="text-gray-400">TANGGAL LAHIR</div>
        <div className="font-bold">{formatTanggalIndonesia(row?.TGLLHR)}</div>
      </div>
      <div>
        <div className="text-gray-400">ALAMAT KTP</div>
        <div className="font-bold truncate text-ellipsis hover:whitespace-normal">
          {row?.ALAMAT}
        </div>
      </div>
      <div>
        <div className="text-gray-400">JENIS KELAMIN</div>
        <div className="font-bold">{row?.KDJENKEL === 1 ? "L" : "P"}</div>
      </div>
      <div>
        <div className="text-gray-400">AGAMA</div>
        <div className="font-bold">
          {isLoadingAgama || isFetchingAgama ? (
            <Skeleton className="w-full rounded-lg">
              <div className="h-6 w-full rounded-lg bg-default-200"></div>
            </Skeleton>
          ) : (
            Agama?.data[0]?.nama_agama
          )}
        </div>
      </div>
      <Divider />
      <div>
        <div className="text-gray-400">UNIT KERJA</div>
        <div className="font-bold">
          {isLoadingSKPD || isFetchingSKPD ? (
            <Skeleton className="w-full rounded-lg">
              <div className="h-6 w-full rounded-lg bg-default-200"></div>
            </Skeleton>
          ) : (
            SKPD?.data[0]?.nama_unit_kerja
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-start gap-x-16">
        <div>
          <div className="text-gray-400">JENIS PEGAWAI</div>
          <div className="font-bold">
            {isLoadingJenisPegawai || isFetchingJenisPegawai ? (
              <Skeleton className="w-full rounded-lg">
                <div className="h-6 w-full rounded-lg bg-default-200"></div>
              </Skeleton>
            ) : (
              JenisPegawai?.data[0]?.nama_jenis
            )}
          </div>
        </div>
        <div>
          <div className="text-gray-400">STATUS PEGAWAI</div>
          <div className="font-bold">
            {isLoadingStatusPegawai || isFetchingStatusPegawai ? (
              <Skeleton className="w-full rounded-lg">
                <div className="h-6 w-full rounded-lg bg-default-200"></div>
              </Skeleton>
            ) : (
              StatusPegawai?.data[0]?.nama_statuspeg
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-start gap-x-16">
        <div>
          <div className="text-gray-400">
            {row?.KDJENKEL === 1 ? "JUMLAH ISTRI" : "JUMLAH SUAMI"}
          </div>
          <div className="font-bold">{row?.JISTRI}</div>
        </div>
        <div>
          <div className="text-gray-400">JUMLAH ANAK</div>
          <div className="font-bold">{row?.JANAK}</div>
        </div>
      </div>
      <Divider />
      {!!row?.NIP ? <BtnRollBackPNSSigapok sigapok={sigapok} data={row} /> : ""}
    </>
  );
}
