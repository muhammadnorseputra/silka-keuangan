"use client";
import { ButtonPeremajaanP3k } from "@/components/button/btn-peremajaan";
import { ModalPeremajaanApprove } from "@/components/modal/modal-peremajaan-approve";
import { getPPPKByNipppk } from "@/dummy/data-pppk-by-nipppk";
import { RollbackPPPK, UpdateSyncPPPK } from "@/dummy/post-data-pppk";
import { TambahPegawai } from "@/dummy/sigapok-post-pegawai";
import { formatRupiah, formatTanggalIndonesia } from "@/helpers/cx";
import { getTanggalHariIni } from "@/helpers/fn_tanggal";
import { limitCharacters } from "@/helpers/text";
import { useModalContext } from "@/lib/context/modal-context";
import revalidateTag from "@/lib/revalidateTags";
import { HandThumbUpIcon, UserMinusIcon } from "@heroicons/react/24/solid";
import { Button, Divider, Skeleton } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
      const getPppk = await getPPPKByNipppk(nip);
      return getPppk;
    },
    refetchOnWindowFocus: false,
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["peremajaanPppk"],
    mutationFn: async (body) => {
      const res = await TambahPegawai(access_token, body);
      if (res.success === true) {
        await UpdateSyncPPPK({
          nipppk: nip,
          status: "APPROVE",
        });
      }
      return res;
    },
  });

  const { mutate: rollbackFn, isPending: rollbackIsPending } = useMutation({
    mutationKey: ["rollbackP3K"],
    mutationFn: async (body) => {
      const res = await RollbackPPPK(body);
      return res;
    },
  });

  useEffect(() => {
    if (isPending || rollbackIsPending) {
      toast.loading(`Sending ...`, {
        id: "Toaster",
      });
    }
  }, [isPending, rollbackIsPending]);

  if (isLoading || isFetching) {
    return (
      <>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="w-3/5 h-6 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="w-4/5 h-6 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="w-2/5 h-6 rounded-lg bg-default-300"></div>
          </Skeleton>
          <Skeleton className="rounded-lg w-5/5">
            <div className="h-6 rounded-lg w-5/5 bg-default-500"></div>
          </Skeleton>
        </div>
      </>
    );
  }

  if (row.status_data === "ENTRI" || row.status_data === null) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <ExclamationCircle className="size-8" />
        <p className="text-gray-400">Data Belum Diremajakan</p>
        <ButtonPeremajaanP3k nip={nip} />
      </div>
    );
  }

  function handleRollback() {
    const RAWJSON = {
      nipppk: row.nipppk,
      status: "ENTRI",
    };
    // @ts-ignore
    rollbackFn(RAWJSON, {
      onSuccess: (response) => {
        if (response.status === false || !response.status) {
          return toast.error(`Terjadi Kesalahan ${response.message}`, {
            id: "Toaster",
          });
        }
        toast.success(response.message, {
          id: "Toaster",
        });

        revalidateTag("datap3k");
        queryClient.invalidateQueries({
          queryKey: ["getDataPppkBySilka"],
        });
      },
      onError: (err) => {
        toast.error(err.message, {
          id: "Toaster",
        });
      },
    });
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
      AGAMA: row.simgaji_id_agama,
      zakat_dg: 0,
      PENDIDIKAN: row.nama_tingkat_pendidikan,
      TMTCAPEG: row.tmt_pppk_awal,
      TMTSKMT: row.tmt_spmt,
      KDSTAWIN: row.simgaji_id_status_kawin,
      JISTRI: Number(row.jumlah_sutri),
      JANAK: Number(row.jumlah_anak),
      KDSTAPEG: row.kode_statuspeg, //berdasarkan status pegawai 12 = ppppk
      KDPANGKAT: row.simgaji_id_pangkat, //kode pangkat beda dengan di simpeg
      MKGOLT: Number(row.maker_tahun),
      BLGOLT: 0,
      GAPOK: Number(row.gaji_pokok),
      MASKER: Number(row.maker_tahun),
      PRSNGAPOK: 0,
      KDESELON: "",
      TJESELON: 0,
      KDFUNGSI1: "0",
      KDFUNGSI: "0",
      TJFUNGSI: 0,
      KDSTRUK: "0",
      TJSTRUK: 0,
      KDGURU: "",
      KDSKPD: row.simgaji_id_skpd,
      KDSATKER: row.simgaji_id_satker,
      ALAMAT: row.alamat,
      KDDATI2: process.env.NEXT_PUBLIC_GAPOK_KDDATI2,
      KDDATI1: process.env.NEXT_PUBLIC_GAPOK_KDDATI1,
      NOTELP: row.no_handphone,
      NOKTP: row.nik,
      NPWP: row.no_npwp,
      KDHITUNG: 1,
      induk_bank: "",
      NOREK: "",
      // TMTGAJI: row.tmt_pppk_awal,
      TMTBERLAKU: getTanggalHariIni(),
      KDJNSTRANS: "",
      INPUTER: row.status_data_add_by,
      KD_JNS_PEG: 4, // 4 = pppk
      NOMORSKEP: row.nomor_sk,
      PENERBITSKEP: row.pejabat_sk,
      TGLSKEP: row.tgl_sk,
      // KDGURU: "",
      // KATEGORI: row.jenis_formasi,
      // KATEGORI: 4, //kode berdasarkan jenis pegawai 4 = pppk
      TMT_JOIN: row.tmt_pppk_awal,
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
        revalidateTag("datap3k");
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
      <div>
        <div className="text-gray-400">JABATAN</div>
        <div className="font-bold">{row.nama_jabatan}</div>
      </div>
      <div className="flex flex-col justify-start sm:flex-row gap-x-16">
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
          <div className="font-bold">{row.nama_statuspeg ?? "-"}</div>
        </div>
      </div>
      <div className="flex flex-col justify-start sm:flex-row gap-x-16">
        <div>
          <div className="text-gray-400">TMT AWAL PPPK</div>
          <div className="font-bold">
            {formatTanggalIndonesia(row?.tmt_pppk_awal) ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">PANGKAT</div>
          <div className="font-bold">{row?.nama_golru ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">AKHIR KONTRAK</div>
          <div className="font-bold">
            {formatTanggalIndonesia(row?.tmt_pppk_akhir) ?? "-"}
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col justify-start sm:flex-row gap-x-16">
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
      {/*
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
      </div> */}
      <Divider />
      <div className="flex flex-col justify-between w-full gap-3 sm:flex-row">
        <Button
          isLoading={rollbackIsPending}
          isDisabled={rollbackIsPending}
          className="w-full sm:w-1/2"
          color="danger"
          variant="shadow"
          onPress={() => handleRollback()}>
          <UserMinusIcon className="text-white size-5" />
          <Divider orientation="vertical" />
          Rollback
        </Button>
        <Button
          className="w-full"
          color="primary"
          variant="shadow"
          onPress={() => setIsOpen(true)}>
          <HandThumbUpIcon className="text-white size-5" />
          <Divider orientation="vertical" />
          Approve
        </Button>
      </div>
    </>
  );
}
