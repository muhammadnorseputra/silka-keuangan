"use client";
import { BtnApprove } from "@/components/button/btn-approve";
import { ButtonPeremajaan } from "@/components/button/btn-peremajaan";
import { BtnRollBackPNS } from "@/components/button/btn-rollback-pns";
import { PlaceholderBar } from "@/components/skeleton/placeholder-bar";
import { getPegawaiByNip } from "@/dummy/data-pegawai-by-nip";
import { formatTanggalIndonesia } from "@/helpers/cx";
import { polaNIP } from "@/helpers/polanip";
import { useSelectedTab } from "@/helpers/tab";
import { Card, CardBody, Divider, Tab, Tabs } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { ExclamationCircle } from "react-bootstrap-icons";

export default function VervalSilkaPegawai({ sigapok, silka, nip }) {
  const { isTab, handleTabChange } = useSelectedTab({
    defaultKey: "profile",
  });
  const {
    data: row,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["verval.silka.pegawai", nip],
    queryFn: async () => {
      const getPegawai = await getPegawaiByNip(nip);
      return getPegawai;
    },
    refetchOnWindowFocus: false,
    enabled: !!nip,
  });

  if (isLoading || isFetching) return <PlaceholderBar />;

  if (
    row.status_data === "ENTRI" ||
    !row.nama_jenis ||
    !row.nama_statuspeg ||
    !row.tmt_skmt
  ) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <ExclamationCircle className="size-8" />
        <p className="text-gray-400">Data Belum Diremajakan</p>
        <ButtonPeremajaan nip={nip} />
      </div>
    );
  }

  if (!row?.nip) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <ExclamationCircle className="size-8" />
        <p className="text-gray-400">Data Pegawai Tidak Ditemukan</p>
      </div>
    );
  }
  const namalengkap = `${row?.gelar_depan} ${row?.nama} ${row?.gelar_belakang}`;
  return (
    <>
      <Tabs
        className="sticky top-0"
        aria-label="Options"
        radius="md"
        size="lg"
        variant="solid"
        color="primary"
        fullWidth
        selectedKey={isTab}
        onSelectionChange={handleTabChange}>
        <Tab key="profile" title="Profile">
          <Card shadow="none" fullWidth>
            <CardBody className="gap-y-4">
              <div>
                <div className="text-gray-400">NAMA</div>
                <div className="font-bold">{namalengkap}</div>
              </div>
              <div>
                <div className="text-gray-400">NIP</div>
                <div className="font-bold">{polaNIP(row?.nip)}</div>
              </div>
              <div>
                <div className="text-gray-400">GELAR DEPAN</div>
                <div className="font-bold">{row?.gelar_depan}</div>
              </div>
              <div>
                <div className="text-gray-400">GELAR BELAKANG</div>
                <div className="font-bold">{row?.gelar_belakang}</div>
              </div>
              <div>
                <div className="text-gray-400">TINGKAT PENDIDIKAN</div>
                <div className="font-bold">{row?.nama_tingkat_pendidikan}</div>
              </div>
              <div>
                <div className="text-gray-400">TEMPAT LAHIR</div>
                <div className="font-bold">{row?.tmp_lahir}</div>
              </div>
              <div>
                <div className="text-gray-400">TANGGAL LAHIR</div>
                <div className="font-bold">
                  {formatTanggalIndonesia(row?.tgl_lahir)}
                </div>
              </div>
              <div>
                <div className="text-gray-400">ALAMAT SESUAI KTP</div>
                <div className="font-bold truncate text-ellipsis hover:whitespace-normal">
                  {row?.alamat_ktp}
                </div>
              </div>
              <div>
                <div className="text-gray-400">JENIS KELAMIN</div>
                <div className="font-bold">{row?.jenis_kelamin}</div>
              </div>
              <div>
                <div className="text-gray-400">AGAMA</div>
                <div className="font-bold">{row?.nama_agama}</div>
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="kepegawaian" title="Kepegawaian">
          <Card shadow="none" fullWidth>
            <CardBody className="gap-y-4">
              <div>
                <div className="text-gray-400">UNIT KERJA</div>
                <div className="font-bold">{row?.nama_unit_kerja}</div>
              </div>
              <div>
                <div className="text-gray-400">JABATAN</div>
                <div className="font-bold">{row?.nama_jabatan}</div>
              </div>
              <div className="flex flex-col sm:flex-row justify-start gap-x-16">
                <div>
                  <div className="text-gray-400">JENIS PEGAWAI</div>
                  <div className="font-bold">{row?.nama_jenis}</div>
                </div>
                <div>
                  <div className="text-gray-400">STATUS PEGAWAI</div>
                  <div className="font-bold">{row?.nama_statuspeg}</div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="keluarga" title="Keluarga">
          <Card shadow="none" fullWidth>
            <CardBody className="gap-y-4">
              <div className="flex flex-col sm:flex-row justify-start gap-x-16">
                <div>
                  <div className="text-gray-400">
                    {row?.jenis_kelamin === "L"
                      ? "JUMLAH ISTRI"
                      : "JUMLAH SUAMI"}
                  </div>
                  <div className="font-bold">{row?.jumlah_sutri}</div>
                </div>
                <div>
                  <div className="text-gray-400">JUMLAH ANAK</div>
                  <div className="font-bold">{row?.jumlah_anak}</div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="lainnya" title="Lainnya">
          <Card shadow="none" fullWidth>
            <CardBody className="gap-y-4">
              <div>
                <div className="text-gray-400">NO. KTP</div>
                <div className="font-bold">{row?.no_ktp ?? "-"}</div>
              </div>
              <div>
                <div className="text-gray-400">NO. NPWP</div>
                <div className="font-bold">{row?.no_npwp ?? "-"}</div>
              </div>
              <div>
                <div className="text-gray-400">NO. KARPEG</div>
                <div className="font-bold">{row?.no_karpeg ?? "-"}</div>
              </div>
              <div>
                <div className="text-gray-400">NO. KARIS / KARSU</div>
                <div className="font-bold">{row?.no_karis_karsu ?? "-"}</div>
              </div>
              <div>
                <div className="text-gray-400">WHATSAPP</div>
                <div className="font-bold">{row?.whatsapp ?? "-"}</div>
              </div>
              <div>
                <div className="text-gray-400">EMAIL</div>
                <div className="font-bold">{row?.email ?? "-"}</div>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>

      {row.status_data !== "ENTRI" ? (
        <>
          <Divider />
          <div className="flex items-center justify-between w-full gap-x-3">
            <BtnRollBackPNS data={row} />
            <BtnApprove {...sigapok} data={row} session_silkaonline={silka} />
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
