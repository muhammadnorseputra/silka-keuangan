"use client";

import { SearchPegawai } from "@/dummy/search-pegawai";
import { polaNIP } from "@/helpers/polanip";
import {
  ArchiveBoxXMarkIcon,
  ArrowRightIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  ChevronUpDownIcon,
  DocumentTextIcon,
  InboxIcon,
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
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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
    [mutate, setJenis],
  );
  return (
    <>
      <ModalLayanan isOpenModal={isOpen} onClose={() => setIsOpen(false)} />
      <form
        onSubmit={handleSubmit(isSubmit)}
        method="POST"
        autoComplete="off"
        noValidate
        className="relative flex flex-wrap items-center p-8 mx-8 rounded-lg shadow-lg bg-gradient-to-b from-white to-gray-100 dark:from-slate-800 dark:to-slate-900 md:flex-nowrap gap-x-4 gap-y-4 -top-16"
      >
        <Input
          type="search"
          placeholder="Masukan NIP atau NAMA"
          label="Kata Kunci"
          labelPlacement="outside"
          radius="lg"
          size="lg"
          variant="bordered"
          startContent={
            <MagnifyingGlassCircleIcon className="text-gray-500 size-8" />
          }
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
        <Select
          selectorIcon={<ChevronUpDownIcon className="size-8" />}
          label="Jenis Pegawai"
          placeholder="Pilih jenis pegawai"
          size="lg"
          labelPlacement="outside"
          radius="lg"
          variant="bordered"
          isInvalid={errors?.type ? true : false}
          errorMessage={errors?.type?.message && `${errors.type.message}`}
          {...register("type", {
            required: "Pilih jenis pegawai",
          })}
        >
          <SelectItem key="PNS" value="PNS" textValue="PNS">
            <div className="flex flex-row items-center justify-start p-2 gap-x-2">
              <div className="p-2 rounded-lg bg-green-200/50 dark:bg-green-100/30">
                <UserGroupIcon className="text-green-300 size-6" />
              </div>
              <span className="font-bold">PNS</span>
            </div>
          </SelectItem>
          <SelectItem key="PPPK" value="PPPK" textValue="PPPK">
            <div className="flex flex-row items-center justify-start p-2 gap-x-2">
              <div className="p-2 rounded-lg bg-purple-200/50 dark:bg-purple-100/30">
                <UserCircleIcon className="text-purple-300 size-6" />
              </div>
              <span className="font-bold">PPPK</span>
            </div>
          </SelectItem>
        </Select>
        <Button
          startContent={
            isPendingFn || isLoading || isSubmitting ? null : (
              <MagnifyingGlassIcon className="w-9 h-9" />
            )
          }
          isDisabled={isPendingFn || isLoading || isSubmitting}
          isLoading={isPendingFn || isLoading || isSubmitting}
          spinner={
            <svg
              className="w-6 h-6 text-current duration-100 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
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
          variant="shadow"
          color="primary"
          size="lg"
          radius="lg"
          type="submit"
          fullWidth={false}
          className="min-w-[200px] relative top-3"
        >
          {isPendingFn || isLoading || isSubmitting ? "" : "Cari"}
        </Button>
      </form>
      <Card className="mx-8 overflow-y-auto border-0 -top-12" disableRipple>
        <ScrollShadow size={100} isEnabled={false} className="h-[500px]">
          <CardHeader className="sticky top-0 z-10 px-8 py-4 bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            {
              //@ts-ignore
              data?.status !== false && data?.status ? (
                <div className="inline-flex items-start flex-start gap-x-4">
                  <div className="p-2 rounded-lg bg-green-200/50 dark:bg-green-100/30">
                    <DocumentTextIcon className="text-green-400 size-6" />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <span className="text-lg font-bold text-gray-700 dark:text-gray-300">
                      Hasil Pencarian
                    </span>
                    <span className="text-sm text-gray-400 dark:text-gray-300">
                      {
                        // @ts-ignore
                        data?.message
                      }
                    </span>
                  </div>
                </div>
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
        <ArchiveBoxXMarkIcon className="text-gray-400 dark:text-gray-300 size-32" />
        <span className="text-gray-300 dark:text-gray-400">{message}</span>
      </p>
    );
  }
  if (!status) {
    return (
      <p className="flex justify-center items-center flex-col gap-8 h-[400px]">
        <InboxIcon className="text-gray-400 dark:text-gray-300 size-32" />
        <span className="text-gray-300 dark:text-gray-400">Data tidak ditemukan atau kosong.</span>
      </p>
    );
  }
  return (
    <>
      {data?.map((row) => (
        <div key={row.nip}>
          <div className="flex flex-col items-center justify-center w-full p-4 transition-all duration-100 rounded-lg group sm:flex-row gap-x-6 hover:bg-gray-100 dark:hover:bg-slate-700 hover:shadow-sm">
            <div>
              <Avatar size="lg" name={row.nama_asn} className="font-semibold text-blue-900 bg-blue-200" />
            </div>
            <div className="flex flex-col w-full gap-1">
              <div className="font-bold text-gray-700 dark:text-gray-300">{row.nama_asn}</div>
              <Snippet
                symbol="NIP : "
                size="sm"
                color="primary"
                variant="flat"
                codeString={row.nip}
                className="rounded-lg w-max"
              >
                {polaNIP(row.nip)}
              </Snippet>
              <div className="inline-flex items-center justify-start text-gray-600 gap-x-2 text-ellipsis dark:text-gray-400"><BriefcaseIcon className="inline-block w-4 h-4" />{row.nama_jabatan}</div>
              <div className="inline-flex items-center justify-start text-gray-600 gap-x-2 text-ellipsis dark:text-gray-400"><BuildingLibraryIcon className="inline-block w-4 h-4" />{row.nama_unit_kerja}</div>
            </div>
            <div className="hidden group-hover:block">
              <Button
                className="font-bold text-blue-500"
                variant="light"
                onPress={() => {
                  setIsOpen(true);
                  setData(row);
                }}
              >
                Pilih Layanan <ArrowRightIcon className="inline w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
          <Spacer y={4} />
        </div>
      ))}
    </>
  );
};
