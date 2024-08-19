"use client";
import { ButtonPeremajaanP3k } from "@/components/button/btn-peremajaan";
import { getPegawaiByNip } from "@/dummy/data-pegawai-by-nip";
import { formatTanggalIndonesia } from "@/helpers/cx";
import { Divider, Skeleton } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { ExclamationCircle } from "react-bootstrap-icons";

export default function SilkaDataP3k({ nip }) {
  const {
    data: row,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getDataPppkBySilka"],
    queryFn: async () => {
      const getPppk = await await getPegawaiByNip(nip);
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

  if (row.status_data !== "VERIFIKASI") {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <ExclamationCircle className="size-8" />
        <p className="text-gray-400">Data Belum Diremajakan</p>
        <ButtonPeremajaanP3k nip={nip} />
      </div>
    );
  }

  const namalengkap = `${row?.gelar_depan} ${row?.nama} ${row?.gelar_belakang}`;
  return (
    <>
      <div>
        <div className="text-gray-400">NAMA</div>
        <div className="font-bold">{namalengkap}</div>
      </div>
      <div>
        <div className="text-gray-400">NIP</div>
        <div className="font-bold">{row.nip}</div>
      </div>
      <div>
        <div className="text-gray-400">GELAR DEPAN</div>
        <div className="font-bold">{row.gelar_depan}</div>
      </div>
      <div>
        <div className="text-gray-400">GELAR BELAKNG</div>
        <div className="font-bold">{row.gelar_belakang}</div>
      </div>
      <div>
        <div className="text-gray-400">TINGKAT PENDIDIKAN</div>
        <div className="font-bold">{row.nama_tingkat_pendidikan}</div>
      </div>
      <div>
        <div className="text-gray-400">TEMPAT LAHIR</div>
        <div className="font-bold">{row.tmp_lahir}</div>
      </div>
      <div>
        <div className="text-gray-400">TANGGAL LAHIR</div>
        <div className="font-bold">{formatTanggalIndonesia(row.tgl_lahir)}</div>
      </div>
      <div>
        <div className="text-gray-400">ALAMAT SESUAI KTP</div>
        <div className="font-bold">{row.alamat_ktp}</div>
      </div>
      <div>
        <div className="text-gray-400">JENIS KELAMIN</div>
        <div className="font-bold">{row.jenis_kelamin}</div>
      </div>
      <div>
        <div className="text-gray-400">AGAMA</div>
        <div className="font-bold">{row.nama_agama}</div>
      </div>
      <Divider />
      <div>
        <div className="text-gray-400">UNIT KERJA</div>
        <div className="font-bold">{row.nama_unit_kerja}</div>
      </div>
      <div className="flex flex-col sm:flex-row justify-start gap-x-16">
        <div>
          <div className="text-gray-400">JENIS PEGAWAI</div>
          <div className="font-bold">{row.kode_jenis_pegawai}</div>
        </div>
        <div>
          <div className="text-gray-400">STATUS PEGAWAI</div>
          <div className="font-bold">{row.kode_status_pegawai}</div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-start gap-x-16">
        <div>
          <div className="text-gray-400">
            {row.jenis_kelamin === "L" ? "JUMLAH ISTRI" : "JUMLAH SUAMI"}
          </div>
          <div className="font-bold">{row.jumlah_sutri}</div>
        </div>
        <div>
          <div className="text-gray-400">JUMLAH ANAK</div>
          <div className="font-bold">{row.jumlah_anak}</div>
        </div>
      </div>
    </>
  );
}
