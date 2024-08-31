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
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { UpdateSyncKGB } from "@/dummy/post-data-tpp";
import revalidateTag from "@/lib/revalidateTags";
export default function BtnKgbConfirm({
  dataSilka: kgb,
  session_silka,
  access_token,
}) {
  const router = useRouter();
  const { isOpen, setIsOpen } = useModalContext();
  const {
    id,
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
    id_eselon_simgaji,
    pangkat_id_simgaji,
    golru_id,
    golru_nama,
    id_jenis_pegawai_simgaji,
    jenis_pegawai_simgaji,
    id_status_pegawai_simgaji,
    status_pegawai_simgaji,
    pangkat_nama,
    kode_satker,
    kode_skpd,
    berkas,
    created_at,
    created_by,
  } = kgb.data;

  const { mutate, isPending } = useMutation({
    mutationKey: ["updatePerubahanData"],
    mutationFn: async (body) => {
      // update status is_sync pada riwayat_kgb
      await UpdateSyncKGB({
        id,
        is_sync: '1',
        type: 'PNS'
      })
      // kirim perubahan data ke sigapok
      const response = await savePerubahanData(access_token, body);
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
    NIP_LAMA: nip_lama,
    NIP_BARU: nip,
    NAMA: nama_lengkap,
    STATUS_PEGAWAI_ID: Number(id_status_pegawai_simgaji),
    STATUS_PEGAWAI_NAMA: status_pegawai_simgaji,
    KATEGORI_PEG: 2,
    TIPE_PEGAWAI_ID: Number(id_jenis_pegawai_simgaji),
    TIPE_PEGAWAI_NAMA: jenis_pegawai_simgaji,
    PANGKAT_ID: pangkat_id_simgaji,
    PANGKAT_NAMA: pangkat_nama,
    GAJI_POKOK: Number(gapok_baru),
    MASA_KERJA_TAHUN: Number(mk_thn),
    MASA_KERJA_BULAN: Number(mk_bln),
    NO_SK: no_sk,
    TANGGAL_SK: tgl_sk,
    TMT_SK: tmt,
    JENIS_KENAIKAN_ID: 2,
    JENIS_KENAIKAN_NAMA: "KENAIKAN BERKALA",
    BULAN_DIBAYAR: tmt,
    SATUAN_KERJA_NAMA: nama_unit_kerja,
    SATUAN_KERJA_ID: kode_skpd,
    NPWP: npwp,
    NO_TELP: nohp,
    TANGGAL_UPDATE: tgl_sk,
    KDFUNGSI: 0,
    KDJABATAN: "",
    KDESELON: id_eselon_simgaji,
    PEJABAT_PENETAP: pejabat_sk,
    NAMA_JABATAN: jabatan,
    KDDATI1: process.env.NEXT_PUBLIC_GAPOK_KDDATI1,
    KDDATI2: process.env.NEXT_PUBLIC_GAPOK_KDDATI2,
    KETERANGAN: "",
    FLAG: 0,
    TMTBERKALAYAD: tmt_berikutnya,
    PDF: berkas,
    UPDATE_AT: created_at,
    UPDATE_BY: created_by,
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

  const disabled = kgb.status === false ?? true;

  const isPeremajaan = () => {
    if (
      id_status_pegawai_simgaji === null ||
      id_jenis_pegawai_simgaji === null
    ) {
      return (
        <div className="text-red-500 flex justify-start items-start gap-3">
          <ExclamationCircleIcon className="size-8 text-red-400" />
          <p>
            Data Pegawai belum diremajakan, silahkan melakukan peremajaan data
            terlebih dahulu
          </p>
        </div>
      );
    }
    return (
      <Button
        onPress={() => {
          setIsOpen(true);
        }}
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
      <ModalKgbProses
        dataSilka={kgb}
        isOpenModal={isOpen}
        onClose={() => setIsOpen(false)}
        handleSubmit={handleSubmit}
        isPending={isPending}
      />

      {isPeremajaan()}
    </>
  );
}
