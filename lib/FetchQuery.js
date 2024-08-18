"use client";

import { useQuery } from "@tanstack/react-query";
import { getStatusPegawaiSigapok } from "@/dummy/sigapok-get-statuspegawai";
import { getSkpdSigapok } from "@/dummy/sigapok-get-skpd";
import { getSatkerSigapok } from "@/dummy/sigapok-get-satker";
import { getJenisPegawaiSigapok } from "@/dummy/sigapok-get-jenispegawai";
import { getPangkatSigapok } from "@/dummy/sigapok-get-pangkat";
import { getBankSigapok } from "@/dummy/sigapok-get-bank";
import { getProfilePppk } from "@/dummy/data-pppk-by-nipppk";

export const useSatkers = ({ access_token }) => {
  return useQuery({
    queryKey: ["satkers"],
    queryFn: async () => {
      const getSatker = await getSatkerSigapok(access_token);
      return getSatker;
    },
    refetchOnWindowFocus: false,
  });
};

export const useSkpds = ({ access_token }) => {
  return useQuery({
    queryKey: ["skpds"],
    queryFn: async () => {
      const getSkpd = await getSkpdSigapok(access_token);
      return getSkpd;
    },
    refetchOnWindowFocus: false,
  });
};

export const useStatusPegawai = ({ access_token }) => {
  return useQuery({
    queryKey: ["statusPegawai"],
    queryFn: async () => {
      const getStatusPegawai = await getStatusPegawaiSigapok(access_token);
      return getStatusPegawai;
    },
    refetchOnWindowFocus: false,
  });
};

export const useJenisPegawai = ({ access_token }) => {
  return useQuery({
    queryKey: ["jenisPegawai"],
    queryFn: async () => {
      const getJenisPegawai = await getJenisPegawaiSigapok(access_token);
      return getJenisPegawai;
    },
    refetchOnWindowFocus: false,
  });
};

export const usePangkat = ({ access_token }) => {
  return useQuery({
    queryKey: ["pangkat"],
    queryFn: async () => {
      const getPangkat = await getPangkatSigapok(access_token);
      return getPangkat;
    },
    refetchOnWindowFocus: false,
  });
};

export const useBank = ({ access_token }) => {
  return useQuery({
    queryKey: ["bank"],
    queryFn: async () => {
      const getBank = await getBankSigapok(access_token);
      return getBank;
    },
    refetchOnWindowFocus: false,
  });
};
