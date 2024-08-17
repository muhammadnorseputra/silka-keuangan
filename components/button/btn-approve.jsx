"use client";

import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { Button, Divider } from "@nextui-org/react";
import { useModalContext } from "@/lib/context/modal-context";
import { ModalPeremajaanApprove } from "../modal/modal-peremajaan-approve";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { TambahPegawai } from "@/dummy/sigapok-post-pegawai";
import { useRouter } from "next-nprogress-bar";
import { useEffect } from "react";
import { getTanggalHariIni } from "@/helpers/fn_tanggal";

export const BtnApprove = ({
  access_token,
  data: row,
  session_silkaonline: session,
}) => {
  const router = useRouter();
  const { isOpen, setIsOpen } = useModalContext();

  const { mutate, isPending } = useMutation({
    mutationFn: async (body) => {
      const response = await TambahPegawai(access_token, body);
      return response;
    },
    mutationKey: ["TambahPegawai"],
  });

  const BODY = {
    NIP: row.nip,
    NAMA: row.nama,
    GLRDEPAN: row.gelar_depan,
    GLRBELAKANG: row.gelar_belakang,
    KDJENKEL: Number(row.kode_jenkel),
    TEMPATLHR: row.tmp_lahir,
    TGLLHR: row.tgl_lahir,
    AGAMA: Number(1), //ambil referensi id agama sesuai dengan ref simgaji
    zakat_dg: 0,
    PENDIDIKAN: row.nama_tingkat_pendidikan,
    TMTCAPEG: row.tmt_capeg,
    TMTSKMT: row.tgl_spmt,
    KDSTAWIN: "1",
    JISTRI: Number(row.jumlah_sutri), //jika laki = jumlah_istri, jika perempuan = jumlah suami
    JANAK: Number(row.jumlah_anak),
    KDSTAPEG: Number(row.kode_status_pegawai),
    KDPANGKAT: row.kode_pangkat,
    MKGOLT: 0, // ambil di simpeg
    BLGOLT: 0, // ambil di simpeg
    GAPOK: 0, // boleh 0
    MASKER: 0, // ambil di simpeg
    PRSNGAPOK: row.kode_status_pegawai === 3 ? 80 : 100,
    // KDESELON: row.fid_eselon.slice(-2),
    KDESELON: row.fid_eselon.slice(-2),
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
    NOTELP: row.whatsapp,
    NOKTP: row.no_ktp,
    NPWP: row.no_npwp,
    KDHITUNG: 1,
    induk_bank: "",
    NOREK: "",
    TMTBERLAKU: getTanggalHariIni(),
    KDJNSTRANS: "",
    INPUTER: session?.data?.nip,
    KD_JNS_PEG: row.kode_jenis_pegawai,
  };

  useEffect(() => {
    if (isPending) {
      toast.loading(`Sending ...`, {
        id: "Toaster",
      });
    }
  }, [isPending]);

  function handleApprove() {
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
        setIsOpen(false);
        router.refresh();
      },
      onError: (Error) => {
        toast.error(
          `Koneksi ke server ${process.env.NEXT_PUBLIC_GAPOK_BASE_URL} (${Error.message})`,
          {
            id: "Toaster",
          }
        );
      },
    });
  }

  return (
    <>
      <ModalPeremajaanApprove
        isOpenModal={isOpen}
        onClose={() => setIsOpen(false)}
        handleApprove={handleApprove}
        isLoading={isPending}
      />
      <Button
        color="primary"
        isLoading={isPending}
        variant="shadow"
        onPress={() => setIsOpen(true)}>
        <HandThumbUpIcon className="size-5 text-white" />
        <Divider orientation="vertical" />
        Approve
      </Button>
    </>
  );
};
