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
  Progress,
  Chip,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BriefcaseFill, CheckCircleFill } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useModalContext } from "@/lib/context/modal-context";
import { ModalPeremajaan } from "../modal/modal-peremajaan";
import { formatDateSlash } from "@/helpers/fn_tanggal";
import { formatRupiah } from "@/helpers/cx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DataNotFound from "../errors/DataNotFound";
import { getPPPKByNipppk } from "@/dummy/data-pppk-by-nipppk";
import { PostDataPPPK } from "@/dummy/post-data-pppk";
import SuccessUpdated from "../alert/SuccessUpdated";
import { AlertInfo, AlertSuccess, AlertWarning } from "../alert";

export const FormPeremajaan = ({ sigapok, nipppk, session_silka }) => {
  const queryClient = useQueryClient();
  const [data, setData] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const { isOpen, setIsOpen } = useModalContext();

  const {
    data: silka,
    isLoading: isLoadingSilka,
    isFetching: isFetchingSilka,
  } = useQuery({
    queryKey: ["DataSilkaP3k"],
    queryFn: async () => {
      const getDataPppkSilka = await getPPPKByNipppk(nipppk);
      return getDataPppkSilka;
    },
    refetchOnWindowFocus: false,
  });

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
      const res = await PostDataPPPK(body);
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

  const isSubmit = () => {
    const BODY = {
      nipppk: silka.nipppk,
      nama: silka.nama,
      gelar_depan: silka.gelar_depan,
      gelar_belakang: silka.gelar_blk,
      kode_jenkel: silka.jns_kelamin == "PRIA" ? 1 : 2,
      tempat_lahir: silka.tmp_lahir,
      tanggal_lahir: silka.tgl_lahir,
      jumlah_sutri: silka.jumlah_sutri,
      jumlah_anak: silka.jumlah_anak,
      // @ts-ignore
      kode_statuspeg: data.kode_stapeg.split("-")[0],
      kode_pangkat: silka.nama_golru,
      gapok: silka.gaji_pokok,
      masakerja_tahun: silka.maker_tahun,
      kode_skpd: silka.simgaji_id_skpd,
      kode_skpd_simpeg: silka.unker_id,
      kode_satker: silka.simgaji_id_satker,
      keterangan: "",
      tmt_gaji: silka.tmt_pppk_awal,
      induk_bank: "",
      norek: "",
      noktp: silka.nik,
      nonpwp: silka.no_npwp,
      notelpon: silka.no_handphone,
      nosk: silka.nomor_sk,
      penerbit_sk: silka.pejabat_sk,
      tgl_sk: silka.tgl_sk,
      kode_guru: "",
      kategori: 4,
      formasi: silka.tahun_formasi,
      akhir_kontrak: silka.tmt_pppk_akhir,
      created_by: silka.created_by,
      update_by: session_silka?.data.nip,
    };
    setIsSending(true);
    // @ts-ignore
    mutate(BODY, {
      onSuccess: (response) => {
        if (response.status === false || !response.status) {
          setIsSending(false);
          return toast.error(`Terjadi Kesalahan ${response.message}`, {
            id: "Toaster",
          });
        }
        toast.success(response.message, {
          id: "Toaster",
        });
        setIsSending(false);
        setIsOpen(false);
        queryClient.invalidateQueries({
          queryKey: ["DataSilkaP3k"],
        });
      },
      onError: (err) => {
        setIsSending(false);
        toast.error(err.message, {
          id: "Toaster",
        });
      },
    });
  };

  if (isLoadingSilka || isFetchingSilka) {
    return (
      <Card className="w-full h-screen">
        <CardBody className="flex flex-col items-center justify-center gap-6">
          <Progress
            size="sm"
            isIndeterminate
            aria-label="loading"
            label="Mohon tunggu processing ..."
            className="max-w-sm"
          />
        </CardBody>
      </Card>
    );
  }

  if (silka.status === false) {
    return (
      <Card className="w-full h-screen">
        <CardBody className="flex flex-col items-center justify-center gap-6">
          <DataNotFound message={silka.message} />
        </CardBody>
      </Card>
    );
  }

  if (silka.status_data !== "ENTRI" && silka.status_data !== null) {
    const updateAt =
      silka.status_data_update_by !== null
        ? silka.status_data_update
        : silka.status_data_add;
    return (
      <>
        {silka?.status_data === "APPROVE" && (
          <AlertSuccess title="Informasi">
            Data PPPK anda sudah tersenkronisasi dengan INEXIS Badan Pengelola
            Keuangan Pendapatan dan Aset Daerah Kab. Balangan
          </AlertSuccess>
        )}
        {silka?.status_data === "VERIFIKASI" && (
          <AlertInfo title="Perhatian">
            Menunggu verifikasi & validasi pengelola kepegawaian.
          </AlertInfo>
        )}
        <Card className="w-full h-screen">
          <CardBody className="flex flex-col items-center justify-center gap-6">
            <SuccessUpdated style={{ width: 400 }}>
              <h1 className="font-bold text-lg inline-flex items-center flex-col gap-y-3 mx-8 sm:mx-0">
                Data anda sudah diperbaharui pada{" "}
                <span className="text-gray-400">
                  {" "}
                  <Chip
                    endContent={<CheckCircleFill className="size-6" />}
                    color="success"
                    size="lg"
                    variant="flat">
                    {updateAt}
                  </Chip>
                </span>
              </h1>
            </SuccessUpdated>
          </CardBody>
        </Card>
      </>
    );
  }

  return (
    <>
      <ModalPeremajaan
        isOpenModal={isOpen}
        onClose={() => setIsOpen(false)}
        handlePeremajaan={isSubmit}
        isPending={isPending || isSending}
      />
      <AlertWarning
        title="Perhatian"
        message="Jika terdapat kesalahan data  pada section ini, silahkan lakukan update data pada SILKa. Pastikan semua bagian terisi dengan benar sebelum diperbaharui."
      />
      <form
        onSubmit={handleSubmit(isConfirm)}
        method="POST"
        autoComplete="off"
        className="mt-3"
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
                  defaultValue={silka.tmp_lahir}
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
                    (isErrorSkpds && errorSkpds.message)
                  }
                  isInvalid={
                    errors?.id_unit_kerja ||
                    isErrorSkpds ||
                    skpds?.message === ""
                      ? true
                      : false
                  }
                  {...register("id_unit_kerja", {
                    required: "Pilih SKPD",
                  })}>
                  {skpds?.data?.map((skpd) => (
                    <AutocompleteItem
                      key={skpd.id_simpeg}
                      textValue={skpd.nama_simpeg}>
                      {skpd.nama_simpeg}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
                <Autocomplete
                  isRequired
                  isLoading={loadingStatusPegawai || fetchingStatusPegawai}
                  className="col-span-4 sm:col-span-2"
                  labelPlacement="outside"
                  size="lg"
                  placeholder="Pilih status pegawai"
                  label="Status Pegawai"
                  name="kode_stapeg"
                  defaultSelectedKey={silka.kode_statuspeg}
                  defaultInputValue={silka.kode_statuspeg}
                  variant="flat"
                  errorMessage={
                    (errors?.kode_stapeg?.message &&
                      `${errors.kode_stapeg.message}`) ||
                    (isErrorStatusPegawai && errorStatusPegawai.message)
                  }
                  isInvalid={
                    errors?.kode_stapeg ||
                    isErrorStatusPegawai ||
                    statusPegawai?.message === ""
                      ? true
                      : false
                  }
                  {...register("kode_stapeg", {
                    required: "Pilih Status Pegawai",
                  })}>
                  {statusPegawai?.data?.map((item) => (
                    <AutocompleteItem
                      key={item.kode_stapeg}
                      textValue={`${item.kode_stapeg}-${item.stapeg_nama}`}>
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
