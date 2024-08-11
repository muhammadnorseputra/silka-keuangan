"use client";

import {
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";
import { useState } from "react";
import {
  EyeSlashIcon,
  EyeIcon,
  UserIcon,
  KeyIcon,
  ChevronUpDownIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { proseslogin } from "@/lib/auth-actions";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next-nprogress-bar";

export const FormAuth = () => {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isLoading,
      isSubmitting,
      isValid,
      isDirty,
      touchedFields,
    },
  } = useForm();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const isSubmit = async (FormFileds) => {
    let toastLoading;
    const result = await proseslogin(FormFileds);
    if (!result) {
      toast.error(result?.response?.message, {
        id: toastLoading,
      });
    }

    // pesan error jika response false
    if (result?.response?.status === false) {
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
        toast.remove(toastLoading);
        router.push("/app-integrasi/dashboard");
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
                  <EyeSlashIcon className="size-6 text-gray-400" />
                ) : (
                  <EyeIcon className="size-6 text-gray-800" />
                )}
              </button>
            </Tooltip>
          }
          type={isVisible ? "text" : "password"}
        />
        <Button
          isDisabled={isLoading || isSubmitting || !isValid}
          isLoading={isLoading || isSubmitting}
          type="submit"
          fullWidth
          color="primary"
          size="lg"
          radius="sm">
          Login Sekarang
        </Button>
      </form>
    </>
  );
};
