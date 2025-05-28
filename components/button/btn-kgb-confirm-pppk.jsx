"use client";
import { useModalContext } from "@/lib/context/modal-context";
import { ModalKgbProses } from "@/components/modal/modal-kgb-proses";
import { Button, Divider } from "@nextui-org/react";
import { CloudArrowUp } from "react-bootstrap-icons";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { savePerubahanData } from "@/dummy/sigapok-post-perubahan";
import { useRouter } from "next-nprogress-bar";
import { useEffect } from "react";
import { UpdateSyncKGB } from "@/dummy/post-data-tpp";
import revalidateTag from "@/lib/revalidateTags";
import { getCurrentDateTime } from "@/helpers/datetime";
export default function BtnKgbConfirm({
  dataSilka: kgb,
  session_silka,
  access_token,
}) {
  const router = useRouter();
  const { isOpen, setIsOpen } = useModalContext();

  const { mutate, isPending } = useMutation({
    mutationKey: ["updatePerubahanData"],
    mutationFn: async (body) => {
      // kirim perubahan data ke sigapok
      const response = await savePerubahanData(access_token, body);
      if (response.success === true) {
        // update status is_sync pada riwayat_kgb
        await UpdateSyncKGB({
          id: kgb.data.id,
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
    NIP_LAMA: "",
    NIP_BARU: kgb.data.nipppk,
    NAMA: kgb.data.nama_lengkap,
    STATUS_PEGAWAI_ID: Number(kgb.data.kode_status_pegawai_simgaji),
    STATUS_PEGAWAI_NAMA: kgb.data.status_pegawai_simgaji,
    KATEGORI_PEG: Number(kgb.data.id_jenis_pegawai_simgaji),
    TIPE_PEGAWAI_ID: Number(kgb.data.id_jenis_pegawai_simgaji),
    TIPE_PEGAWAI_NAMA: kgb.data.jenis_pegawai_simgaji,
    PANGKAT_ID: String(kgb.data.id_pangkat),
    PANGKAT_NAMA: kgb.data.nama_pangkat,
    GAJI_POKOK: Number(kgb.data.gapok_baru),
    MASA_KERJA_TAHUN: Number(kgb.data.mk_thn),
    MASA_KERJA_BULAN: Number(kgb.data.mk_bln),
    NO_SK: kgb.data.no_sk,
    TANGGAL_SK: kgb.data.tgl_sk,
    TMT_SK: kgb.data.tmt,
    JENIS_KENAIKAN_ID: 2,
    JENIS_KENAIKAN_NAMA: "KENAIKAN BERKALA",
    BULAN_DIBAYAR: kgb.data.tmt,
    SATUAN_KERJA_NAMA: kgb.data.nama_unit_kerja,
    SATUAN_KERJA_ID: kgb.data.kode_skpd,
    NPWP: kgb.data.npwp,
    NO_TELP: kgb.data.no_handphone,
    TANGGAL_UPDATE: kgb.data.tgl_sk,
    KDFUNGSI: 0,
    KDJABATAN: "",
    KDESELON: "", // noted
    PEJABAT_PENETAP: kgb.data.pejabat_sk,
    NAMA_JABATAN: kgb.data.jabatan,
    KDDATI1: process.env.NEXT_PUBLIC_GAPOK_KDDATI1,
    KDDATI2: process.env.NEXT_PUBLIC_GAPOK_KDDATI2,
    KETERANGAN: "",
    FLAG: 0,
    TMTBERKALAYAD: kgb.data.tmt_gaji_berikutnya,
    PDF: kgb.data.berkas,
    UPDATE_AT: getCurrentDateTime(),
    UPDATE_BY: session_silka.data.nip,
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
        revalidateTag("datap3k");
        setIsOpen(false);
        router.refresh();
      },
      onError: (err) => {
        toast.error(err.message, {
          id: "Toaster",
        });
      },
    });
  }

  const disabled = kgb.status === false;

  const isPeremajaan = () => {
    return (
      <Button
        fullWidth
        onPress={() => {
          setIsOpen(true);
        }}
        color="primary"
        variant="shadow"
        isLoading={isPending}
        isDisabled={disabled || isPending}>
        <CloudArrowUp className="text-white size-5" />
        <Divider orientation="vertical" />
        Verifikasi
      </Button>
    );
  };
  return (
    <>
      <ModalKgbProses
        dataSilka={kgb}
        isOpenModal={isOpen}
        onClose={() => setIsOpen(false)}
        handleSubmit={handleSubmit}
        isPending={isPending}
        isJenisPegawai="PPPK"
      />

      {isPeremajaan()}
    </>
  );
}
