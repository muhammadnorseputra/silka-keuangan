// Fungsi untuk mendapatkan tanggal hari ini dalam format YYYY-MM-DD
export function getTanggalHariIni() {
  let today = new Date();

  let tahun = today.getFullYear();
  let bulan = String(today.getMonth() + 1).padStart(2, "0"); // getMonth() mengembalikan bulan dengan indeks 0, jadi tambahkan 1
  let hari = String(today.getDate()).padStart(2, "0");

  return `${tahun}-${bulan}-${hari}`;
}

// Contoh penggunaan
// let tanggalHariIni = getTanggalHariIni();
// console.log(tanggalHariIni);  // Output: 2024-01-01 (jika hari ini adalah 1 Januari 2024)
