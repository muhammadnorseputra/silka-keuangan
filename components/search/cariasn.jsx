"use client";

import { SearchPegawai } from "@/dummy/search-pegawai";
import {
  ChevronUpDownIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassPlusIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import {
  Button,
  Code,
  Divider,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function CariASN() {
  const [data, setData] = useState(null);
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

  const isSubmit = async ({ type, filter }) => {
    const RAWJSON = {
      nipnama: filter,
      jenis: type,
    };
    // @ts-ignore
    mutate(RAWJSON, {
      onSuccess: (data) => {
        setData(data);
      },
      onError: (err) => {
        toast.error(`Terjadi Kesalahan (${err})`);
      },
    });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(isSubmit)}
        method="POST"
        autoComplete="off"
        noValidate
        className="flex items-start w-10/12 bg-white rounded p-6 flex-wrap md:flex-nowrap">
        <Input
          type="search"
          placeholder="Masukan NIP atau NAMA"
          radius="none"
          size="lg"
          name="filter"
          variant="flat"
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
        <Select
          isRequired
          selectorIcon={<ChevronUpDownIcon className="size-8" />}
          label="Jenis Pegawai"
          placeholder="Pilih jenis pegawai"
          size="sm"
          radius="none"
          variant="flat"
          labelPlacement="inside"
          name="type"
          isInvalid={errors?.type ? true : false}
          errorMessage={errors?.type?.message && `${errors.type.message}`}
          {...register("type", {
            required: "Pilih jenis pegawai",
          })}>
          <SelectItem key="PNS" value="PNS" textValue="PNS">
            <div className="flex flex-row items-center justify-start gap-x-2 p-4">
              <UserCircleIcon className="size-6" />
              <span className="font-bold">PNS</span>
            </div>
          </SelectItem>
          <SelectItem key="PPPK" value="PPPK" textValue="PPPK">
            <div className="flex flex-row items-center justify-start gap-x-2 p-4">
              <UserGroupIcon className="size-6" />
              <span className="font-bold">PPPK</span>
            </div>
          </SelectItem>
        </Select>
        <Button
          isDisabled={isPendingFn || !isValid}
          isLoading={isPendingFn}
          variant="flat"
          color="primary"
          size="lg"
          radius="none"
          type="submit">
          Cari
        </Button>
      </form>
      <Divider orientation="horizontal" />
      <Code>{JSON.stringify(data)}</Code>
    </>
  );
}
