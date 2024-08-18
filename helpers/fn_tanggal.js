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

export function formatDateSlash(originalDate) {
  // Memisahkan tahun, bulan, dan hari
  let dateParts = originalDate.split("-");

  // Menyusun kembali dalam format DD/MM/YYYY
  return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
}

// Contoh penggunaan fungsi
// let formattedDate = formatDate("1999-05-27");
// console.log(formattedDate); // Output: 27/05/1999
