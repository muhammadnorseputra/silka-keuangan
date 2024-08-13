export const cx = (...list) => list.filter(Boolean).join(" ");
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// fungsi to idr
export function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(angka);
}

// fungsi to idr v2
export function formatRupiahManual(angka) {
  let reverse = angka.toString().split("").reverse().join("");
  let ribuan = reverse.match(/\d{1,3}/g);
  let hasil = ribuan.join(".").split("").reverse().join("");
  return "Rp. " + hasil;
}
// fungsi tanggal indo dari ex: 2019-01-01 => 01 Januari 2019
export function formatTanggalIndonesia(tanggal) {
  const bulanIndonesia = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const [tahun, bulan, hari] = tanggal.split("-");

  const namaBulan = bulanIndonesia[parseInt(bulan) - 1];

  return `${hari} ${namaBulan} ${tahun}`;
}

export function isNull(string) {
  return string !== null ?? "-";
}
