"use client";

import { getBankSigapok } from "@/dummy/sigapok-get-bank";
import { useModalContext } from "@/lib/context/modal-context";
import {
  useBank,
  useJenisPegawai,
  usePangkat,
  useSatkers,
  useSkpds,
  useStatusPegawai,
} from "@/lib/FetchQuery";
import {
  CircleStackIcon,
  SparklesIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BriefcaseFill } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AlertWarning } from "../alert";
import { ModalPeremajaan } from "../modal/modal-peremajaan";
const {
  Tabs,
  CardBody,
  Card,
  Tab,
  Input,
  Button,
  Divider,
  Autocomplete,
  AutocompleteItem,
  CardHeader,
  Textarea,
} = require("@nextui-org/react");

const FormPeremajaan = ({ sigapok, pegawais }) => {
  const [data, setData] = useState([]);
  const { isOpen, setIsOpen } = useModalContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting, isValid },
  } = useForm();

  const {
    nip_lama,
    nip,
    gelar_depan,
    nama,
    gelar_belakang,
    tmp_lahir,
    tgl_lahir,
    jenis_kelamin,
    makertotal_tahun,
    makertotal_bulan,
    nama_agama,
    nama_tingkat_pendidikan,
    alamat_ktp,
    no_npwp,
    no_ktp,
    whatsapp,
    norek,
    induk_bank,
    jumlah_anak,
    jumlah_istri,
    kode_skpd,
    kode_satker,
    kode_status_pegawai,
    kode_pangkat,
    kode_jenis_pegawai,
    status_data,
    gapok,
  } = pegawais;

  const {
    data: skpds,
    error: errorSkpd,
    isLoading: isLoadingSkpd,
    isFetching: isFetchingSkpd,
    isError: isErrorSkpd,
  } = useSkpds(sigapok);

  const {
    data: statusPegawais,
    error: errorStatusPegawai,
    isLoading: isLoadingStatusPegawai,
    isFetching: isFetchingStatusPegawai,
    isError: isErrorStatusPegawai,
  } = useStatusPegawai(sigapok);

  const {
    data: satkers,
    error: errorSatkers,
    isLoading: isLoadingSatkers,
    isFetching: isFetchingSatkers,
    isError: isErrorSatkers,
  } = useSatkers(sigapok);

  const {
    data: jenisPegawais,
    error: errorJenisPegawai,
    isLoading: isLoadingJenisPegawai,
    isFetching: isFetchingJenisPegawai,
    isError: isErrorJenisPegawai,
  } = useJenisPegawai(sigapok);

  const {
    data: pangkats,
    error: errorPangkat,
    isLoading: isLoadingPangkat,
    isFetching: isFetchingPangkat,
    isError: isErrorPangkat,
  } = usePangkat(sigapok);

  const {
    data: banks,
    error: errorBank,
    isLoading: isLoadingBank,
    isFetching: isFetchingBank,
    isError: isErrorBank,
  } = useBank(sigapok);

  useEffect(() => {
    if (!isValid && isSubmitting) {
      toast.error("Formulir Tidak Lengkap");
    }
  }, [isSubmitting, isValid]);

  const isConfirm = async (form) => {
    setIsOpen(true);
    setData(form);
  };

  const isYakin = () => {
    setIsOpen(false);
    console.log(data);
  };

  const renderForm = () => {
    if (status_data !== "ENTRI" && status_data !== null) {
      return (
        <Card className="w-full h-screen">
          <CardBody className="flex flex-col items-center justify-center gap-6">
            <Image
              src="/assets/svg/undraw_checking_boxes_re_9h8m.svg"
              width={300}
              height={300}
              alt="Uptodate"
            />
            <h1 className="font-bold text-lg">
              Data anda sudah diperbaharui pada tanggal{" "}
              <span className="text-gray-400">27 Mei 1999</span>
            </h1>
          </CardBody>
        </Card>
      );
    }
    return (
      <>
        <ModalPeremajaan
          isOpenModal={isOpen}
          onClose={() => setIsOpen(false)}
          handlePeremajaan={isYakin}
        />
        <form
          onSubmit={handleSubmit(isConfirm)}
          method="POST"
          autoComplete="off"
          noValidate>
          <input type="hidden" name="test" value="test" {...register("test")} />
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
            {/* Tabs Pribadi */}
            <Tab
              key="personal"
              title={
                <div className="flex items-center space-x-2">
                  <UserCircleIcon className="size-6" />
                  <p className="font-bold">Data Pribadi</p>
                </div>
              }>
              <Card>
                <CardHeader>
                  <AlertWarning
                    title="Perhatian"
                    message="Jika terdapat kesalahan data pribadi pada section ini, silahkan hubungi BKPSDM untuk melakukan update data tersebut"
                  />
                </CardHeader>
                <CardBody className="grid grid-flow-row md:grid-cols-3 gap-6 pt-8 px-6">
                  <Input
                    isReadOnly
                    variant="flat"
                    size="lg"
                    placeholder="NIP Lama"
                    labelPlacement="outside"
                    type="text"
                    label="Nomor Induk Pegawai Lama"
                    name="nip_lama"
                    className="col-span-2 sm:col-span-1"
                    defaultValue={nip_lama}
                    {...register("nip_lama")}
                  />
                  <Input
                    isReadOnly
                    variant="flat"
                    size="lg"
                    placeholder="NIP Baru"
                    labelPlacement="outside"
                    type="text"
                    label="Nomor Induk Pegawai"
                    name="nip_baru"
                    className="col-span-2 sm:col-span-1"
                    defaultValue={nip}
                    {...register("nip_baru")}
                  />
                  <Input
                    isReadOnly
                    variant="flat"
                    size="lg"
                    placeholder="Contoh: Amang"
                    labelPlacement="outside"
                    type="text"
                    label="Nama"
                    name="nama"
                    className="col-span-2 sm:col-span-1"
                    defaultValue={nama}
                    {...register("nama")}
                  />
                  <Input
                    isReadOnly
                    variant="flat"
                    size="lg"
                    placeholder="Contoh: H., Hj., Dr., Drs."
                    labelPlacement="outside"
                    type="text"
                    label="Gelar Depan"
                    className="col-span-2 sm:col-span-1"
                    name="gelar_depan"
                    defaultValue={gelar_depan}
                    {...register("gelar_depan")}
                  />

                  <Input
                    isReadOnly
                    variant="flat"
                    size="lg"
                    placeholder="Contoh: S.Kom"
                    labelPlacement="outside"
                    type="text"
                    label="Gelar Belakang"
                    name="gelar_belakang"
                    className="col-span-2 sm:col-span-1"
                    defaultValue={gelar_belakang}
                    {...register("gelar_belakang")}
                  />
                  <Input
                    isReadOnly
                    variant="flat"
                    size="lg"
                    placeholder="Contoh: Laki - Laki"
                    labelPlacement="outside"
                    type="text"
                    label="Jenis Kelamin"
                    name="jenkel"
                    className="col-span-2 sm:col-span-1"
                    defaultValue={jenis_kelamin}
                    {...register("jenkel")}
                  />
                  <Input
                    isReadOnly
                    variant="flat"
                    size="lg"
                    placeholder="Contoh: Banua Hanyar"
                    labelPlacement="outside"
                    type="text"
                    label="Tempat Lahir"
                    name="tempat_lahir"
                    className="col-span-2 sm:col-span-1"
                    defaultValue={tmp_lahir}
                    {...register("tempat_lahir")}
                  />
                  <Input
                    isReadOnly
                    variant="flat"
                    size="lg"
                    placeholder="Contoh: 00-00-0000"
                    labelPlacement="outside"
                    type="text"
                    label="Tanggal Lahir"
                    name="tgl_lahir"
                    className="col-span-2 sm:col-span-1"
                    defaultValue={tgl_lahir}
                    {...register("tgl_lahir")}
                  />
                  <Input
                    isReadOnly
                    variant="flat"
                    size="lg"
                    placeholder="Contoh: ISLAM"
                    labelPlacement="outside"
                    type="text"
                    label="Agama"
                    className="col-span-2 sm:col-span-1"
                    name="agama"
                    defaultValue={nama_agama}
                    {...register("agama")}
                  />
                  <Input
                    isReadOnly
                    variant="flat"
                    size="lg"
                    placeholder="Contoh: S1"
                    labelPlacement="outside"
                    type="text"
                    label="Pendidikan Terkahir"
                    name="pendidikan_terkahir"
                    className="col-span-2 sm:col-span-1"
                    defaultValue={nama_tingkat_pendidikan}
                    {...register("pendidikan_terkahir")}
                  />
                  <Textarea
                    variant="flat"
                    className="col-span-2"
                    isReadOnly
                    label="Alamat Sesuai KTP"
                    labelPlacement="outside"
                    placeholder="Alamat anda"
                    name="alamat"
                    defaultValue={alamat_ktp}
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
                    allowsCustomValue
                    isLoading={isLoadingSatkers || isFetchingSatkers}
                    isDisabled={isLoadingSatkers || isFetchingSatkers}
                    className="col-span-4 sm:col-span-2"
                    labelPlacement="outside"
                    size="lg"
                    placeholder="Pilih Satuan Kerja"
                    label="Satuan Kerja"
                    name="kodesatker"
                    defaultSelectedKey={kode_satker}
                    variant="flat"
                    errorMessage={
                      (errors?.kodesatker?.message &&
                        `${errors.kodesatker.message}`) ||
                      (isErrorSatkers && errorSatkers.message)
                    }
                    isInvalid={
                      errors?.kodesatker || isErrorSatkers ? true : false
                    }
                    {...register("kodesatker", {
                      required: "Pilih Satker",
                    })}>
                    {satkers?.data.map((satker) => (
                      <AutocompleteItem
                        key={satker.kodesatker}
                        value={satker.kodesatker}>
                        {satker.nama_satker}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  <Autocomplete
                    isRequired
                    isLoading={isLoadingSkpd || isFetchingSkpd}
                    isDisabled={isLoadingSkpd || isFetchingSkpd}
                    className="col-span-4 sm:col-span-2"
                    labelPlacement="outside"
                    size="lg"
                    placeholder="Pilih Satuan Kerja Pemerintah Daerah"
                    label="Satuan Kerja Pemerintah Daerah"
                    name="kodeskpd"
                    defaultSelectedKey={kode_skpd}
                    variant="flat"
                    errorMessage={
                      (errors?.kodeskpd?.message &&
                        `${errors.kodeskpd.message}`) ||
                      (isErrorSkpd && errorSkpd.message)
                    }
                    isInvalid={errors?.kodeskpd || isErrorSkpd ? true : false}
                    {...register("kodeskpd", {
                      required: "Pilih SKPD",
                    })}>
                    {skpds?.data.map((skpd) => (
                      <AutocompleteItem
                        key={skpd.kodeskpd}
                        value={skpd.kodeskpd}
                        textValue={skpd.nama_skpd}>
                        {skpd.nama_skpd}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  <Autocomplete
                    isRequired
                    isLoading={isLoadingJenisPegawai || isFetchingJenisPegawai}
                    isDisabled={isLoadingJenisPegawai || isFetchingJenisPegawai}
                    className="col-span-4 sm:col-span-2"
                    labelPlacement="outside"
                    size="lg"
                    placeholder="Pilih jenis pegawai"
                    label="Jenis Pegawai"
                    name="kode_jenis"
                    defaultSelectedKey={kode_jenis_pegawai}
                    variant="flat"
                    errorMessage={
                      (errors?.kode_jenis?.message &&
                        `${errors.kode_jenis.message}`) ||
                      (isErrorJenisPegawai && errorJenisPegawai.message)
                    }
                    isInvalid={
                      errors?.kode_jenis || isErrorJenisPegawai ? true : false
                    }
                    {...register("kode_jenis", {
                      required: "Pilih Jenis Pegawai",
                    })}>
                    {jenisPegawais?.data.map((js) => (
                      <AutocompleteItem
                        key={js.kode_jenis}
                        value={js.kode_jenis}
                        textValue={js.nama_jenis}>
                        {js.nama_jenis}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  <Autocomplete
                    isRequired
                    isLoading={isLoadingPangkat || isFetchingPangkat}
                    isDisabled={isLoadingPangkat || isFetchingPangkat}
                    className="col-span-4 sm:col-span-2"
                    labelPlacement="outside"
                    size="lg"
                    placeholder="Pilih pangkat"
                    label="Pangkat"
                    name="kode_pangkat"
                    defaultSelectedKey={kode_pangkat}
                    variant="flat"
                    errorMessage={
                      (errors?.kode_pangkat?.message &&
                        `${errors.kode_pangkat.message}`) ||
                      (isErrorPangkat && errorPangkat.message)
                    }
                    isInvalid={
                      errors?.kode_pangkat || isErrorPangkat ? true : false
                    }
                    {...register("kode_pangkat", {
                      required: "Pilih Pangkat Pegawai",
                    })}>
                    {pangkats?.data.map((pangkat) => (
                      <AutocompleteItem
                        key={pangkat.kode_pangkat}
                        value={pangkat.kode_pangkat}
                        textValue={`${pangkat.nama_golongan} - ${pangkat.ket_pangkat}`}>
                        {pangkat.nama_golongan} - {pangkat.ket_pangkat}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  <Autocomplete
                    isRequired
                    isDisabled={
                      isLoadingStatusPegawai || isFetchingStatusPegawai
                    }
                    isLoading={
                      isLoadingStatusPegawai || isFetchingStatusPegawai
                    }
                    className="col-span-4 sm:col-span-2"
                    labelPlacement="outside"
                    size="lg"
                    placeholder="Pilih status pegawai"
                    label="Status Pegawai"
                    name="kode_stapeg"
                    defaultSelectedKey={kode_status_pegawai}
                    variant="flat"
                    errorMessage={
                      (errors?.kode_stapeg?.message &&
                        `${errors.kode_stapeg.message}`) ||
                      (isErrorStatusPegawai && errorStatusPegawai.message)
                    }
                    isInvalid={
                      errors?.kode_stapeg || isErrorStatusPegawai ? true : false
                    }
                    {...register("kode_stapeg", {
                      required: "Pilih Status Pegawai",
                    })}>
                    {statusPegawais?.data.map((statuspeg) => (
                      <AutocompleteItem
                        key={statuspeg.kode_stapeg}
                        value={statuspeg.kode_stapeg}
                        textValue={statuspeg.stapeg_nama}>
                        {statuspeg.stapeg_nama}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  <Input
                    isReadOnly
                    size="lg"
                    className="col-span-4 sm:col-span-1"
                    placeholder="Masa Kerja Golongan Tahun"
                    labelPlacement="outside"
                    type="text"
                    label="Masa Kerja Golongan Tahun"
                    name="mk_tahun"
                    defaultValue={makertotal_tahun}
                    variant="flat"
                    errorMessage={
                      errors?.mk_tahun?.message && `${errors.mk_tahun.message}`
                    }
                    isInvalid={errors?.mk_tahun ? true : false}
                    {...register("mk_tahun", {
                      pattern: {
                        value: /^\d+$/,
                        message: "Tidak valid, hanya boleh angka",
                      },
                    })}
                  />
                  <Input
                    isReadOnly
                    size="lg"
                    className="col-span-4 sm:col-span-1"
                    placeholder="Masa Kerja Golongan Bulan"
                    labelPlacement="outside"
                    type="text"
                    label="Masa Kerja Golongan Bulan"
                    name="mk_bulan"
                    defaultValue={makertotal_bulan}
                    variant="flat"
                    errorMessage={
                      errors?.mk_bulan?.message && `${errors.mk_bulan.message}`
                    }
                    isInvalid={errors?.mk_bulan ? true : false}
                    {...register("mk_bulan", {
                      pattern: {
                        value: /^\d+$/,
                        message: "Tidak valid, hanya boleh angka",
                      },
                    })}
                  />
                  <Input
                    isReadOnly
                    size="lg"
                    className="col-span-4 sm:col-span-1"
                    placeholder="Gaji Pokok"
                    labelPlacement="outside"
                    type="text"
                    label="Gaji Pokok"
                    name="gapok"
                    variant="flat"
                    defaultValue={gapok}
                    errorMessage={
                      errors?.gapok?.message && `${errors.gapok.message}`
                    }
                    isInvalid={errors?.gapok ? true : false}
                    {...register("gapok", {
                      pattern: {
                        value: /^\d+$/,
                        message: "Tidak valid, hanya boleh angka",
                      },
                    })}
                  />
                </CardBody>
              </Card>
            </Tab>
            {/* Tabs Keluarga */}
            <Tab
              key="keluarga"
              title={
                <div className="flex items-center space-x-2">
                  <UserGroupIcon className="size-6" />
                  <p className="font-bold">Data Keluarga</p>
                </div>
              }>
              <Card>
                <CardBody className="grid grid-flow-row-dense grid-cols-2 grid-rows-2 gap-6 py-8 px-6">
                  <Input
                    isReadOnly
                    size="lg"
                    className="col-span-2 sm:col-span-1"
                    placeholder="Contoh: 1"
                    labelPlacement="outside"
                    type="number"
                    label="Jumlah Istri / Suami"
                    name="jumlah_istri"
                    variant="flat"
                    defaultValue={jumlah_istri}
                    {...register("jumlah_istri")}
                  />
                  <Input
                    isReadOnly
                    size="lg"
                    className="col-span-2 sm:col-span-1"
                    placeholder="Contoh: 1"
                    labelPlacement="outside"
                    type="number"
                    label="Jumlah Anak"
                    name="jumlah_anak"
                    defaultValue={jumlah_anak}
                    variant="flat"
                    {...register("jumlah_anak")}
                  />
                </CardBody>
              </Card>
            </Tab>
            {/* Tabs Lainnya */}
            <Tab
              key="lainnya"
              title={
                <div className="flex items-center space-x-2">
                  <SparklesIcon className="size-6" />
                  <p className="font-bold">Data Lainnya</p>
                </div>
              }>
              <Card>
                <CardBody className="grid grid-flow-row-dense grid-cols-2 grid-rows-2 gap-6 py-8 px-6">
                  <Autocomplete
                    isRequired
                    isLoading={isErrorBank || isFetchingBank}
                    isDisabled={isErrorBank || isFetchingBank}
                    allowsCustomValue
                    labelPlacement="outside"
                    size="lg"
                    className="col-span-2 sm:col-span-1"
                    placeholder="Pilih Bank"
                    label="Bank"
                    name="kode_bank"
                    variant="flat"
                    defaultSelectedKey={induk_bank}
                    errorMessage={
                      (errors?.kode_bank?.message &&
                        `${errors.kode_bank.message}`) ||
                      (isErrorBank && errorBank.message)
                    }
                    isInvalid={errors?.kode_bank || isErrorBank ? true : false}
                    {...register("kode_bank", {
                      required: "Pilih BANK",
                    })}>
                    {banks?.data.map((item) => (
                      <AutocompleteItem
                        key={item.id_bank}
                        value={item.kode_bank}>
                        {item.nama_bank}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  <Input
                    isRequired
                    size="lg"
                    className="col-span-2 sm:col-span-1"
                    placeholder="Nomor Rekening"
                    labelPlacement="outside"
                    type="text"
                    label="Nomor Rekening"
                    name="norek"
                    variant="flat"
                    defaultValue={norek}
                    errorMessage={
                      errors?.norek?.message && `${errors.norek.message}`
                    }
                    isInvalid={errors?.norek ? true : false}
                    {...register("norek", {
                      required: "Isi Nomor Rekening",
                    })}
                  />
                  <Input
                    isReadOnly
                    size="lg"
                    className="col-span-2 sm:col-span-1"
                    placeholder="Nomor Peserta Wajib Pajak"
                    labelPlacement="outside"
                    type="text"
                    label="Nomor Peserta Wajib Pajak"
                    name="no_npwp"
                    defaultValue={no_npwp}
                    variant="flat"
                    errorMessage={
                      errors?.no_npwp?.message && `${errors.no_npwp.message}`
                    }
                    isInvalid={errors?.no_npwp ? true : false}
                    {...register("no_npwp", {
                      pattern: {
                        value: /^[0-9.-]+$/,
                        message:
                          "Tidak valid, karakter yang di izinkan hanya (angka,strip,titik)",
                      },
                    })}
                  />
                  <Input
                    isReadOnly
                    size="lg"
                    className="col-span-2 sm:col-span-1"
                    placeholder="Nomor HP"
                    labelPlacement="outside"
                    type="text"
                    label="Nomor HP"
                    name="no_hp"
                    defaultValue={whatsapp}
                    variant="flat"
                    errorMessage={
                      errors?.no_hp?.message && `${errors.no_hp.message}`
                    }
                    isInvalid={errors?.no_hp ? true : false}
                    {...register("no_hp", {
                      pattern: {
                        value: /^\d{1,12}$/,
                        message:
                          "Tidak valid, hanya boleh angka dan maksimal 12",
                      },
                    })}
                  />
                  <Input
                    isReadOnly
                    size="lg"
                    className="col-span-2 sm:col-span-1"
                    placeholder="Nomor KTP"
                    labelPlacement="outside"
                    type="text"
                    label="Nomor KTP"
                    name="no_ktp"
                    defaultValue={no_ktp}
                    variant="flat"
                    errorMessage={
                      errors?.no_ktp?.message && `${errors.no_ktp.message}`
                    }
                    isInvalid={errors?.no_ktp ? true : false}
                    {...register("no_ktp", {
                      pattern: {
                        value: /^\d{1,16}$/,
                        message:
                          "Tidak valid, hanya boleh angka dan maksimal 16",
                      },
                    })}
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
              isDisabled={isLoading || isSubmitting}
              isLoading={isLoading || isSubmitting}>
              <CircleStackIcon className="size-5" />
              <Divider orientation="vertical" /> Perbaharui Data
            </Button>
          </div>
        </form>
      </>
    );
  };

  return <>{renderForm()}</>;
};

export { FormPeremajaan };
