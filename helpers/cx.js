export const cx = (...list) => list.filter(Boolean).join(" ");
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// fungsi to idr
export const formatRupiah = (angka) => {
  const formatted = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(angka);
  return formatted.replace(/[Rp\s]/g, "");
};

// fungsi to idr v2
export const formatRupiahManual = (angka) => {
  const reverse = angka.toString().split("").reverse().join("");
  const ribuan = reverse.match(/\d{1,3}/g);
  const hasil = ribuan.join(".").split("").reverse().join("");
  return "Rp. " + hasil;
};
// fungsi tanggal indo dari ex: 2019-01-01 => 01 Januari 2019
export function formatTanggalIndonesia(tanggal = "0000-00-00") {
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

  if (tanggal === null || tanggal === "") {
    return `-`;
  }

  const [tahun, bulan, hari] = tanggal.split("-");

  const namaBulan = bulanIndonesia[parseInt(bulan) - 1];

  return `${hari} ${namaBulan} ${tahun}`;
}

export function isNull(string) {
  // @ts-ignore
  return string !== null ?? "-";
}

export function getNamaBulan(angka) {
  const bulan = [
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

  // Kurangi 1 karena array dimulai dari 0
  const index = angka - 1;

  // Cek apakah angka valid (1-12)
  if (angka >= 1 && angka <= 12) {
    return bulan[index];
  } else {
    return "Angka bulan tidak valid (gunakan 1-12)";
  }
}
