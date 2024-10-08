import { useSessionServer } from "@/app/app-module/server-session";
import { BtnKirimTPP } from "@/components/button/btn-tpp-kirim";
import { getTppByNipppk } from "@/dummy/data-tpp-by-nip";
import { formatRupiahManual } from "@/helpers/cx";
import { decrypt } from "@/helpers/encrypt";
import { polaNIP } from "@/helpers/polanip";
import { terbilangRupiah } from "@/helpers/rupiah";
import { Divider } from "@nextui-org/react";
import { ExclamationCircle } from "react-bootstrap-icons";

export default async function RenderSilkaService({ slug }) {
	const sigapok = useSessionServer("USER_GAPOK");
	const silka = useSessionServer("USER_SILKA");

	const NIP = decrypt(slug[0], "bkpsdm");

	const resultDataTpp = await getTppByNipppk(NIP);
	if (resultDataTpp.status === false) {
		return (
			<div className="flex flex-col items-center justify-center gap-4">
				<ExclamationCircle className="size-8" />
				<p className="text-gray-400">{resultDataTpp.message}</p>
			</div>
		);
	}
	const {
		nip,
		nama,
		gelar_depan,
		gelar_blk,
		tpp_diterima,
		tahun,
		bulan,
		fid_status,
	} = resultDataTpp?.data;

	const renderButtonKirim = () => {
		// if (resultDataTpp?.data.fid_status !== "CETAK") {
		//   return (
		//     <div className="text-red-500">TPP masih dalam proses perhitungan.</div>
		//   );
		// }
		if (resultDataTpp?.data.is_sync_simgaji === "1") return null;
		return (
			<>
				<Divider />
				<BtnKirimTPP {...sigapok} {...resultDataTpp?.data} silka={silka} />
			</>
		);
	};

	return (
		<>
			<div className="inline-flex flex-col sm:flex-row justify-start gap-x-8 gap-y-8">
				<div>
					<div className="text-gray-400">NIP</div>
					<div className="font-bold">{polaNIP(nip) ?? "-"}</div>
				</div>
				<div>
					<div className="text-gray-400">NAMA</div>
					<div className="font-bold">
						{`${gelar_depan} ${nama} ${gelar_blk}` ?? "-"}
					</div>
				</div>
			</div>
			<div className="inline-flex flex-col sm:flex-row justify-start gap-x-8 gap-y-8">
				<div>
					<div className="text-gray-400">BULAN</div>
					<div className="font-bold">{bulan ?? "-"}</div>
				</div>
				<div>
					<div className="text-gray-400">TAHUN</div>
					<div className="font-bold">{tahun ?? "-"}</div>
				</div>
			</div>
			<div>
				<div className="text-gray-400">JUMLAH TPP DI TERIMA</div>
				<div className="font-bold text-green-600 text-2xl">
					{formatRupiahManual(tpp_diterima) ?? "-"}
				</div>
			</div>
			<div>
				<div className="text-gray-400">TERBILANG</div>
				<div className="font-bold text-gray-400 italic uppercase">
					{terbilangRupiah(tpp_diterima) ?? "-"}
				</div>
			</div>
			{renderButtonKirim()}
		</>
	);
}
