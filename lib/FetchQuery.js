"use client";

import { useQuery } from "@tanstack/react-query";
import { getStatusPegawaiSigapok } from "@/dummy/sigapok-get-statuspegawai";
import { getSkpdSigapok } from "@/dummy/sigapok-get-skpd";
import { getSatkerSigapok } from "@/dummy/sigapok-get-satker";
import { getJenisPegawaiSigapok } from "@/dummy/sigapok-get-jenispegawai";
import { getPangkatSigapok } from "@/dummy/sigapok-get-pangkat";
import { getBankSigapok } from "@/dummy/sigapok-get-bank";
import {
  getReferensiAgamaById,
  getReferensiSKPDById,
  getReferensiJenisPegawaiById,
  getReferensiStatusPegawaiById,
} from "@/helpers/referensi";
import { getPegawaiByNip } from "@/dummy/data-pegawai-by-nip";

export const useSilkaPegawai = (nip) => {
  return useQuery({
    queryKey: ["pegawai.silka.nip", nip],
    queryFn: async () => {
      const getPegawai = await getPegawaiByNip(nip);
      return getPegawai;
    },
    refetchOnWindowFocus: false,
  });
};

export const useSatkers = ({ access_token }, nip) => {
  return useQuery({
    queryKey: ["satkers", nip],
    queryFn: async () => {
      const getSatker = await getSatkerSigapok(access_token);
      return getSatker;
    },
    refetchOnWindowFocus: false,
  });
};

export const useSkpds = ({ access_token }, nip) => {
  return useQuery({
    queryKey: ["skpds", nip],
    queryFn: async () => {
      const getSkpd = await getSkpdSigapok(access_token);
      return getSkpd;
    },
    refetchOnWindowFocus: false,
  });
};

export const useStatusPegawai = ({ access_token }, nip) => {
  return useQuery({
    queryKey: ["statusPegawai", nip],
    queryFn: async () => {
      const getStatusPegawai = await getStatusPegawaiSigapok(access_token);
      return getStatusPegawai;
    },
    refetchOnWindowFocus: false,
  });
};

export const useJenisPegawai = ({ access_token }, nip) => {
  return useQuery({
    queryKey: ["jenisPegawai", nip],
    queryFn: async () => {
      const getJenisPegawai = await getJenisPegawaiSigapok(access_token);
      return getJenisPegawai;
    },
    refetchOnWindowFocus: false,
  });
};

export const usePangkat = ({ access_token }, nip) => {
  return useQuery({
    queryKey: ["pangkat", nip],
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

export const useNamaAgama = (id) => {
  return useQuery({
    queryKey: ["nama.agama", id],
    queryFn: async () => {
      const response = await getReferensiAgamaById(id);
      return response;
    },
    refetchOnWindowFocus: false,
  });

  // return response?.data[0]?.nama_agama;
};

export const useNamaSKPD = (id) => {
  return useQuery({
    queryKey: ["nama.skpd", id],
    queryFn: async () => {
      const response = await getReferensiSKPDById(id);
      return response;
    },
    refetchOnWindowFocus: false,
  });
};

export const useNamaJenisPegawai = (id) => {
  return useQuery({
    queryKey: ["nama.jenis.pegawai", id],
    queryFn: async () => {
      const response = await getReferensiJenisPegawaiById(id);
      return response;
    },
    refetchOnWindowFocus: false,
  });

  // return response?.data[0]?.nama_jenis;
};

export const useNamaStatusPegawai = (id) => {
  return useQuery({
    queryKey: ["nama.status.pegawai", id],
    queryFn: async () => {
      const response = await getReferensiStatusPegawaiById(id);
      return response;
    },
    refetchOnWindowFocus: false,
  });

  // return response?.data[0]?.nama_statuspeg;
};
