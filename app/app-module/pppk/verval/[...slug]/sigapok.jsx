"use client";
import { BtnRollBackPPPK } from "@/components/button/btn-rollback-pppk";
import { getSigapokP3K } from "@/dummy/sigapok-get-pppk";
import { formatRupiah, formatTanggalIndonesia } from "@/helpers/cx";
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
      const getPppk = await getSigapokP3K(sigapok.access_token, nip);
      return getPppk;
    },
    refetchOnWindowFocus: false,
  });

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

  if (row?.success === false || !row?.success) {
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
        <div className="font-bold">{row.data.NAMA ?? "-"}</div>
      </div>
      <div>
        <div className="text-gray-400">NIP</div>
        <div className="font-bold">{row.data.NIP ?? "-"}</div>
      </div>
      <div>
        <div className="text-gray-400">GELAR DEPAN</div>
        <div className="font-bold">{row.data.GLRDEPAN ?? "-"}</div>
      </div>
      <div>
        <div className="text-gray-400">GELAR BELAKNG</div>
        <div className="font-bold">{row.data.GLRBELAKANG ?? "-"}</div>
      </div>
      <div>
        <div className="text-gray-400">TEMPAT LAHIR</div>
        <div className="font-bold">{row.data.TEMPATLHR ?? "-"}</div>
      </div>
      <div>
        <div className="text-gray-400">TANGGAL LAHIR</div>
        <div className="font-bold">
          {formatTanggalIndonesia(row.data.TGLLHR) ?? "-"}
        </div>
      </div>
      <div>
        <div className="text-gray-400">ALAMAT SESUAI KTP</div>
        <div className="font-bold">{row.data.ALAMAT ?? "-"}</div>
      </div>
      <div>
        <div className="text-gray-400">JENIS KELAMIN</div>
        <div className="font-bold">
          {row.data.KDJENKEL === 1 ? "PRIA" : "PEREMPUAN"}
        </div>
      </div>
      <Divider />
      <div>
        <div className="text-gray-400">UNIT KERJA</div>
        <div className="font-bold">{row.data.NAMA_SKPD ?? "-"}</div>
      </div>
      <div className="flex flex-col flex-wrap sm:flex-row justify-start gap-x-16 gap-y-6">
        <div>
          <div className="text-gray-400">GAJI POKOK</div>
          <div className="font-bold">{formatRupiah(row.data.GAPOK) ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">PANGKAT</div>
          <div className="font-bold">{row.data.KDPANGKAT ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">MK GOL TAHUN</div>
          <div className="font-bold">{row.data.MKGOLT ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">MG GOL BULAN</div>
          <div className="font-bold">{row.data.BLGOLT ?? "-"}</div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-start gap-x-16">
        <div>
          <div className="text-gray-400">FORMASI</div>
          <div className="font-bold">{row.data.FORMASI ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">AKHIR KONTRAK</div>
          <div className="font-bold">
            {formatTanggalIndonesia(row.data.AKHIRKONTRAK) ?? "-"}
          </div>
        </div>
      </div>
      <Divider />
      <div>
        <div className="text-gray-400">NOMOR SK</div>
        <div className="font-bold">{row.data.NOMORSKEP ?? "-"}</div>
      </div>
      <div>
        <div className="text-gray-400">TANGGAL SK</div>
        <div className="font-bold">
          {formatTanggalIndonesia(row.data.TGLSKEP) ?? "-"}
        </div>
      </div>
      <div>
        <div className="text-gray-400">PENERBIT SK</div>
        <div className="font-bold">{row.data.PENERBITSKEP ?? "-"}</div>
      </div>
      <Divider />
      <RollBackPPPK sigapok={sigapok} pppk={row} />
    </>
  );
}

const RollBackPPPK = ({ sigapok, pppk }) => {
  if (pppk.success === false) {
    return;
  }

  return <BtnRollBackPPPK sigapok={sigapok} pppk={pppk} />;
};
