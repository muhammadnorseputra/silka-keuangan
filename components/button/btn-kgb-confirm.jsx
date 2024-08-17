"use client";
import { useModalContext } from "@/lib/context/modal-context";
import { ModalKgbProses } from "@/components/modal/modal-kgb-proses";
import { Button, Divider } from "@nextui-org/react";
import { CloudArrowUp } from "react-bootstrap-icons";
import { useSpinnerContext } from "@/lib/context/spinner-context";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { savePerubahanData } from "@/dummy/sigapok-post-perubahan";
import { useRouter } from "next-nprogress-bar";
export default function BtnKgbConfirm({
  dataSilka: kgb,
  session_silka,
  access_token,
}) {
  const router = useRouter();
  const { isOpen, setIsOpen } = useModalContext();
  const { setIsSpinner } = useSpinnerContext();
  const {
    nip_lama,
    nip,
    nama,
    nama_lengkap,
    jabatan,
    npwp,
    whatsapp: nohp,
    gapok_baru,
    mk_thn,
    mk_bln,
    tmt,
    tmt_berikutnya,
    pejabat_sk,
    no_sk,
    tgl_sk,
    nama_unit_kerja,
    id_eselon,
    pangkat_id_simgaji,
    golru_id,
    golru_nama,
    pangkat_nama,
    kode_satker,
    kode_skpd,
    berkas,
    created_at,
    created_by,
  } = kgb.data;

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["updatePerubahanData"],
    mutationFn: async (body) => {
      const response = await savePerubahanData(access_token, body);
      return response;
    },
  });

  async function handleSubmit(e) {
    if (isPending) {
      setIsSpinner(true);
      toast.loading("Sending ...", {
        id: "Toaster",
      });
      return;
    }

    if (isError) {
      setIsSpinner(false);
      toast.error(error.message, {
        id: "Toaster",
      });
      return;
    }

    const BODY = {
      NIP_LAMA: nip_lama,
      NIP_BARU: nip,
      NAMA: nama_lengkap,
      // STATUS_PEGAWAI_ID,
      // KATEGORI_PEGAWAI,
      // TIPE_PEGAWAI_ID,
      PANGKAT_ID: pangkat_id_simgaji,
      PANGKAT_NAMA: pangkat_nama,
      GAJI_POKOK: gapok_baru,
      MASA_KERJA_TAHUN: mk_thn,
      MASA_KERJA_BULAN: mk_bln,
      NO_SK: no_sk,
      TANGGAL_SK: tgl_sk,
      TMT_SK: tmt,
      JENIS_KENAIKAN: 2,
      JENIS_KENAIKAN_NAMA: 'KENAIKAN GAJI BERKALA',
      BULAN_DIBAYAR: tmt,
      SATUAN_KERJA_NAMA: nama_unit_kerja,
      SATUAN_KERJA_ID: kode_skpd,
      NPWP: npwp,
      NO_TELP: nohp,
      TANGGAL_UPDATE: tgl_sk,
      PENJABAT_PENETAP: pejabat_sk,
      NAMA_JABATAN: jabatan,
      KDDATI1: process.env.NEXT_PUBLIC_GAPOK_KDDATI1,
      KDDATI2: process.env.NEXT_PUBLIC_GAPOK_KDDATI2,
      KETERANGAN: "null",
      FLAG: "0",
      TMTBERKALAYAD: tmt_berikutnya,
      PDF: berkas,
      UPDATE_AT: created_at,
      UPDATE_BY: session_silka?.data.nip
    };

    // @ts-ignore
    mutate(BODY, {
      onSuccess: (data) => {
        setIsSpinner(false);
        toast.success(data.message, {
          id: "Toaster",
        });
        router.refresh();
      },
      onError: (err) => {
        setIsSpinner(false);
        toast.error(err.message, {
          id: "Toaster",
        });
      },
    });
  }

  const disabled = kgb.status === false ?? true;
  return (
    <>
      <ModalKgbProses
        dataSilka={kgb}
        isOpenModal={isOpen}
        onClose={() => setIsOpen(false)}
        handleSubmit={handleSubmit}
      />

      <Button
        onPress={() => {
          setIsOpen(true);
        }}
        color="primary"
        variant="shadow"
        isDisabled={disabled}>
        <CloudArrowUp className="size-5 text-white" />
        <Divider orientation="vertical" />
        Verifikasi
      </Button>
    </>
  );
}
