"use client";

import { SearchPegawai } from "@/dummy/search-pegawai";
import { polaNIP } from "@/helpers/polanip";
import { useModalContext } from "@/lib/context/modal-context";
import {
  ArchiveBoxXMarkIcon,
  ChevronUpDownIcon,
  DocumentCheckIcon,
  DocumentCurrencyDollarIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassPlusIcon,
  PhotoIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Code,
  Divider,
  Input,
  Listbox,
  ListboxItem,
  ListboxSection,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  Select,
  SelectItem,
  Skeleton,
  Spacer,
} from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { encrypt } from "@/helpers/encrypt";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import ModalDaftarLayananProvider, {
  useModalDaftarLayananContext,
} from "@/lib/context/modal-daftar-layanan-context";
import ModalLayanan from "../modal/modal-daftar-layanan";

export default function CariASN() {
  const { isOpen, setIsOpen, setJenis } = useModalDaftarLayananContext();
  const [data, setData] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting, isValid },
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
        className="flex items-start w-10/12 flex-wrap md:flex-nowrap">
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
            <div className="flex flex-row items-center justify-start gap-x-2 p-4">
              <UserGroupIcon className="size-6" />
              <span className="font-bold">PNS</span>
            </div>
          </SelectItem>
          <SelectItem key="PPPK" value="PPPK" textValue="PPPK">
            <div className="flex flex-row items-center justify-start gap-x-2 p-4">
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
              className="animate-spin h-6 w-6 text-current"
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
                <p className="font-bold">{data?.message}</p>
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
      <div className="w-full flex justify-center items-start gap-x-6 mx-auto">
        <div>
          <Skeleton className="flex rounded-full w-12 h-12" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-5 w-3/5 rounded-lg" />
          <Skeleton className="h-5 w-4/5 rounded-lg" />
          <Skeleton className="h-5 w-5/5 rounded-lg" />
        </div>
      </div>
    </>
  );
};

export const ListPegawai = ({ props }) => {
  const { setIsOpen, setData } = useModalDaftarLayananContext();
  const { status, message, jenis, http_code, count, data } = props;
  if (status === false) {
    return (
      <p className="flex justify-center items-center flex-col gap-8 h-[400px]">
        <ArchiveBoxXMarkIcon className="size-32 text-gray-500" />
        {message}
      </p>
    );
  }
  if (!status) {
    return (
      <p className="flex justify-center items-center flex-col gap-8 h-[400px]">
        <MagnifyingGlassCircleIcon className="size-32 text-gray-300" />
        Silahkan Ketik NIP atau NAMA, kemudian pilih jenis pegawai, lalu klik
        cari.
      </p>
    );
  }
  return (
    <>
      {data?.map((row) => (
        <div key={row.nip}>
          <div className="group w-full flex flex-col sm:flex-row justify-center items-start gap-x-6 mx-auto hover:bg-gray-100 dark:hover:bg-slate-700 hover:shadow-sm transition-all duration-100 rounded-lg p-3">
            <div>
              {row.photo ? (
                <Avatar
                  showFallback
                  fallback={
                    <PhotoIcon
                      className="animate-pulse size-8 text-default-500"
                      fill="currentColor"
                    />
                  }
                  size="lg"
                  src={`${process.env.NEXT_PUBLIC_SILKA_BASE_URL}/photo/${row.photo}`}
                />
              ) : (
                <Avatar size="lg" name={row.nama_asn} />
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <div className="font-bold">{row.nama_asn}</div>
              <h4>{polaNIP(row.nip)}</h4>
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
