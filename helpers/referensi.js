"use server";
import { headers } from "@/lib/req-headers";

const getReferensiAgamaById = async (id) => {
	const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;

	const req = await fetch(`${url}/services/referensi/agama?id_bkn=${id}`, {
		method: "GET",
		cache: "force-cache",
		headers,
		next: {
			tags: ["get.referensi.agama"],
		},
	});

	const result = await req.json();
	return result;
};

const getReferensiSKPDById = async (id) => {
	const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;

	const req = await fetch(
		`${url}/services/referensi/skpd?id_skpd_simgaji=${id}`,
		{
			method: "GET",
			cache: "force-cache",
			headers,
			next: {
				tags: ["get.referensi.skpd"],
			},
		}
	);

	const result = await req.json();
	return result;
};

const getReferensiJenisPegawaiById = async (id) => {
	const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;

	const req = await fetch(
		`${url}/services/referensi/jenis_pegawai?id=${id}`,
		{
			method: "GET",
			cache: "force-cache",
			headers,
			next: {
				tags: ["get.referensi.skpd"],
			},
		}
	);

	const result = await req.json();
	return result;
};

const getReferensiStatusPegawaiById = async (id) => {
	const url = process.env.NEXT_PUBLIC_SILKA_BASE_URL;

	const req = await fetch(
		`${url}/services/referensi/status_pegawai?id=${id}`,
		{
			method: "GET",
			cache: "force-cache",
			headers,
			next: {
				tags: ["get.referensi.skpd"],
			},
		}
	);

	const result = await req.json();
	return result;
};

export const NamaAgama = async ({ id }) => {
	const response = await getReferensiAgamaById(id);
	return <p>{response?.data[0]?.nama_agama}</p>;
};

export const NamaSKPD = async ({ id }) => {
	const response = await getReferensiSKPDById(id);
	return <p>{response?.data[0]?.nama_unit_kerja}</p>;
};

export const JenisPegawai = async ({ id }) => {
	const response = await getReferensiJenisPegawaiById(id);
	return <p>{response?.data[0]?.nama_jenis}</p>;
};

export const StatusPegawai = async ({ id }) => {
	const response = await getReferensiStatusPegawaiById(id);
	return <p>{response?.data[0]?.nama_statuspeg}</p>;
};
