"use client";

import { useSkpds, useStatusPegawai } from "@/lib/FetchQuery";
import { CircleStackIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Input,
  Button,
  Divider,
  Autocomplete,
  AutocompleteItem,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BriefcaseFill, Router } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useModalContext } from "@/lib/context/modal-context";
import { ModalPeremajaan } from "../modal/modal-peremajaan";
import { formatDateSlash } from "@/helpers/fn_tanggal";
import { formatRupiah } from "@/helpers/cx";
import { useMutation } from "@tanstack/react-query";
import { TambahPegawaiPppk } from "@/dummy/sigapok-post-pppk";
import { useRouter } from "next-nprogress-bar";
import { limitCharacters } from "@/helpers/text";

export const FormPeremajaan = ({ sigapok, silka }) => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const { isOpen, setIsOpen } = useModalContext();

  const {
    data: skpds,
    isLoading: loadingSkpds,
    isFetching: fetchingSkpds,
    isError: isErrorSkpds,
    error: errorSkpds,
  } = useSkpds(sigapok);

  const {
    data: statusPegawai,
    isLoading: loadingStatusPegawai,
    isFetching: fetchingStatusPegawai,
    isError: isErrorStatusPegawai,
    error: errorStatusPegawai,
  } = useStatusPegawai(sigapok);

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting, isValid },
  } = useForm();

  useEffect(() => {
    if (!isValid && isSubmitting) {
      toast.error("Formulir Tidak Lengkap");
    }
  }, [isSubmitting, isValid, skpds]);

  const isConfirm = async (form) => {
    setIsOpen(true);
    setData(form);
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["peremajaanPppk"],
    mutationFn: async (body) => {
      const res = await TambahPegawaiPppk(sigapok.access_token, body);
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

  const BODY = {
    NIP: silka.nipppk,
    NAMA: silka.nama,
    GLRDEPAN: silka.gelar_depan,
    GLRBELAKANG: silka.gelar_blk,
    KDJENKEL: silka.jns_kelamin == "PRIA" ? 1 : 2,
    TEMPATLHR: silka.tmp_lahir,
    TGLLHR: silka.tgl_lahir,
    JISTRI: silka.jumlah_sutri,
    JANAK: silka.jumlah_anak,
    KDSTAPEG: 1,
    KDPANGKAT: silka.nama_golru,
    GAPOK: silka.gaji_pokok,
    MKGOLT: silka.maker_tahun,
    KD_SKPD: silka.simgaji_id_skpd,
    KETERANGAN: "",
    TMTGAJI: silka.tmt_pppk_awal,
    INDUK_BANK: "",
    NOREK: "",
    NOKTP: silka.nik,
    NPWP: silka.no_npwp,
    NOTELP: silka.no_handphone,
    NOMORSKEP: silka.nomor_sk,
    PENERBITSKEP: silka.pejabat_sk,
    TGLSKEP: silka.tgl_sk,
    ALAMAT: limitCharacters(silka.alamat, 60), //kena limit cuma 60 karakter
    KDGURU: "",
    // KATEGORI: silka.jenis_formasi,
    KATEGORI: 1, //kode berdasarkan jenis kategori
    FORMASI: silka.tahun_formasi,
    AKHIRKONTRAK: silka.tmt_pppk_akhir,
  };
  const isSubmit = () => {
    setIsSending(true);
    // @ts-ignore
    mutate(BODY, {
      onSuccess: (response) => {
        if (response.success === false || !response.success) {
          setIsSending(false);
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
        setIsSending(false);
        setIsOpen(false);
        router.refresh();
      },
      onError: (err) => {
        setIsSending(false);
        toast.error(err.message, {
          id: "Toaster",
        });
      },
    });
  };

  return (
    <>
      <ModalPeremajaan
        isOpenModal={isOpen}
        onClose={() => setIsOpen(false)}
        handlePeremajaan={isSubmit}
        isPending={isPending || isSending}
      />
      <form
        onSubmit={handleSubmit(isConfirm)}
        method="POST"
        autoComplete="off"
        noValidate>
        <Tabs
          color="primary"
          radius="full"
          size="lg"
          aria-label="Options"
          destroyInactiveTabPanel={false}
          classNames={{
            tab: "min-h-12",
          }}
          fullWidth>
          {/* Tabs Personal */}
          <Tab
            key="personal"
            title={
              <div className="flex items-center space-x-2">
                <UserCircleIcon className="size-6" />
                <p className="font-bold">Data Pribadi</p>
              </div>
            }>
            <Card>
              <CardBody className="grid grid-flow-row-dense grid-cols-3 grid-rows-4 gap-6 py-8 px-6">
                <Input
                  isReadOnly
                  variant="flat"
                  size="lg"
                  className="col-span-3 sm:col-span-1"
                  placeholder="NIPPPK"
                  labelPlacement="outside"
                  type="text"
                  label="Nomor Induk PPPK"
                  name="nipppk"
                  defaultValue={silka.nipppk}
                  {...register("nipppk")}
                />
                <Input
                  isReadOnly
                  variant="flat"
                  size="lg"
                  className="col-span-3 sm:col-span-1"
                  placeholder="Gelar Depan"
                  labelPlacement="outside"
                  type="text"
                  label="Gelar Depan"
                  name="gelar_depan"
                  defaultValue={silka.gelar_depan}
                  {...register("gelar_depan")}
                />
                <Input
                  isReadOnly
                  variant="flat"
                  size="lg"
                  className="col-span-3 sm:col-span-1"
                  placeholder="Gelar Belakang"
                  labelPlacement="outside"
                  type="text"
                  label="Gelar Belakang"
                  name="gelar_belakang"
                  defaultValue={silka.gelar_blk}
                  {...register("gelar_belakang")}
                />
                <Input
                  isReadOnly
                  variant="flat"
                  size="lg"
                  className="col-span-3 sm:col-span-1"
                  placeholder="Nama"
                  labelPlacement="outside"
                  type="text"
                  label="Nama"
                  name="nama"
                  defaultValue={silka.nama}
                  {...register("nama")}
                />
                <Input
                  isReadOnly
                  variant="flat"
                  size="lg"
                  className="col-span-3 sm:col-span-1"
                  placeholder="Tempat Lahir"
                  labelPlacement="outside"
                  type="text"
                  label="Tempat Lahir"
                  name="tempat_lahir"
                  defaultValue={silka.tempat_lahir}
                  {...register("tempat_lahir")}
                />
                <Input
                  isReadOnly
                  variant="flat"
                  size="lg"
                  className="col-span-3 sm:col-span-1"
                  placeholder="Tanggal Lahir"
                  labelPlacement="outside"
                  type="text"
                  label="Tanggal Lahir"
                  name="tanggal_lahir"
                  defaultValue={formatDateSlash(silka.tgl_lahir)}
                  {...register("tanggal_lahir")}
                />
                <Input
                  isReadOnly
                  variant="flat"
                  size="lg"
                  className="col-span-3 sm:col-span-1"
                  placeholder="Jumlah Istri/Suami"
                  labelPlacement="outside"
                  type="number"
                  label="Jumlah Istri/Suami"
                  name="jumlah_sutri"
                  defaultValue={silka.jumlah_sutri}
                  {...register("jumlah_sutri")}
                />
                <Input
                  isReadOnly
                  variant="flat"
                  size="lg"
                  className="col-span-3 sm:col-span-1"
                  placeholder="Jumlah Anak"
                  labelPlacement="outside"
                  type="number"
                  label="Jumlah Anak"
                  name="jumlah_anak"
                  defaultValue={silka.jumlah_anak}
                  {...register("jumlah_anak")}
                />

                <Textarea
                  variant="flat"
                  className="col-span-3"
                  isReadOnly
                  label="Alamat Sesuai KTP"
                  labelPlacement="outside"
                  placeholder="Alamat anda"
                  name="alamat"
                  defaultValue={silka.alamat}
                  {...register("alamat")}
                />
              </CardBody>
            </Card>
          </Tab>
          {/* Tabs Kepegawaian */}
          <Tab
            key="kepegawian"
            title={
              <div className="flex items-center space-x-2">
                <BriefcaseFill className="size-6" />
                <p className="font-bold">Data Kepegawaian</p>
              </div>
            }>
            <Card>
              <CardBody className="grid grid-flow-row-dense grid-cols-4 grid-rows-4 gap-6 py-8 px-6">
                <Autocomplete
                  isRequired
                  isReadOnly
                  isLoading={loadingSkpds || fetchingSkpds}
                  className="col-span-4 sm:col-span-2"
                  labelPlacement="outside"
                  size="lg"
                  placeholder="Pilih Satuan Kerja Pemerintah Daerah"
                  label="Satuan Kerja Pemerintah Daerah"
                  name="id_unit_kerja"
                  defaultSelectedKey={silka.fid_unit_kerja}
                  defaultInputValue={silka.fid_unit_kerja}
                  selectedKey={silka.fid_unit_kerja}
                  variant="flat"
                  errorMessage={
                    (errors?.id_unit_kerja?.message &&
                      `${errors.id_unit_kerja.message}`) ||
                    (errorSkpds && errorSkpds.message)
                  }
                  isInvalid={
                    errors?.id_unit_kerja || isErrorSkpds ? true : false
                  }
                  {...register("id_unit_kerja", {
                    required: "Pilih SKPD",
                  })}>
                  {skpds?.data.map((skpd) => (
                    <AutocompleteItem
                      key={skpd.id_simpeg}
                      textValue={skpd.nama_simpeg}>
                      {skpd.nama_simpeg}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
                <Autocomplete
                  isRequired
                  isReadOnly
                  isLoading={loadingStatusPegawai || fetchingStatusPegawai}
                  className="col-span-4 sm:col-span-2"
                  labelPlacement="outside"
                  size="lg"
                  placeholder="Pilih status pegawai"
                  label="Status Pegawai"
                  name="kode_stapeg"
                  defaultSelectedKey="12"
                  defaultInputValue="12"
                  selectedKey="12"
                  variant="flat"
                  errorMessage={
                    (errors?.kode_stapeg?.message &&
                      `${errors.kode_stapeg.message}`) ||
                    (errorStatusPegawai && errorStatusPegawai.message)
                  }
                  isInvalid={
                    errors?.kode_stapeg || isErrorStatusPegawai ? true : false
                  }
                  {...register("kode_stapeg", {
                    required: "Pilih Status Pegawai",
                  })}>
                  {statusPegawai?.data.map((item) => (
                    <AutocompleteItem
                      key={item.kode_stapeg}
                      textValue={item.stapeg_nama}>
                      {item.stapeg_nama}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
                <Input
                  isReadOnly
                  variant="flat"
                  size="lg"
                  className="col-span-4 sm:col-span-1"
                  placeholder="Masa Kerja Tahun"
                  labelPlacement="outside"
                  type="number"
                  label="Masa Kerja Tahun"
                  name="mk_tahun"
                  defaultValue={silka.maker_tahun}
                  {...register("mk_tahun")}
                />
                <Input
                  isReadOnly
                  variant="flat"
                  size="lg"
                  className="col-span-4 sm:col-span-1"
                  placeholder="Gaji Pokok"
                  labelPlacement="outside"
                  type="text"
                  label="Gaji Pokok"
                  name="gapok"
                  defaultValue={formatRupiah(silka.gaji_pokok)}
                  {...register("gapok")}
                />
                <Input
                  isReadOnly
                  variant="flat"
                  size="lg"
                  className="col-span-4 sm:col-span-1"
                  placeholder="Nomor KTP"
                  labelPlacement="outside"
                  type="number"
                  label="Nomor KTP"
                  name="no_ktp"
                  defaultValue={silka.nik}
                  {...register("no_ktp")}
                />
                <Input
                  isReadOnly
                  variant="flat"
                  size="lg"
                  className="col-span-4 sm:col-span-1"
                  placeholder="Nomor NPWP"
                  labelPlacement="outside"
                  type="text"
                  label="Nomor NPWP"
                  defaultValue={silka.no_npwp}
                  name="no_npwp"
                  {...register("no_npwp")}
                />
                <Input
                  isReadOnly
                  variant="flat"
                  size="lg"
                  className="col-span-4 sm:col-span-1"
                  placeholder="Nomor HP"
                  labelPlacement="outside"
                  type="text"
                  label="Nomor HP"
                  defaultValue={silka.no_handphone}
                  name="no_hp"
                  {...register("no_hp")}
                />
                <Input
                  isReadOnly
                  variant="flat"
                  size="lg"
                  className="col-span-4 sm:col-span-1"
                  placeholder="Ketegori"
                  labelPlacement="outside"
                  type="text"
                  label="Ketegori"
                  name="kategori"
                  defaultValue={silka.jenis_formasi}
                  {...register("kategori")}
                />
                <Input
                  isReadOnly
                  variant="flat"
                  size="lg"
                  className="col-span-4 sm:col-span-1"
                  placeholder="Formasi Tahun"
                  labelPlacement="outside"
                  type="text"
                  label="Formasi Tahun"
                  name="tahun_formasi"
                  defaultValue={silka.tahun_formasi}
                  {...register("tahun_formasi")}
                />
                <Input
                  isReadOnly
                  variant="flat"
                  size="lg"
                  className="col-span-4 sm:col-span-1"
                  placeholder="Akhir Kontrak Kerja"
                  labelPlacement="outside"
                  type="date"
                  label="Akhir Kontrak Kerja"
                  name="akhir_kontrak"
                  defaultValue={silka.tmt_pppk_akhir}
                  {...register("akhir_kontrak")}
                />
                <Input
                  isReadOnly
                  variant="flat"
                  size="lg"
                  className="col-span-4 sm:col-span-1"
                  placeholder="Nomor Surat Keputusan"
                  labelPlacement="outside"
                  type="text"
                  label="Nomor Surat Keputusan"
                  name="noskep"
                  defaultValue={silka.nomor_sk}
                  {...register("noskep")}
                />
                <Input
                  isReadOnly
                  variant="flat"
                  size="lg"
                  className="col-span-4 sm:col-span-1"
                  placeholder="Tanggal Surat Keputusan"
                  labelPlacement="outside"
                  type="date"
                  label="Tanggal Surat Keputusan"
                  name="tgl_skep"
                  defaultValue={silka.tgl_sk}
                  {...register("tgl_skep")}
                />
                <Input
                  isReadOnly
                  className="col-span-4 sm:col-span-2"
                  variant="flat"
                  size="lg"
                  placeholder="Penerbit Surat Keputusan"
                  labelPlacement="outside"
                  type="text"
                  label="Penerbit Surat Keputusan"
                  name="penerbit_skep"
                  defaultValue={silka.pejabat_sk}
                  {...register("penerbit_skep")}
                />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
        <div className="w-full flex justify-center items-end my-4">
          <Button
            fullWidth
            color="primary"
            variant="shadow"
            size="lg"
            type="submit"
            isDisabled={isLoading || isSubmitting || !isValid}
            isLoading={isLoading || isSubmitting}>
            <CircleStackIcon className="size-5" />
            <Divider orientation="vertical" /> Validasi Data PPPK
          </Button>
        </div>
      </form>
    </>
  );
};
