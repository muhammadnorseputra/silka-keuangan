"use client";

import { SearchPegawai } from "@/dummy/search-pegawai";
import { polaNIP } from "@/helpers/polanip";
import {
  ArchiveBoxXMarkIcon,
  ChevronUpDownIcon,
  MagnifyingGlassCircleIcon,
  PhotoIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  ScrollShadow,
  Select,
  SelectItem,
  Skeleton,
  Snippet,
  Spacer,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useModalDaftarLayananContext } from "@/lib/context/modal-daftar-layanan-context";
import ModalLayanan from "../modal/modal-daftar-layanan";

export default function CariASN() {
  const { isOpen, setIsOpen, setJenis } = useModalDaftarLayananContext();
  const [data, setData] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = useForm();

  const { mutate, isPending: isPendingFn } = useMutation({
    mutationKey: ["List.Pegawai"],
    mutationFn: async (body) => {
      // @ts-ignore
      const response = await SearchPegawai(body);
      return response;
    },
  });

  const isSubmit = useCallback(
    ({ type, filter }) => {
      const RAWJSON = {
        nipnama: filter,
        jenis: type,
      };
      // @ts-ignore
      mutate(RAWJSON, {
        onSuccess: (data) => {
          setData(data);
          setJenis(type);
        },
        onError: (err) => {
          toast.error(`Terjadi Kesalahan (${err})`);
        },
      });
    },
    [mutate, setJenis]
  );
  return (
    <>
      <ModalLayanan isOpenModal={isOpen} onClose={() => setIsOpen(false)} />
      <form
        onSubmit={handleSubmit(isSubmit)}
        method="POST"
        autoComplete="off"
        noValidate
        className="flex flex-wrap items-start w-10/12 md:flex-nowrap">
        <Input
          type="search"
          placeholder="Masukan NIP atau NAMA"
          radius="none"
          size="lg"
          name="filter"
          variant="underlined"
          startContent={<MagnifyingGlassCircleIcon className="size-6" />}
          isInvalid={errors?.filter ? true : false}
          errorMessage={errors?.filter?.message && `${errors.filter.message}`}
          {...register("filter", {
            required: "Ketikan NIP atau NAMA",
            minLength: {
              value: 3,
              message: "Masukan minimal 3 karakter",
            },
          })}
        />
        <Divider orientation="vertical" />
        <Select
          selectorIcon={<ChevronUpDownIcon className="size-8" />}
          label="Jenis Pegawai"
          placeholder="Pilih jenis pegawai"
          size="sm"
          radius="none"
          variant="underlined"
          labelPlacement="inside"
          name="type"
          isInvalid={errors?.type ? true : false}
          errorMessage={errors?.type?.message && `${errors.type.message}`}
          {...register("type", {
            required: "Pilih jenis pegawai",
          })}>
          <SelectItem key="PNS" value="PNS" textValue="PNS">
            <div className="flex flex-row items-center justify-start p-4 gap-x-2">
              <UserGroupIcon className="size-6" />
              <span className="font-bold">PNS</span>
            </div>
          </SelectItem>
          <SelectItem key="PPPK" value="PPPK" textValue="PPPK">
            <div className="flex flex-row items-center justify-start p-4 gap-x-2">
              <UserCircleIcon className="size-6" />
              <span className="font-bold">PPPK</span>
            </div>
          </SelectItem>
        </Select>
        <Button
          isDisabled={isPendingFn || isLoading || isSubmitting}
          isLoading={isPendingFn || isLoading || isSubmitting}
          spinner={
            <svg
              className="w-6 h-6 text-current animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              />
            </svg>
          }
          variant="flat"
          color="primary"
          size="lg"
          radius="none"
          type="submit"
          className="lg:max-w-[100px]"
          fullWidth>
          {isPendingFn || isLoading || isSubmitting ? "" : "Cari"}
        </Button>
      </form>
      <Card className="my-8 w-10/12 max-h-[500px] overflow-y-auto">
        <ScrollShadow size={100} className="h-[500px]">
          <CardHeader className="sticky top-0">
            {
              //@ts-ignore
              data?.status !== false && data?.status ? (
                <p className="font-bold">
                  {
                    // @ts-ignore
                    data?.message
                  }
                </p>
              ) : (
                ""
              )
            }
          </CardHeader>
          <CardBody>
            {isPendingFn || isLoading || isSubmitting ? (
              <Placeholder />
            ) : (
              <ListPegawai props={data} />
            )}
          </CardBody>
        </ScrollShadow>
      </Card>
    </>
  );
}

export const Placeholder = () => {
  return (
    <>
      <div className="flex items-start justify-center w-full mx-auto gap-x-6">
        <div>
          <Skeleton className="flex w-12 h-12 rounded-full" />
        </div>
        <div className="flex flex-col w-full gap-2">
          <Skeleton className="w-3/5 h-5 rounded-lg" />
          <Skeleton className="w-4/5 h-5 rounded-lg" />
          <Skeleton className="h-5 rounded-lg w-5/5" />
        </div>
      </div>
    </>
  );
};

export const ListPegawai = ({ props }) => {
  const { setIsOpen, setData } = useModalDaftarLayananContext();
  const { status, message, data } = props;
  if (status === false) {
    return (
      <p className="flex justify-center items-center flex-col gap-8 h-[400px]">
        <ArchiveBoxXMarkIcon className="text-gray-500 size-32" />
        {message}
      </p>
    );
  }
  if (!status) {
    return (
      <p className="flex justify-center items-center flex-col gap-8 h-[400px]">
        <MagnifyingGlassCircleIcon className="text-gray-300 size-32" />
        Silahkan Ketik NIP atau NAMA, kemudian pilih jenis pegawai, lalu klik
        cari.
      </p>
    );
  }
  return (
    <>
      {data?.map((row) => (
        <div key={row.nip}>
          <div className="flex flex-col items-start justify-center w-full p-3 mx-auto transition-all duration-100 rounded-lg group sm:flex-row gap-x-6 hover:bg-gray-100 dark:hover:bg-slate-700 hover:shadow-sm">
            <div>
              <Avatar size="lg" name={row.nama_asn} />
            </div>
            <div className="flex flex-col w-full gap-1">
              <div className="font-bold">{row.nama_asn}</div>
              <Snippet
                symbol="NIP : "
                size="md"
                color="primary"
                variant="flat"
                codeString={row.nip}>
                {polaNIP(row.nip)}
              </Snippet>
              <div className="text-ellipsis">{row.nama_jabatan}</div>
              <div className="text-ellipsis">{row.nama_unit_kerja}</div>
            </div>
            <div className="hidden group-hover:block">
              <Button
                onPress={() => {
                  setIsOpen(true);
                  setData(row);
                }}>
                Pilih Layanan
              </Button>
            </div>
          </div>
          <Spacer y={4} />
        </div>
      ))}
    </>
  );
};
