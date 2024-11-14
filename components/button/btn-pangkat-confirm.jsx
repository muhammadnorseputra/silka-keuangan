"use client";
import { useModalContext } from "@/lib/context/modal-context";
import { Button, Divider } from "@nextui-org/react";
import { CloudArrowUp } from "react-bootstrap-icons";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { savePerubahanData } from "@/dummy/sigapok-post-perubahan";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { UpdateSyncKGB } from "@/dummy/post-data-tpp";
import revalidateTag from "@/lib/revalidateTags";
import { getCurrentDateTime } from "@/helpers/datetime";
import { ModalPangkatProses } from "../modal/modal-pangkat-proses";
import { UpdateSyncPangkat } from "@/dummy/post-data-pangkat";
export default function BtnPangkatConfirm({
  RIWAYAT_PANGKAT: pangkat,
  SESSION,
  access_token,
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["updatePerubahanData"],
    mutationFn: async (body) => {
      // kirim perubahan data ke sigapok
      const response = await savePerubahanData(access_token, body);
      if (response.success === true) {
        // update status is_sync pada riwayat_kgb
        await UpdateSyncPangkat({
          id: pangkat.data.row.id,
          is_sync: "1",
          type: "PNS",
        });
      }
      return response;
    },
  });
  useEffect(() => {
    if (isPending) {
      toast.loading(`Sending ...`, {
        id: "Toaster",
      });
      return;
    }
  }, [isPending]);
  const BODY = {
    NIP_LAMA: pangkat.data.nip_lama,
    NIP_BARU: pangkat.data.nip,
    NAMA: pangkat.data.nama_lengkap,
    STATUS_PEGAWAI_ID: Number(pangkat.data.row.id_status_pegawai_simgaji),
    STATUS_PEGAWAI_NAMA: pangkat.data.row.nama_status_pegawai_simgaji,
    KATEGORI_PEG: Number(pangkat.data.row.id_jenis_pegawai_simgaji),
    TIPE_PEGAWAI_ID: Number(pangkat.data.row.id_jenis_pegawai_simgaji),
    TIPE_PEGAWAI_NAMA: pangkat.data.row.nama_jenis_pegawai_simgaji,
    PANGKAT_ID: pangkat.data.row.id_pangkat_simgaji,
    PANGKAT_NAMA: pangkat.data.row.nama_pangkat,
    GAJI_POKOK: Number(pangkat.data.row.gapok),
    MASA_KERJA_TAHUN: Number(pangkat.data.row.mkgol_thn),
    MASA_KERJA_BULAN: Number(pangkat.data.row.mkgol_bln),
    NO_SK: pangkat.data.row.no_sk,
    TANGGAL_SK: pangkat.data.row.tgl_sk,
    TMT_SK: pangkat.data.row.tmt,
    JENIS_KENAIKAN_ID: 1,
    JENIS_KENAIKAN_NAMA: "KENAIKAN PANGKAT",
    BULAN_DIBAYAR: pangkat.data.row.tmt,
    SATUAN_KERJA_NAMA: pangkat.data.row.nama_unit_kerja,
    SATUAN_KERJA_ID: pangkat.data.row.id_skpd_simgaji,
    NPWP: pangkat.data.npwp,
    NO_TELP: pangkat.data.whatsapp,
    TANGGAL_UPDATE: pangkat.data.row.tgl_sk,
    KDFUNGSI: 0,
    KDJABATAN: "",
    KDESELON: pangkat.data.row.id_eselon_simgaji,
    PEJABAT_PENETAP: pangkat.data.row.pejabat_sk,
    NAMA_JABATAN: pangkat.data.row.nama_jabatan,
    KDDATI1: process.env.NEXT_PUBLIC_GAPOK_KDDATI1,
    KDDATI2: process.env.NEXT_PUBLIC_GAPOK_KDDATI2,
    KETERANGAN: "",
    FLAG: 0,
    // TMTBERKALAYAD: tmt_berikutnya,
    PDF: pangkat.data.row.berkas,
    UPDATE_AT: getCurrentDateTime(),
    UPDATE_BY: SESSION.data.nip,
  };
  function handleSubmit() {
    // @ts-ignore
    mutate(BODY, {
      onSuccess: (data) => {
        if (data.success === false || !data.success) {
          toast.error(`${data.status} (${JSON.stringify(data.message)})`, {
            id: "Toaster",
          });
          return;
        }
        toast.success(data.message, {
          id: "Toaster",
        });
        revalidateTag("datapegawai");
        router.refresh();
      },
      onError: (err) => {
        toast.error(err.message, {
          id: "Toaster",
        });
      },
    });
  }

  const disabled = pangkat.data.status === false;

  const isPeremajaan = () => {
    return (
      <Button
        onPress={() => setIsOpenModal(true)}
        color="primary"
        variant="shadow"
        isLoading={isPending}
        isDisabled={disabled || isPending}>
        <CloudArrowUp className="size-5 text-white" />
        <Divider orientation="vertical" />
        Verifikasi
      </Button>
    );
  };
  return (
    <>
      <ModalPangkatProses
        PANGKAT={pangkat}
        isOpenModal={isOpenModal}
        handleSubmit={handleSubmit}
        isPending={isPending}
        onClose={() => setIsOpenModal(false)}
      />
      {isPeremajaan()}
    </>
  );
}
