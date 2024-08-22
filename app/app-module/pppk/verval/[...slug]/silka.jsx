"use client";
import { ButtonPeremajaanP3k } from "@/components/button/btn-peremajaan";
import { ModalPeremajaanApprove } from "@/components/modal/modal-peremajaan-approve";
import { getPPPKByNipppk } from "@/dummy/data-pppk-by-nipppk";
import { TambahPegawaiPppk } from "@/dummy/sigapok-post-pppk";
import { formatRupiah, formatTanggalIndonesia } from "@/helpers/cx";
import { useModalContext } from "@/lib/context/modal-context";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { Button, Divider, Skeleton } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";
import { useEffect } from "react";
import { ExclamationCircle } from "react-bootstrap-icons";
import toast from "react-hot-toast";

export default function SilkaDataP3k({ access_token, nip }) {
  const { isOpen, setIsOpen } = useModalContext();
  const queryClient = useQueryClient();
  const {
    data: row,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getDataPppkBySilka"],
    queryFn: async () => {
      const getPppk = await await getPPPKByNipppk(nip);
      return getPppk;
    },
    refetchOnWindowFocus: false,
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["peremajaanPppk"],
    mutationFn: async (body) => {
      const res = await TambahPegawaiPppk(access_token, body);
      return res;
    },
  });

  useEffect(() => {
    if (isPending) {
      toast.loading(`Sending ...`, {
        id: "Toaster",
      });
    }
  }, [isPending]);

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

  function handleSubmit() {
    const RAWJSON = {
      NIP: row.nipppk,
      NAMA: row.nama,
      GLRDEPAN: row.gelar_depan,
      GLRBELAKANG: row.gelar_blk,
      KDJENKEL: row.jns_kelamin == "PRIA" ? 1 : 2,
      TEMPATLHR: row.tmp_lahir,
      TGLLHR: row.tgl_lahir,
      JISTRI: row.jumlah_sutri,
      JANAK: row.jumlah_anak,
      KDSTAPEG: Number(row.kode_statuspeg), //berdasarkan status pegawai 12 = ppppk
      KDPANGKAT: row.nama_golru,
      GAPOK: row.gaji_pokok,
      MKGOLT: row.maker_tahun,
      KD_SKPD: row.simgaji_id_skpd,
      KETERANGAN: "",
      TMTGAJI: row.tmt_pppk_awal,
      INDUK_BANK: "",
      NOREK: "",
      NOKTP: row.nik,
      NPWP: row.no_npwp,
      NOTELP: row.no_handphone,
      NOMORSKEP: row.nomor_sk,
      PENERBITSKEP: row.pejabat_sk,
      TGLSKEP: row.tgl_sk,
      ALAMAT: row.alamat,
      KDGURU: "",
      // KATEGORI: row.jenis_formasi,
      KATEGORI: 4, //kode berdasarkan jenis pegawai 4 = pppk
      FORMASI: row.tahun_formasi,
      AKHIRKONTRAK: row.tmt_pppk_akhir,
    };
    // @ts-ignore
    mutate(RAWJSON, {
      onSuccess: (response) => {
        if (response.success === false || !response.success) {
          return toast.error(
            `Terjadi Kesalahan ${JSON.stringify(response.message)}`,
            {
              id: "Toaster",
            }
          );
        }
        toast.success(response.message, {
          id: "Toaster",
        });
        setIsOpen(false);
        queryClient.invalidateQueries({
          queryKey: ["getDataPppk"],
        });
      },
      onError: (err) => {
        toast.error(err.message, {
          id: "Toaster",
        });
      },
    });
  }

  const namalengkap = `${row?.gelar_depan} ${row?.nama} ${row?.gelar_blk}`;
  return (
    <>
      <ModalPeremajaanApprove
        isOpenModal={isOpen}
        onClose={() => setIsOpen(false)}
        handleApprove={handleSubmit}
        isLoading={isPending}
      />
      <div>
        <div className="text-gray-400">NAMA</div>
        <div className="font-bold">{namalengkap}</div>
      </div>
      <div>
        <div className="text-gray-400">NIP</div>
        <div className="font-bold">{row.nipppk}</div>
      </div>
      <div>
        <div className="text-gray-400">GELAR DEPAN</div>
        <div className="font-bold">
          {row.gelar_depan === null || row.gelar_depan === ""
            ? "-"
            : row.gelar_depan}
        </div>
      </div>
      <div>
        <div className="text-gray-400">GELAR BELAKNG</div>
        <div className="font-bold">{row.gelar_blk}</div>
      </div>
      {/* <div>
        <div className="text-gray-400">TINGKAT PENDIDIKAN</div>
        <div className="font-bold">{row.nama_tingkat_pendidikan}</div>
      </div> */}
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
        <div className="font-bold">{row.alamat}</div>
      </div>
      <div>
        <div className="text-gray-400">JENIS KELAMIN</div>
        <div className="font-bold">{row.jns_kelamin}</div>
      </div>
      <Divider />
      <div>
        <div className="text-gray-400">UNIT KERJA</div>
        <div className="font-bold">{row.nama_unit_kerja}</div>
      </div>
      <div className="flex flex-col sm:flex-row justify-start gap-x-16">
        <div>
          <div className="text-gray-400">GAJI POKOK</div>
          <div className="font-bold">{formatRupiah(row.gaji_pokok)}</div>
        </div>
        <div>
          <div className="text-gray-400">JENIS FORMASI</div>
          <div className="font-bold">{row.jenis_formasi}</div>
        </div>
        <div>
          <div className="text-gray-400">STATUS PEGAWAI</div>
          <div className="font-bold">{row.kode_statuspeg ?? "-"}</div>
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
      <Divider />
      <div>
        <div className="text-gray-400">NOMOR SK</div>
        <div className="font-bold">{row.nomor_sk ?? "-"}</div>
      </div>
      <div>
        <div className="text-gray-400">TANGGAL SK</div>
        <div className="font-bold">
          {formatTanggalIndonesia(row.tgl_sk) ?? "-"}
        </div>
      </div>
      <div>
        <div className="text-gray-400">PENERBIT SK</div>
        <div className="font-bold">{row.pejabat_sk ?? "-"}</div>
      </div>
      <Divider />
      <Button color="primary" variant="shadow" onPress={() => setIsOpen(true)}>
        <HandThumbUpIcon className="size-5 text-white" />
        <Divider orientation="vertical" />
        Approve
      </Button>
    </>
  );
}
