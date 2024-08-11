"use client";
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
import { useEffect } from "react";
import { BriefcaseFill } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const FormPeremajaan = ({ skpds, statuspegawais }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting, isValid },
    setValue,
  } = useForm();

  useEffect(() => {
    if (!isValid && isSubmitting) {
      toast.error("Formulir Tidak Lengkap");
    }
  }, [isSubmitting, isValid]);

  const isSubmit = async (FormFileds) => {
    console.log(FormFileds);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(isSubmit)}
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
              <CardBody className="grid grid-flow-row-dense grid-cols-3 grid-rows-4 gap-6 pt-8 px-6">
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
                  className="col-span-4 sm:col-span-2"
                  labelPlacement="outside"
                  size="lg"
                  placeholder="Pilih Satuan Kerja Pemerintah Daerah"
                  label="Satuan Kerja Pemerintah Daerah"
                  name="kodeskpd"
                  variant="flat"
                  errorMessage={
                    errors?.kodeskpd?.message && `${errors.kodeskpd.message}`
                  }
                  isInvalid={errors?.kodeskpd ? true : false}
                  {...register("kodeskpd", {
                    required: "Pilih SKPD",
                  })}>
                  {skpds.map((skpd) => (
                    <AutocompleteItem
                      key={skpd.kodeskpd}
                      value={skpd.kodeskpd}
                      textValue={skpd.nama_skpd}>
                      {skpd.nama_skpd}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
                <Autocomplete
                  isReadOnly
                  className="col-span-4 sm:col-span-2"
                  labelPlacement="outside"
                  size="lg"
                  placeholder="Pilih status pegawai"
                  label="Status Pegawai"
                  name="kode_stapeg"
                  defaultItems={statuspegawais}
                  defaultSelectedKey="12"
                  selectedKey="12"
                  variant="flat"
                  errorMessage={
                    errors?.kode_stapeg?.message &&
                    `${errors.kode_stapeg.message}`
                  }
                  isInvalid={errors?.kode_stapeg ? true : false}
                  {...register("kode_stapeg", {
                    required: "Pilih Status Pegawai",
                  })}>
                  {statuspegawais.map((item) => (
                    <AutocompleteItem
                      key={item.kode_stapeg}
                      value={item.kode_stapeg}
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
                  {...register("mk_tahun")}
                />
                <Input
                  isReadOnly
                  variant="flat"
                  size="lg"
                  className="col-span-4 sm:col-span-1"
                  placeholder="Gaji Pokok"
                  labelPlacement="outside"
                  type="number"
                  label="Gaji Pokok"
                  name="gapok"
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
                  type="number"
                  label="Nomor HP"
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
            isDisabled={isLoading || isSubmitting}
            isLoading={isLoading || isSubmitting}>
            <CircleStackIcon className="size-5" />
            <Divider orientation="vertical" /> Perbaharui Data PPPK
          </Button>
        </div>
      </form>
    </>
  );
};
