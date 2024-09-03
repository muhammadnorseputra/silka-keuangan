"use client";
import { BtnRollBackPPPK } from "@/components/button/btn-rollback-pppk";
import { getInfoPegawai } from "@/dummy/sigapok-get-pegawai";
import { formatRupiah, formatTanggalIndonesia } from "@/helpers/cx";
import { useNamaSKPD } from "@/lib/FetchQuery";
import { Divider, Skeleton } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { ExclamationCircle } from "react-bootstrap-icons";

export default function SigapokDataP3k({ sigapok, nip }) {
  const {
    data: row,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getDataPppk"],
    queryFn: async () => {
      const getPppk = await getInfoPegawai(sigapok.access_token, nip);
      return getPppk;
    },
    refetchOnWindowFocus: false,
  });

  const {
    data: SKPD,
    isLoading: isLoadingSKPD,
    isFetching: isFetchingSKPD,
  } = useNamaSKPD(row?.KDSKPD);

  if (isLoading || isFetching) {
    return (
      <>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-6 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-6 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-6 w-2/5 rounded-lg bg-default-300"></div>
          </Skeleton>
          <Skeleton className="w-5/5 rounded-lg">
            <div className="h-6 w-5/5 rounded-lg bg-default-500"></div>
          </Skeleton>
        </div>
      </>
    );
  }

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
          {row?.GLRDEPAN} {row?.NAMA ?? "-"} {row?.GLRBELAKANG}
        </div>
      </div>
      <div>
        <div className="text-gray-400">NIP</div>
        <div className="font-bold">{row?.NIP ?? "-"}</div>
      </div>
      {/* <div>
        <div className="text-gray-400">GELAR DEPAN</div>
        <div className="font-bold">{row.data.GLRDEPAN ?? "-"}</div>
      </div>
      <div>
        <div className="text-gray-400">GELAR BELAKNG</div>
        <div className="font-bold">{row.data.GLRBELAKANG ?? "-"}</div>
      </div> */}
      <div>
        <div className="text-gray-400">TEMPAT LAHIR</div>
        <div className="font-bold">{row?.TEMPATLHR ?? "-"}</div>
      </div>
      <div>
        <div className="text-gray-400">TANGGAL LAHIR</div>
        <div className="font-bold">
          {formatTanggalIndonesia(row?.TGLLHR) ?? "-"}
        </div>
      </div>
      <div>
        <div className="text-gray-400">ALAMAT SESUAI KTP</div>
        <div className="font-bold">{row?.ALAMAT ?? "-"}</div>
      </div>
      <div>
        <div className="text-gray-400">JENIS KELAMIN</div>
        <div className="font-bold">
          {row?.KDJENKEL === 1 ? "PRIA" : "PEREMPUAN"}
        </div>
      </div>
      <Divider />
      <div>
        <div className="text-gray-400">UNIT KERJA</div>
        <div className="font-bold">
          {isLoadingSKPD || isFetchingSKPD
            ? "Loading ..."
            : SKPD?.data[0]?.nama_unit_kerja}
        </div>
      </div>
      <div className="flex flex-col flex-wrap sm:flex-row justify-start gap-x-16 gap-y-6">
        <div>
          <div className="text-gray-400">GAJI POKOK</div>
          <div className="font-bold">{formatRupiah(row?.GAPOK) ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">FORMASI</div>
          <div className="font-bold">{row?.FORMASI ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">MK GOL TAHUN</div>
          <div className="font-bold">{row?.MKGOLT ?? "-"}</div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-start gap-x-16">
        <div>
          <div className="text-gray-400">TMT AWAL PPPK</div>
          <div className="font-bold">
            {formatTanggalIndonesia(row?.TMT_JOIN) ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">PANGKAT</div>
          <div className="font-bold">{row?.KDPANGKAT ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">AKHIR KONTRAK</div>
          <div className="font-bold">
            {formatTanggalIndonesia(row?.AKHIRKONTRAK) ?? "-"}
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col sm:flex-row justify-start gap-x-16">
        <div>
          <div className="text-gray-400">
            {row.KDJENKEL === 1 ? "JUMLAH ISTRI" : "JUMLAH SUAMI"}
          </div>
          <div className="font-bold">{row?.JISTRI ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">JUMLAH ANAK</div>
          <div className="font-bold">{row?.JANAK ?? "-"}</div>
        </div>
      </div>
      <Divider />
      <RollBackPPPK sigapok={sigapok} pppk={row} />
    </>
  );
}

const RollBackPPPK = ({ sigapok, pppk }) => {
  if (!pppk?.NIP) {
    return;
  }

  return <BtnRollBackPPPK sigapok={sigapok} pppk={pppk} />;
};
