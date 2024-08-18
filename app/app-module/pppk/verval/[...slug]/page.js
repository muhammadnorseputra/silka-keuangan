import { BtnBackNextUi } from "@/components/button/btn-back";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { hasSessionServer, useSessionServer } from "../../../server-session";
import { redirect } from "next/navigation";
import { CloudArrowUp, ExclamationCircle } from "react-bootstrap-icons";
import { decrypt } from "@/helpers/encrypt";
import { getTppSigapok } from "@/dummy/sigapok-get-tpp";
import { getPegawaiByNip } from "@/dummy/data-pegawai-by-nip";
import { formatRupiah, formatTanggalIndonesia } from "@/helpers/cx";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { ButtonPeremajaan } from "@/components/button/btn-peremajaan";
import { BtnApprove } from "@/components/button/btn-approve";
import { getSigapokP3K } from "@/dummy/sigapok-get-pppk";
import { BtnRollBackPPPK } from "@/components/button/btn-rollback-pppk";

export const revalidate = 0;

export default async function Page({ params }) {
  const session = hasSessionServer("USER_GAPOK");
  const sigapok = useSessionServer("USER_GAPOK");
  const silkaonline = useSessionServer("USER_SILKA");
  if (session === false) {
    return redirect("/app-integrasi/dashboard");
  }
  const NIP = decrypt(params?.slug[0], "bkpsdm");
  const getPegawais = await getPegawaiByNip(NIP);
  const {
    success: isSigapokSuccess,
    message: sigapokMessage,
    data: getSigapokPppk,
  } = await getSigapokP3K(sigapok.access_token, NIP);

  const namalengkap = `${getPegawais?.gelar_depan} ${getPegawais?.nama} ${getPegawais?.gelar_belakang}`;
  const renderSilkaService = () => {
    if (getPegawais.status_data !== "VERIFIKASI") {
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          <ExclamationCircle className="size-8" />
          <p className="text-gray-400">Data Belum Diremajakan</p>
          <ButtonPeremajaan nip={NIP} />
        </div>
      );
    }

    return (
      <>
        <div>
          <div className="text-gray-400">NAMA</div>
          <div className="font-bold">{namalengkap}</div>
        </div>
        <div>
          <div className="text-gray-400">NIP</div>
          <div className="font-bold">{getPegawais.nip}</div>
        </div>
        <div>
          <div className="text-gray-400">GELAR DEPAN</div>
          <div className="font-bold">{getPegawais.gelar_depan}</div>
        </div>
        <div>
          <div className="text-gray-400">GELAR BELAKNG</div>
          <div className="font-bold">{getPegawais.gelar_belakang}</div>
        </div>
        <div>
          <div className="text-gray-400">TINGKAT PENDIDIKAN</div>
          <div className="font-bold">{getPegawais.nama_tingkat_pendidikan}</div>
        </div>
        <div>
          <div className="text-gray-400">TEMPAT LAHIR</div>
          <div className="font-bold">{getPegawais.tmp_lahir}</div>
        </div>
        <div>
          <div className="text-gray-400">TANGGAL LAHIR</div>
          <div className="font-bold">
            {formatTanggalIndonesia(getPegawais.tgl_lahir)}
          </div>
        </div>
        <div>
          <div className="text-gray-400">ALAMAT SESUAI KTP</div>
          <div className="font-bold">{getPegawais.alamat_ktp}</div>
        </div>
        <div>
          <div className="text-gray-400">JENIS KELAMIN</div>
          <div className="font-bold">{getPegawais.jenis_kelamin}</div>
        </div>
        <div>
          <div className="text-gray-400">AGAMA</div>
          <div className="font-bold">{getPegawais.nama_agama}</div>
        </div>
        <Divider />
        <div>
          <div className="text-gray-400">UNIT KERJA</div>
          <div className="font-bold">{getPegawais.nama_unit_kerja}</div>
        </div>
        <div className="flex flex-col sm:flex-row justify-start gap-x-16">
          <div>
            <div className="text-gray-400">JENIS PEGAWAI</div>
            <div className="font-bold">{getPegawais.kode_jenis_pegawai}</div>
          </div>
          <div>
            <div className="text-gray-400">STATUS PEGAWAI</div>
            <div className="font-bold">{getPegawais.kode_status_pegawai}</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-start gap-x-16">
          <div>
            <div className="text-gray-400">
              {getPegawais.jenis_kelamin === "L"
                ? "JUMLAH ISTRI"
                : "JUMLAH SUAMI"}
            </div>
            <div className="font-bold">{getPegawais.jumlah_sutri}</div>
          </div>
          <div>
            <div className="text-gray-400">JUMLAH ANAK</div>
            <div className="font-bold">{getPegawais.jumlah_anak}</div>
          </div>
        </div>
      </>
    );
  };
  const renderGapokServices = () => {
    if (isSigapokSuccess === false) {
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          <ExclamationCircle className="size-8" />
          <p className="text-gray-400">{sigapokMessage}</p>
        </div>
      );
    }

    return (
      <>
        <div>
          <div className="text-gray-400">NAMA</div>
          <div className="font-bold">{getSigapokPppk.NAMA ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">NIP</div>
          <div className="font-bold">{getSigapokPppk.NIP ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">GELAR DEPAN</div>
          <div className="font-bold">{getSigapokPppk.GLRDEPAN ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">GELAR BELAKNG</div>
          <div className="font-bold">{getSigapokPppk.GLRBELAKANG ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">TEMPAT LAHIR</div>
          <div className="font-bold">{getSigapokPppk.TEMPATLHR ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">TANGGAL LAHIR</div>
          <div className="font-bold">
            {formatTanggalIndonesia(getSigapokPppk.TGLLHR) ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">ALAMAT SESUAI KTP</div>
          <div className="font-bold">{getSigapokPppk.ALAMAT ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">JENIS KELAMIN</div>
          <div className="font-bold">
            {getSigapokPppk.KDJENKEL === 1 ? "PRIA" : "PEREMPUAN"}
          </div>
        </div>
        <Divider />
        <div>
          <div className="text-gray-400">UNIT KERJA</div>
          <div className="font-bold">{getSigapokPppk.KD_SKPD ?? "-"}</div>
        </div>
        <div className="flex flex-col flex-wrap sm:flex-row justify-start gap-x-16 gap-y-6">
          <div>
            <div className="text-gray-400">GAJI POKOK</div>
            <div className="font-bold">
              {formatRupiah(getSigapokPppk.GAPOK) ?? "-"}
            </div>
          </div>
          <div>
            <div className="text-gray-400">PANGKAT</div>
            <div className="font-bold">{getSigapokPppk.KDPANGKAT ?? "-"}</div>
          </div>
          <div>
            <div className="text-gray-400">MK GOL TAHUN</div>
            <div className="font-bold">{getSigapokPppk.MKGOLT ?? "-"}</div>
          </div>
          <div>
            <div className="text-gray-400">MG GOL BULAN</div>
            <div className="font-bold">{getSigapokPppk.BLGOLT ?? "-"}</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-start gap-x-16">
          <div>
            <div className="text-gray-400">KATEGORI</div>
            <div className="font-bold">{getSigapokPppk.KATEGORI ?? "-"}</div>
          </div>
          <div>
            <div className="text-gray-400">FORMASI</div>
            <div className="font-bold">{getSigapokPppk.FORMASI ?? "-"}</div>
          </div>
          <div>
            <div className="text-gray-400">AKHIR KONTRAK</div>
            <div className="font-bold">
              {formatTanggalIndonesia(getSigapokPppk.AKHIRKONTRAK) ?? "-"}
            </div>
          </div>
        </div>
        <Divider />
        <div>
          <div className="text-gray-400">NOMOR SK</div>
          <div className="font-bold">{getSigapokPppk.NOMORSKEP ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-400">TANGGAL SK</div>
          <div className="font-bold">
            {formatTanggalIndonesia(getSigapokPppk.TGLSKEP) ?? "-"}
          </div>
        </div>
        <div>
          <div className="text-gray-400">PENERBIT SK</div>
          <div className="font-bold">{getSigapokPppk.PENERBITSKEP ?? "-"}</div>
        </div>
      </>
    );
  };

  const isVerifikasi = () => {
    if (getPegawais.status_data !== "VERIFIKASI") {
      return;
    }

    return (
      <BtnApprove
        {...sigapok}
        data={getPegawais}
        session_silkaonline={silkaonline}
      />
    );
  };

  const isRollBack = () => {
    if (isSigapokSuccess === false) {
      return;
    }

    return <BtnRollBackPPPK sigapok={sigapok} pppk={getSigapokPppk} />;
  };
  return (
    <>
      <div className="w-full bg-blue-500 dark:bg-slate-800 h-screen">
        <div className="max-w-6xl mx-auto">
          <Card shadow="lg" className="max-h-screen overflow-y-auto my-auto">
            <CardHeader className="flex justify-between items-center">
              <div className="inline-flex items-center gap-4">
                <BtnBackNextUi goTo="/app-module/kgb" title="Kembali" />
                <div className="flex flex-col">
                  <p className="text-xl flex flex-col">
                    <span className="uppercase">
                      Verifikasi & Validasi Data Peremajaan
                    </span>
                    <span className="text-base">{namalengkap}</span>
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col md:flex-row justify-between items-start gap-x-6 gap-y-3">
                {/* Get Data Silka PPPK */}
                <Card fullWidth>
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                      <p className="text-md">SILKa Online</p>
                      <p className="text-small text-default-500">
                        Data Verifikasi & Validasi Data Peremajaan
                      </p>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex flex-col gap-y-4 px-8 py-8">
                    {renderSilkaService()}
                  </CardBody>
                  <Divider />
                  <CardFooter className="sticky bottom-0">
                    <div className="flex items-end justify-end w-full">
                      {isVerifikasi()}
                    </div>
                  </CardFooter>
                </Card>
                {/* Get Data Sigapok PPPK */}
                <Card fullWidth>
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                      <p className="text-md">Sigapok Service</p>
                      <p className="text-small text-default-500">
                        Data Badan Keuangan Daerah (SIMGAJI)
                      </p>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex flex-col gap-y-4 px-8 py-8">
                    {renderGapokServices()}
                  </CardBody>
                  <Divider />
                  <CardFooter className="sticky bottom-0">
                    <div className="flex items-end justify-end w-full">
                      {isRollBack()}
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
