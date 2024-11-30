"use client";

import { proseslogin } from "@/lib/auth-actions";
import {
  ChevronUpDownIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Button, Input, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const FormAuth = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting, isValid },
  } = useForm();

  function toggleVisibility() {
    return setIsVisible(!isVisible);
  }
  const isSubmit = async (FormFileds) => {
    setLoadingBtn(true);
    let toastLoading;
    const result = await proseslogin(FormFileds);
    if (!result) {
      setLoadingBtn(false);
      toast.error(result?.response?.message, {
        id: toastLoading,
      });
    }

    // pesan error jika response false
    if (result?.response?.status === false) {
      setLoadingBtn(false);
      toast.error(result?.response?.message, {
        id: toastLoading,
      });
    }

    // pesan success jika response true dan redirect ke dashboard
    if (result?.response?.status === true) {
      toast.success(result?.response?.message, {
        id: toastLoading,
      });

      setTimeout(() => {
        toast.loading("Mengalihkan halaman, mohon tunggu", {
          id: toastLoading,
        });
      }, 500);

      setTimeout(() => {
        toast.remove(toastLoading);
        // setLoadingBtn(false); comment => agar selalu loading hingga halaman dialihkan
        router.replace("/app-integrasi/dashboard");
      }, 2000);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(isSubmit)}
        method="POST"
        autoComplete="off"
        noValidate
        className="flex flex-col gap-y-4">
        <Select
          isRequired
          isDisabled={isLoading || isSubmitting || loadingBtn}
          selectorIcon={<ChevronUpDownIcon className="size-8" />}
          label="Login sebagai ?"
          placeholder="Pilih type account"
          size="lg"
          radius="sm"
          variant="flat"
          labelPlacement="inside"
          name="type"
          isInvalid={errors?.type ? true : false}
          errorMessage={errors?.type?.message && `${errors.type.message}`}
          {...register("type", {
            required: "Pilih type account",
          })}>
          <SelectItem key="PERSONAL" value="PERSONAL" textValue="PERSONAL">
            <div className="flex flex-row items-center justify-start gap-x-2 p-4">
              <UserCircleIcon className="size-6" />
              <span className="font-bold">Personal PNS</span>
            </div>
          </SelectItem>
          <SelectItem key="UMPEG" value="UMPEG" textValue="UMPEG">
            <div className="flex flex-row items-center justify-start gap-x-2 p-4">
              <UserGroupIcon className="size-6" />
              <span className="font-bold">Pengelola Kepegawaian</span>
            </div>
          </SelectItem>
        </Select>
        <Input
          isRequired
          isDisabled={isLoading || isSubmitting || loadingBtn}
          variant="flat"
          type="text"
          radius="sm"
          label="Username"
          labelPlacement="outside"
          placeholder="Enter your username"
          size="lg"
          name="username"
          isInvalid={errors?.username ? true : false}
          errorMessage={
            errors?.username?.message && `${errors.username.message}`
          }
          {...register("username", {
            required: "Username wajib diisi",
            minLength: {
              value: 3,
              message: "Masukan minimal 3 karakter",
            },
          })}
          startContent={
            <UserIcon className="size-5 text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
        <Input
          isRequired
          isDisabled={isLoading || isSubmitting || loadingBtn}
          label="Password"
          variant="flat"
          size="lg"
          // color={errors?.password ? "danger" : "default"}
          isInvalid={errors?.password ? true : false}
          radius="sm"
          labelPlacement="outside"
          placeholder="Enter your password"
          name="password"
          {...register("password", {
            required: "Password wajib diisi",
          })}
          errorMessage={
            errors?.password?.message && `${errors.password.message}`
          }
          startContent={
            <KeyIcon className="size-5 text-default-400 pointer-events-none flex-shrink-0" />
          }
          endContent={
            <Tooltip
              content={!isVisible ? "Lihat Password" : "Sembuyikan Password"}>
              <button
                className="focus:outline-none"
                type="button"
                tabIndex={-1}
                onClick={toggleVisibility}
                aria-label="toggle password visibility">
                {!isVisible ? (
                  <EyeSlashIcon className="size-6 text-gray-400 dark:text-gray-200" />
                ) : (
                  <EyeIcon className="size-6 text-gray-800 dark:text-gray-400" />
                )}
              </button>
            </Tooltip>
          }
          type={isVisible ? "text" : "password"}
        />
        <Button
          isDisabled={isLoading || isSubmitting || loadingBtn || !isValid}
          isLoading={isLoading || isSubmitting || loadingBtn}
          type="submit"
          fullWidth
          color="primary"
          size="lg"
          variant="solid"
          spinner={
            <svg
              className="animate-spin h-5 w-5 text-current"
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
          radius="sm">
          Login Sekarang
        </Button>
      </form>
    </>
  );
};
